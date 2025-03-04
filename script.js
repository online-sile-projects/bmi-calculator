document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const resultDiv = document.getElementById('result');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    
    // 載入之前儲存的資料
    loadFromLocalStorage();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 獲取輸入值
        const height = parseFloat(heightInput.value) / 100; // 轉換成米
        const weight = parseFloat(weightInput.value);
        
        // 檢查輸入是否有效
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultDiv.innerHTML = '<p class="error">請輸入有效的身高和體重數值</p>';
            return;
        }
        
        // 計算 BMI
        const bmi = weight / (height * height);
        const roundedBmi = bmi.toFixed(2);
        
        // 確定 BMI 類別
        let category = '';
        let categoryClass = '';
        
        if (bmi < 18.5) {
            category = '體重過輕';
            categoryClass = 'underweight';
        } else if (bmi < 24) {
            category = '正常範圍';
            categoryClass = 'normal';
        } else if (bmi < 27) {
            category = '過重';
            categoryClass = 'overweight';
        } else if (bmi < 30) {
            category = '輕度肥胖';
            categoryClass = 'obese-mild';
        } else if (bmi < 35) {
            category = '中度肥胖';
            categoryClass = 'obese-moderate';
        } else {
            category = '重度肥胖';
            categoryClass = 'obese-severe';
        }
        
        // 顯示結果
        resultDiv.innerHTML = `
            <div class="result-content ${categoryClass}">
                <p class="bmi-result">您的 BMI 為: <strong>${roundedBmi}</strong></p>
                <p class="bmi-category">${category}</p>
            </div>
        `;
        
        // 將資料儲存到 localStorage
        saveToLocalStorage(heightInput.value, weightInput.value, roundedBmi, category, categoryClass);
    });
    
    // 儲存資料到 localStorage
    function saveToLocalStorage(height, weight, bmi, category, categoryClass) {
        const bmiData = {
            height: height,
            weight: weight,
            bmi: bmi,
            category: category,
            categoryClass: categoryClass,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('bmiData', JSON.stringify(bmiData));
    }
    
    // 從 localStorage 讀取資料
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('bmiData');
        
        if (savedData) {
            const bmiData = JSON.parse(savedData);
            
            // 設置表單的值
            heightInput.value = bmiData.height;
            weightInput.value = bmiData.weight;
            
            // 顯示上次計算的結果
            resultDiv.innerHTML = `
                <div class="result-content ${bmiData.categoryClass}">
                    <p class="bmi-result">您的 BMI 為: <strong>${bmiData.bmi}</strong></p>
                    <p class="bmi-category">${bmiData.category}</p>
                    <p class="timestamp">上次計算時間: ${new Date(bmiData.timestamp).toLocaleString()}</p>
                </div>
            `;
        }
    }
});