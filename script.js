document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';
    if (bmi < 18.5) {
        category = '體重過輕';
    } else if (bmi >= 18.5 && bmi < 24) {
        category = '正常範圍';
    } else if (bmi >= 24 && bmi < 27) {
        category = '過重';
    } else if (bmi >= 27 && bmi < 30) {
        category = '輕度肥胖';
    } else if (bmi >= 30 && bmi < 35) {
        category = '中度肥胖';
    } else {
        category = '重度肥胖';
    }
    console.log(`您的 BMI 是 ${bmi} (${category})`);
    document.getElementById('result').textContent = `您!!的 BMI 是 ${bmi} (${category})`;
});