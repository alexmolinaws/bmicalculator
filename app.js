// Dark mode toggling
let root = document.documentElement;
let toggle = document.getElementById('toggle-theme');

toggle.addEventListener('click', function(elements) {
    elements.preventDefault();

    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
});

// One-way paging switch
function nextCard() {
    let mainCard, testCard, chartCard;
    mainCard = document.getElementById('home');
    testCard = document.getElementById('test-section');
    chartCard = document.getElementById('result-section');
    let cards = [mainCard, testCard, chartCard];

    if (cards[1].classList.contains('hidden')) {
        cards[1].classList.remove('hidden');
        cards[0].classList.add('hidden');
    } else {
        cards[1].classList.add('hidden');
        cards[2].classList.remove('hidden');
    }
}

function getUserName() {
    let userName = prompt("What's your name?");
    document.getElementById('user-name').innerHTML=userName;
    return;
};

function startApp() {
    getUserName();
    nextCard();
}

// Sex-based avatar interactivity
let userSex = document.getElementById('select-sex');
let avatar = document.getElementById('avatar');

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

let field = document.getElementsByTagName('input');
let userAge = document.getElementById('select-age');
let calcButton = document.getElementById("calculate");

// Sets form validation
let errorText = document.getElementById("error-txt");
let isValid = false;

function checkForm() {
    if (userAge.value == 'empty' || userSex.value == 'empty' || field[0].value < 2 || field[1].value < 2) {
        calcButton.classList.add('button--dis');
        errorText.classList.remove("hidden");
        errorText.innerHTML = "Please be sure to fill this form. Height must be in centimeters. Don't worry, we won't collect any data.";
    } else {
        calcButton.classList.remove('button--dis');
        errorText.classList.add("hidden");
        isValid = true;
    }
};

userAge.addEventListener('change', checkForm);
userSex.addEventListener('change', checkForm);
field[0].addEventListener('input', checkForm);
field[1].addEventListener('input', checkForm);

// Sets the calculator
let userWeight = document.getElementById('weight');
let userHeight = document.getElementById('height');
let calcResult;

function calcBMI() {
    let weight, height;
    weight = userWeight.value;
    height = userHeight.value / 100;
    calcResult = weight / (height ** 2);
    return;
};

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

let levelBar = document.getElementById("level-bar");
let userLevel = document.getElementById("level");
let userResult = document.getElementById('result-value');
let idealResult = document.getElementById('ideal-value');

function display() {
    let levelData = {
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

    // Sets the reference range object based on age
    let reference = (userAge.value == "toddler") ? childRange : (userAge.value == "child") ? childRange : raisedRange;

    // Compares and displays result
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

    idealResult.innerHTML = reference.healthy + " ~ " + reference.risky;
    userResult.innerHTML = calcResult.toFixed(2);
};

calcButton.addEventListener('click', function() {
    checkForm();
    if (isValid == true) {
        calcBMI();
        nextCard();
        display();
    }
});