document.getElementById('calculateBtn').addEventListener('click', calculateBMI);

const sassyMessages = {
    underweight: [
        "Congratulations! You have the density of a ghost 👻",
        "Are you a sock in the wind? Because you're very light 💨",
        "Your BMI is playing hide and seek... and winning 🫥",
        "You're what scientists call 'aerodynamic' 🎈"
    ],
    normal: [
        "Boring. Go eat a cheeseburger 🍔",
        "You're so average, you're basically a government spy 🕵️",
        "Congratulations on being statistically unremarkable 📊",
        "Your mom is proud. That's it. That's the achievement 👏"
    ],
    overweight: [
        "Thicc, but not in the good way 🍑",
        "You're cultivating mass. It's called strategy 💪",
        "Your body is preparing for winter... all year long ❄️",
        "You have a 'dad bod' without the kids or responsibility 🍺"
    ],
    obese: [
        "You are now classified as a planet 🪐",
        "NASA called. They want to study your gravity 🚀",
        "You're not fat, you're just... easy to see 👀",
        "Achievement: Became a human gravity well 🌌"
    ]
};

const achievements = [
    "First Steps (to the fridge)",
    "Gravity Enthusiast",
    "Buffet Survivor",
    "Chair Stress Tester",
    "Mirror Avoider",
    "Belt Extender Collector",
    "Scale Anxiety Initiate"
];

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const achievementDiv = document.getElementById('achievement');
    const badgeSpan = document.getElementById('badge');
    
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    
    // Reset
    resultDiv.style.backgroundColor = '';
    resultDiv.style.color = '';
    resultDiv.style.borderColor = '';
    resultDiv.innerHTML = '';
    achievementDiv.style.display = 'none';
    
    // Validate inputs
    if (isNaN(heightCm) || isNaN(weightKg)) {
        resultDiv.innerHTML = '🤔 ERROR: Did you forget to type numbers?<br>Or are you just testing my patience?';
        resultDiv.style.color = '#333';
        return;
    }
    
    if (heightCm <= 0 || weightKg <= 0) {
        resultDiv.innerHTML = '🚨 ERROR: Negative numbers?<br>What are you, antimatter?';
        resultDiv.style.color = '#333';
        return;
    }
    
    if (heightCm > 300 || weightKg > 500) {
        resultDiv.innerHTML = '🤨 Nice try. Unless you are a giraffe or a truck, recheck those numbers.';
        resultDiv.style.color = '#333';
        return;
    }
    
    // Show fake loading
    loadingDiv.style.display = 'block';
    document.getElementById('calculateBtn').disabled = true;
    
    setTimeout(() => {
        loadingDiv.style.display = 'none';
        document.getElementById('calculateBtn').disabled = false;
        
        // Convert height to meters
        const heightM = heightCm / 100;
        
        // Calculate BMI
        const bmi = weightKg / (heightM * heightM);
        const bmiRounded = bmi.toFixed(2);
        
        // Determine category, colors, and sass
        let category;
        let textColor;
        let bgColor;
        let borderColor;
        let sassMessage;
        let achievementText;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            textColor = '#0066cc';
            bgColor = '#e6f2ff';
            borderColor = '#0066cc';
            sassMessage = getRandomMessage(sassyMessages.underweight);
            achievementText = achievements[0];
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
            textColor = '#228b22';
            bgColor = '#e6ffe6';
            borderColor = '#228b22';
            sassMessage = getRandomMessage(sassyMessages.normal);
            achievementText = achievements[1];
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            textColor = '#ff8c00';
            bgColor = '#fff4e6';
            borderColor = '#ff8c00';
            sassMessage = getRandomMessage(sassyMessages.overweight);
            achievementText = achievements[2];
        } else {
            category = 'Obese';
            textColor = '#cc0000';
            bgColor = '#ffe6e6';
            borderColor = '#cc0000';
            sassMessage = getRandomMessage(sassyMessages.obese);
            achievementText = getRandomMessage(achievements.slice(3));
        }
        
        // Display result with sass
        resultDiv.innerHTML = `
            <div style="font-size: 28px; margin-bottom: 10px;">🎉 CONGRATULATIONS! 🎉</div>
            <div>Your BMI: <strong style="font-size: 32px;">${bmiRounded}</strong></div>
            <div style="margin: 10px 0;">Category: <strong>${category}</strong></div>
            <div style="font-style: italic; margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.7); border-radius: 5px;">
                "${sassMessage}"
            </div>
            <div style="margin-top: 15px; font-size: 14px; color: #666;">
                💡 <em>Doctor's advice: ${getDoctorAdvice(category)}</em>
            </div>
        `;
        resultDiv.style.color = textColor;
        resultDiv.style.backgroundColor = bgColor;
        resultDiv.style.borderColor = borderColor;
        
        // Show achievement
        badgeSpan.textContent = achievementText;
        achievementDiv.style.display = 'block';
        
    }, 2000); // 2 second fake loading
}

function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

function getDoctorAdvice(category) {
    const advice = {
        'Underweight': 'Have you tried... existing with more mass?',
        'Normal': 'Keep being disappointingly average!',
        'Overweight': 'Maybe put down the donut? Just one?',
        'Obese': 'We have contacted your local gravitational research facility.'
    };
    return advice[category];
}

// Increment visitor counter animation
let visitorCount = 42;
setInterval(() => {
    if (Math.random() > 0.7) {
        visitorCount++;
        const counter = document.getElementById('visitorCount');
        if (counter) {
            counter.textContent = visitorCount.toString().padStart(8, '0');
        }
    }
}, 3000);
