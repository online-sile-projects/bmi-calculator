# BMI Calculator with Line Login and Google Sheets Integration

這是一個與Line整合的BMI計算器，可以使用Line登入並將用戶的體重記錄保存到Google Sheets中。

## 功能

- 使用Line登入獲取用戶名稱和頭像
- 計算BMI值並顯示對應的健康類別
- 將用戶資料和體重記錄保存到Google Sheets
- 為每個用戶建立專屬的體重記錄表格
- 顯示用戶的體重歷史記錄

## 技術架構

- 前端：HTML, CSS, JavaScript
- 認證：Line LIFF SDK
- 數據存儲：Google Sheets API

## 設置步驟

### 1. Line LIFF設置

1. 訪問 [Line Developers Console](https://developers.line.biz/)
2. 創建一個新的Provider和Channel
3. 在LIFF選項卡中添加一個新的LIFF應用
4. 設置Endpoint URL為您的應用程序URL
5. 獲取LIFF ID和Channel ID
6. 在`config.js`文件中更新相應的設置

### 2. Google Sheets設置

1. 訪問 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建一個新的項目
3. 啟用Google Sheets API
4. 創建API Key和OAuth客戶端ID
5. 創建一個Google Spreadsheet並獲取其ID
6. 在電子表格中創建名為"MasterSheet"的工作表
7. 在`config.js`文件中更新相應的設置

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

1. 打開應用程序網頁
2. 點擊"使用Line登入"按鈕
3. 授權應用程序訪問您的Line個人資料
4. 輸入您的身高和體重
5. 點擊"計算BMI"按鈕
6. 查看結果和您的體重記錄歷史

## 數據存儲結構

- **MasterSheet**：保存所有用戶的基本信息（ID、姓名、頭像URL、註冊時間）
- **用戶專屬表格**：每個用戶都有一個以其Line用戶ID命名的表格，包含日期、體重、身高、BMI和類別等記錄

## 推薦的開發環境

- 編輯器：Visual Studio Code
- 瀏覽器：Google Chrome (帶有開發者工具)
- 本地服務器：Live Server 或 HTTP-Server

## 授權

MIT授權
