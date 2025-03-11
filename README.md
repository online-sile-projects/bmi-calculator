# BMI Calculator with Line Login and Google Sheets Integration

這是一個與Line整合的BMI計算機，可以使用Line登入並將使用者的體重記錄儲存到Google Sheets中。

## 功能

- 使用Line登入獲取使用者名稱和頭像
- 計算BMI值並顯示對應的健康類別
- 將使用者資料和體重記錄儲存到Google Sheets
- 為每個使用者建立專屬的體重記錄表格
- 顯示使用者的體重歷史記錄

## 技術架構

- 前端：HTML, CSS, JavaScript
- 認證：Line LIFF SDK
- 資料儲存：Google Sheets API

## 設定步驟

### 1. Line LIFF設定

1. 訪問 [Line Developers Console](https://developers.line.biz/)
2. 創建一個新的Provider和Channel
3. 在LIFF選項卡中新增一個新的LIFF應用程式
4. 設定Endpoint URL為您的應用程式URL
5. 獲取LIFF ID和Channel ID
6. 在`config.js`檔案中更新相應的設定

### 2. Google Sheets設定

1. 訪問 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建一個新的專案
3. 啟用Google Sheets API
4. 創建API Key和OAuth客戶端ID
5. 創建一個Google Spreadsheet並獲取其ID
6. 在試算表中創建名為"MasterSheet"的工作表
7. 在`config.js`檔案中更新相應的設定

### 3. 配置文件更新

在`config.js`文件中填入您的憑證信息:

```javascript
// Line LIFF configuration
const LINE_CONFIG = {
    liffId: 'YOUR_LIFF_ID',  // 從Line Developer Console獲取
    channelId: 'YOUR_CHANNEL_ID', // 從Line Developer Console獲取
};

// Google Sheets API configuration
const GOOGLE_CONFIG = {
    apiKey: 'YOUR_API_KEY',  // 從Google Cloud Console獲取
    clientId: 'YOUR_CLIENT_ID', // 從Google Cloud Console獲取
    spreadsheetId: 'YOUR_SPREADSHEET_ID', // 從Google Spreadsheet URL獲取
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
};
```

## 使用方法

1. 打開應用程式網頁
2. 點擊"使用Line登入"按鈕
3. 授權應用程式訪問您的Line個人資料
4. 輸入您的身高和體重
5. 點擊"計算BMI"按鈕
6. 查看結果和您的體重記錄歷史

## 資料儲存結構

- **MasterSheet**：儲存所有使用者的基本資訊（ID、姓名、頭像URL、註冊時間）
- **使用者專屬表格**：每個使用者都有一個以其Line使用者ID命名的表格，包含日期、體重、身高、BMI和類別等記錄

## 建議的開發環境

- 編輯器：Visual Studio Code
- 瀏覽器：Google Chrome (帶有開發者工具)
- 本地伺服器：Live Server 或 HTTP-Server

## 授權

MIT授權
