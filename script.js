const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playRetroSound(type) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0.1;

    if (type === 'click') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'success') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'dialup') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(4000, audioCtx.currentTime + 0.5);
        oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 1.0);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 1.0);
    }
}

const sassyMessages = {
    underweight: [
        "Congratulations! You have the density of a ghost 👻",
        "Are you a sock in the wind? Because you're very light 💨",
        "Your BMI is playing hide and seek... and winning 🫥",
        "You're what scientists call 'aerodynamic' 🎈",
        "If you turn sideways and stick out your tongue, you'd look like a zipper 👗",
        "You're so thin, you could hide behind a broomstick 🧹",
        "Do you faint if the wind blows too hard? 🌬️",
        "You're basically a human xylophone at this point 🎵",
        "Scientists want to study you for anti-gravity research 🚀",
        "Your bones filed a noise complaint — you're too loud for how little you weigh 🦴"
    ],
    normal: [
        "Boring. Go eat a cheeseburger 🍔",
        "You're so average, you're basically a government spy 🕵️",
        "Congratulations on being statistically unremarkable 📊",
        "Your mom is proud. That's it. That's the achievement 👏",
        "You are the human equivalent of plain oatmeal 🥣",
        "Somewhere, a statistician just smiled and nodded 📈",
        "You're the NPC of body types 🎮",
        "Not fat, not thin. Just... THERE 😐",
        "You're the beige sedan of human bodies 🚗",
        "Your BMI is so normal, it puts people to sleep 💤"
    ],
    overweight: [
        "Thicc, but not in the good way 🍑",
        "You're cultivating mass. It's called strategy 💪",
        "Your body is preparing for winter... all year long ❄️",
        "You have a 'dad bod' without the kids or responsibility 🍺",
        "You're not fat, you're just... thermally efficient 🔥",
        "Your body has extra storage for the apocalypse 📦",
        "You've been bulking since 2012 and it shows 💪",
        "You're like a human marshmallow — soft and lovable 🤗",
        "Gravity just likes you a little extra today 🌍",
        "Your belt is filing for workers' comp 🔧"
    ],
    obese: [
        "You are now classified as a planet 🪐",
        "NASA called. They want to study your gravity 🚀",
        "You're not fat, you're just... easy to see 👀",
        "Achievement: Became a human gravity well 🌌",
        "You don't need a chair, you ARE the chair 🪑",
        "Your shadow filed for overtime pay ☀️",
        "You're not overweight, you're under-tall 📏",
        "Your body has its own zip code at this point 📍",
        "You're so massive, light bends around you 🌌",
        "The floor has filed a formal complaint against your feet 🦶"
    ]
};

const normalAchievements = [
    "First Steps (to the fridge)",
    "Gravity Enthusiast",
    "Buffet Survivor",
    "Chair Stress Tester",
    "Mirror Avoider",
    "Belt Extender Collector",
    "Scale Anxiety Initiate"
];

const obeseAchievements = [
    "Orbital Body Achieved",
    "Human Gravity Well",
    "Furniture's Worst Nightmare",
    "Scale Warranty Voider",
    "Couch Crusher Elite",
    "Atmospheric Displacement Expert"
];

let lastResult = {};

document.getElementById('calculateBtn').addEventListener('click', calculateBMI);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.target.id === 'height' || e.target.id === 'weight')) {
        calculateBMI();
    }
});

document.getElementById('share-results').addEventListener('click', function() {
    // Guard against clicking share before any calculation has populated lastResult.
    if (!lastResult.bmi) return;
    playRetroSound('click');
    document.getElementById('card-bmi').textContent = 'BMI: ' + lastResult.bmi;
    document.getElementById('card-message').textContent = '"' + lastResult.sassMessage + '"';
    document.getElementById('card-advice').textContent = 'Doctor\'s advice: ' + lastResult.advice;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('achievement-card').style.display = 'block';
});

document.getElementById('close-card').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('achievement-card').style.display = 'none';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('achievement-card').style.display = 'none';
});

