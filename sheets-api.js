/**
 * Google Sheets API Module
 * Handles Google Sheets integration for storing user data and weight records
 */

// Global variables for Google API
let googleAuth = null;
let sheetsApi = null;

// Initialize Google API
document.addEventListener('DOMContentLoaded', () => {
    loadGoogleAPI();
});

// Load Google API client
function loadGoogleAPI() {
    gapi.load('client:auth2', initializeGoogleAPI);
}

// Initialize Google API client
async function initializeGoogleAPI() {
    try {
        await gapi.client.init({
            apiKey: GOOGLE_CONFIG.apiKey,
            clientId: GOOGLE_CONFIG.clientId,
            scope: GOOGLE_CONFIG.scopes,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
        });

        // Initialize Google Auth instance
        googleAuth = gapi.auth2.getAuthInstance();
        
        // Add listener for sign-in state
        googleAuth.isSignedIn.listen(updateGoogleSigninStatus);
        
        // Handle initial sign-in state
        updateGoogleSigninStatus(googleAuth.isSignedIn.get());
        
        console.log('Google API initialized');
    } catch (error) {
        console.error('Google API initialization error:', error);
    }
}

// Update UI based on Google sign-in status
function updateGoogleSigninStatus(isSignedIn) {
    console.log('Google sign-in status:', isSignedIn);
    // You can update UI elements here if needed
}

// Create or update user in master sheet
async function saveUserToMasterSheet(userProfile) {
    if (!googleAuth.isSignedIn.get()) {
        await googleAuth.signIn();
    }
    
    try {
        // Check if user exists in master sheet
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
            range: 'MasterSheet!A:D'
        });
        
        const values = response.result.values || [];
        const userExists = values.some(row => row[0] === userProfile.userId);
        
        if (!userExists) {
            // Add new user to master sheet
            const now = new Date().toISOString();
            await gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
                range: 'MasterSheet!A:D',
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [
                        [userProfile.userId, userProfile.displayName, userProfile.pictureUrl, now]
                    ]
                }
            });
            
            // Create a new sheet for this user
            await createUserSheet(userProfile.userId);
        }
        
        return true;
    } catch (error) {
        console.error('Error saving user to master sheet:', error);
        return false;
    }
}

// Create a new sheet for a user
async function createUserSheet(userId) {
    try {
        // Get spreadsheet information
        const spreadsheet = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: GOOGLE_CONFIG.spreadsheetId
        });
        
        // Check if user sheet already exists
        const userSheetExists = spreadsheet.result.sheets.some(
            sheet => sheet.properties.title === userId
        );
        
        if (!userSheetExists) {
            // Create a new sheet with user ID as the title
            await gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
                resource: {
                    requests: [{
                        addSheet: {
                            properties: {
                                title: userId
                            }
                        }
                    }]
                }
            });
            
            // Add header row to user sheet
            await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
                range: `${userId}!A1:E1`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        ['日期', '體重 (kg)', '身高 (cm)', 'BMI', '類別']
                    ]
                }
            });
        }
        
        return true;
    } catch (error) {
        console.error('Error creating user sheet:', error);
        return false;
    }
}

// Save weight record to user's sheet
async function saveWeightRecord(userId, height, weight, bmi, category) {
    if (!googleAuth.isSignedIn.get()) {
        await googleAuth.signIn();
    }
    
    try {
        const now = new Date().toISOString();
        
        // Append data to user's sheet
        await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
            range: `${userId}!A:E`,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [
                    [now, weight, height, bmi, category]
                ]
            }
        });
        
        return true;
    } catch (error) {
        console.error('Error saving weight record:', error);
        return false;
    }
}

// Get weight history for user
async function getWeightHistory(userId) {
    if (!googleAuth.isSignedIn.get()) {
        await googleAuth.signIn();
    }
    
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_CONFIG.spreadsheetId,
            range: `${userId}!A:E`
        });
        
        const values = response.result.values || [];
        
        // Skip the header row if it exists
        return values.length > 1 ? values.slice(1) : [];
    } catch (error) {
        console.error('Error getting weight history:', error);
        return [];
    }
}