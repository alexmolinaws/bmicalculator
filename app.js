// Dark mode toggling
const root = document.documentElement;
const toggle = document.getElementById('toggle-theme');

const avatar = document.getElementById('avatar');
const userSex = document.getElementById('select-sex');
const userAge = document.getElementById('select-age');
const userWeight = document.getElementById('weight');
const userHeight = document.getElementById('height');

const errorText = document.getElementById("error-txt");
const calcButton = document.getElementById("calculate");
const field = document.getElementsByTagName('input');

const levelBar = document.getElementById("level-bar");
const userLevel = document.getElementById("level");
const userResult = document.getElementById('result-value');
const idealResult = document.getElementById('ideal-value');

const childRange = {
    healthy: 13.8,
    risky: 17.5,
    overweight: 19,
    obesity: 20,
};

const raisedRange = {
    healthy: 17,
    risky: 25,
    overweight: 27.6,
    obesity: 30,
};

let isValid = false;
let calcResult;

// Function that toggles dark and light mode
toggle.addEventListener('click', function(elements) {
    elements.preventDefault();

    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
});

userAge.addEventListener('change', checkForm);
userSex.addEventListener('change', checkForm);
field[0].addEventListener('input', checkForm);
field[1].addEventListener('input', checkForm);

// Performs ex-based avatar interactivity
userSex.addEventListener('change', function() {
    let maleAvatar = 'media/avatar-male.webp';
    let femaleAvatar = 'media/avatar-female.webp';
    let emptyAvatar = 'media/avatar-empty.webp';

    if (userSex.value == "male") {
        avatar.src = maleAvatar;
    } else if (userSex.value == "female") {
        avatar.src = femaleAvatar;
    } else {
        avatar.src = emptyAvatar;
    }
});

calcButton.addEventListener('click', function() {
    checkForm();
    if (isValid == true) {
        calcBMI();
        nextCard();
        display();
    }
});

function startApp() {
    getUserName();
    nextCard();
}

function getUserName() {
    const userName = prompt("What's your name?");
    document.getElementById('user-name').innerHTML=userName;
    return;
};

// Performs a one-way pagination
function nextCard() {
    const mainCard = document.getElementById('home');
    const testCard = document.getElementById('test-section');
    const chartCard = document.getElementById('result-section');
    const cards = [mainCard, testCard, chartCard];

    if (cards[1].classList.contains('hidden')) {
        cards[1].classList.remove('hidden');
        cards[0].classList.add('hidden');
    } else {
        cards[1].classList.add('hidden');
        cards[2].classList.remove('hidden');
    }
}

// Performs form validation
function checkForm() {
    if (userAge.value == 'empty' || userSex.value == 'empty' || field[0].value < 2 || field[1].value < 2) {
        calcButton.classList.add('button--dis');
        errorText.classList.remove("hidden");
        errorText.innerHTML = "Please be sure to fill this form. Height must be in centimeters. Don't worry, we won't collect any data.";
    } else {
        calcButton.classList.remove('button--dis');
        errorText.classList.add('hidden');
        isValid = true;
    }
};

// Performs the results processing
function display() {
    const levelData = {
        low: {
            name: "Underweight",
            value: 20,
        },
        good: {
            name: "Healthy",
            value: 45,
        },
        mid: {
            name: "Risky",
            value: 60,
        },
        high: {
            name: "Overweight",
            value: 75,
        },
        danger: {
            name: "Obesity",
            value: 93,
        },
    };

    // Sets reference range object based on age
    let reference = (userAge.value === "toddler") ? childRange : (userAge.value === "child") ? childRange : raisedRange;

    // Compares and displays result levels
    if (calcResult < reference.healthy) {
        userLevel.innerHTML = levelData.low.name;
        levelBar.value = levelData.low.value;
    } else if (calcResult < reference.risky) {
        userLevel.innerHTML = levelData.good.name;
        levelBar.value = levelData.good.value;
    } else if (calcResult < reference.overweight) {
        userLevel.innerHTML = levelData.mid.name;
        levelBar.value = levelData.mid.value;
    } else if (calcResult < reference.obesity) {
        userLevel.innerHTML = levelData.high.name;
        levelBar.value = levelData.high.value;
    } else {
        userLevel.innerHTML = levelData.danger.name;
        levelBar.value = levelData.danger.value;
    }

    // Gets and rounds reference values text
    idealResult.innerHTML = reference.healthy + ' ~ ' + reference.risky;
    userResult.innerHTML = calcResult.toFixed(2);
};

// Main function, purpose of the app
function calcBMI() {
    let weight, height;
    weight = userWeight.value;
    height = userHeight.value / 100;
    calcResult = weight / (height ** 2);
    return;
};