function calculateBMI() {
    playRetroSound('dialup');

    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const achievementDiv = document.getElementById('achievement');
    const badgeSpan = document.getElementById('badge');
    const shareBtn = document.getElementById('share-results');

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    resultDiv.style.backgroundColor = '';
    resultDiv.style.color = '';
    resultDiv.style.borderColor = '';
    resultDiv.textContent = '';
    achievementDiv.style.display = 'none';
    shareBtn.style.display = 'none';

    if (isNaN(heightCm) || isNaN(weightKg)) {
        resultDiv.textContent = '🤔 ERROR: Did you forget to type numbers? Or are you just testing my patience?';
        resultDiv.style.color = '#333';
        playRetroSound('click');
        return;
    }

    if (heightCm <= 0 || weightKg <= 0) {
        resultDiv.textContent = '🚨 ERROR: Negative numbers? What are you, antimatter?';
        resultDiv.style.color = '#333';
        playRetroSound('click');
        return;
    }

    if (heightCm > 300 || weightKg > 500) {
        resultDiv.textContent = '🤨 Nice try. Unless you are a giraffe or a truck, recheck those numbers.';
        resultDiv.style.color = '#333';
        playRetroSound('click');
        return;
    }

    loadingDiv.style.display = 'block';
    document.getElementById('calculateBtn').disabled = true;

    const isEasterEgg = (heightCm === 170 && weightKg === 170);

    setTimeout(() => {
        loadingDiv.style.display = 'none';
        document.getElementById('calculateBtn').disabled = false;

        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const bmiRounded = bmi.toFixed(2);

        let category;
        let textColor;
        let bgColor;
        let borderColor;
        let sassMessage;
        let achievementText;

        if (isEasterEgg) {
            category = 'LEGENDARY';
            textColor = '#ff00ff';
            bgColor = '#ffff00';
            borderColor = '#ff00ff';
            sassMessage = "170cm and 170kg? You are literally a perfect cube of a human. Your BMI is 58.82. That's not a body type, that's a GEOGRAPHICAL FEATURE 🗿";
            achievementText = "Achievement: Perfect Cube Human 🧊";
        } else if (bmi < 18.5) {
            category = 'Underweight';
            textColor = '#0066cc';
            bgColor = '#e6f2ff';
            borderColor = '#0066cc';
            sassMessage = getRandomMessage(sassyMessages.underweight);
            achievementText = normalAchievements[0];
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
            textColor = '#228b22';
            bgColor = '#e6ffe6';
            borderColor = '#228b22';
            sassMessage = getRandomMessage(sassyMessages.normal);
            achievementText = normalAchievements[1];
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            textColor = '#ff8c00';
            bgColor = '#fff4e6';
            borderColor = '#ff8c00';
            sassMessage = getRandomMessage(sassyMessages.overweight);
            achievementText = normalAchievements[2];
        } else {
            category = 'Obese';
            textColor = '#cc0000';
            bgColor = '#ffe6e6';
            borderColor = '#cc0000';
            sassMessage = getRandomMessage(sassyMessages.obese);
            achievementText = getRandomMessage(obeseAchievements);
        }

        const advice = getDoctorAdvice(category);

        // Build result DOM with textContent (no innerHTML) so interpolated
        // values are treated as text, never as markup.
        resultDiv.textContent = '';
        const congrats = document.createElement('div');
        congrats.style.fontSize = '28px';
        congrats.style.marginBottom = '10px';
        congrats.textContent = '🎉 CONGRATULATIONS! 🎉';
        resultDiv.appendChild(congrats);

        const bmiLine = document.createElement('div');
        const bmiLabel = document.createTextNode('Your BMI: ');
        const bmiStrong = document.createElement('strong');
        bmiStrong.style.fontSize = '32px';
        bmiStrong.textContent = bmiRounded;
        bmiLine.append(bmiLabel, bmiStrong);
        resultDiv.appendChild(bmiLine);

        const categoryLine = document.createElement('div');
        categoryLine.style.margin = '10px 0';
        const categoryStrong = document.createElement('strong');
        categoryStrong.textContent = category;
        categoryLine.append('Category: ', categoryStrong);
        resultDiv.appendChild(categoryLine);

        const quoteBox = document.createElement('div');
        quoteBox.style.fontStyle = 'italic';
        quoteBox.style.marginTop = '15px';
        quoteBox.style.padding = '10px';
        quoteBox.style.background = 'rgba(255,255,255,0.7)';
        quoteBox.style.borderRadius = '5px';
        quoteBox.textContent = '"' + sassMessage + '"';
        resultDiv.appendChild(quoteBox);

        const adviceLine = document.createElement('div');
        adviceLine.style.marginTop = '15px';
        adviceLine.style.fontSize = '14px';
        adviceLine.style.color = '#666';
        const adviceEm = document.createElement('em');
        adviceEm.textContent = '💡 Doctor\'s advice: ' + advice;
        adviceLine.appendChild(adviceEm);
        resultDiv.appendChild(adviceLine);
        resultDiv.style.color = textColor;
        resultDiv.style.backgroundColor = bgColor;
        resultDiv.style.borderColor = borderColor;

        lastResult = {
            bmi: bmiRounded,
            category: category,
            sassMessage: sassMessage,
            advice: advice
        };

        badgeSpan.textContent = achievementText;
        achievementDiv.style.display = 'block';
        shareBtn.style.display = 'block';

        playRetroSound('success');

    }, 2000);
}

function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

function getDoctorAdvice(category) {
    const advice = {
        'Underweight': 'Have you tried... existing with more mass?',
        'Normal': 'Keep being disappointingly average!',
        'Overweight': 'Maybe put down the donut? Just one?',
        'Obese': 'We have contacted your local gravitational research facility.',
        'LEGENDARY': 'You have achieved maximum density. NASA is impressed.'
    };
    return advice[category];
}

let visitorCount = 42;
setInterval(() => {
    if (Math.random() > 0.4) {
        visitorCount++;
        const counter = document.getElementById('visitorCount');
        if (counter) {
            counter.textContent = visitorCount.toString().padStart(8, '0');
        }
    }
}, 1500);
