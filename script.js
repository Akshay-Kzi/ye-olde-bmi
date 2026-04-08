document.getElementById('calculateBtn').addEventListener('click', calculateBMI);

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    
    // Reset result styling
    resultDiv.style.backgroundColor = '';
    resultDiv.style.color = '';
    document.body.style.backgroundColor = '#f5f5f5';
    
    // Validate inputs
    if (isNaN(heightCm) || isNaN(weightKg)) {
        resultDiv.textContent = 'Error: Please enter both height and weight values.';
        resultDiv.style.color = '#333';
        return;
    }
    
    if (heightCm <= 0 || weightKg <= 0) {
        resultDiv.textContent = 'Error: Values must be positive numbers.';
        resultDiv.style.color = '#333';
        return;
    }
    
    // Convert height to meters
    const heightM = heightCm / 100;
    
    // Calculate BMI
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(2);
    
    // Determine category and colors
    let category;
    let textColor;
    let bgColor;
    let bodyBgColor;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        textColor = '#0066cc';
        bgColor = '#e6f2ff';
        bodyBgColor = '#cce5ff';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        textColor = '#228b22';
        bgColor = '#e6ffe6';
        bodyBgColor = '#ccffcc';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        textColor = '#ff8c00';
        bgColor = '#fff4e6';
        bodyBgColor = '#ffe6cc';
    } else {
        category = 'Obese';
        textColor = '#cc0000';
        bgColor = '#ffe6e6';
        bodyBgColor = '#ffcccc';
    }
    
    // Display result
    resultDiv.innerHTML = `Your BMI: <strong>${bmiRounded}</strong><br>Category: <strong>${category}</strong>`;
    resultDiv.style.color = textColor;
    resultDiv.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bodyBgColor;
}
