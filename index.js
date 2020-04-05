M.AutoInit();

const modal = document.getElementById('m');
const modalMessae = document.getElementById('modal1');
const play = document.getElementById('play');
const words = document.querySelector('.words');
const wrongs = document.querySelector('.wrong_word');
const human = document.querySelectorAll('.human');
const category = document.getElementById('type');

modal.style.display = "none";

let correctLetters = [];
let inCorrectLetters = [];

let data = [{
        type: "math",
        words: ["addition", "multiplication", "soustraction", "division"]
    },
    {
        type: "informatique",
        words: ["javascript", "php", "angular", "symfony", "nodejs"]
    },
    {
        type: "database",
        words: ["mysql", "mongodb", "redis", "oracl"]
    },
];

const randomWord = () => {
    let random = data[Math.floor(Math.random() * data.length)];
    let type = random.type;
    let word = random.words[Math.floor(Math.random() * random.words.length)];
    return {
        type,
        word
    };
}

let {
    type,
    word
} = randomWord();

const displayLettres = () => {
    words.innerHTML = `
     ${word.split('').map(l=>`<div>${correctLetters.includes(l) ? l : ''}</div>`).join('')}
    `;
    let innerWord = words.innerText.replace(/\n/g, '');
    if (innerWord === word) {
        modal.click();
    }

}

const showIncorrectLetter = () => {
    wrongs.innerHTML = inCorrectLetters;
    human.forEach((el, index) => {
        if (index < inCorrectLetters.length) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    });

    if (inCorrectLetters.length === human.length) {
        modal.click();
        modalMessae.querySelector('p').innerText = "you are lost";
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        let letter = event.key
        if (word.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayLettres();
            } else {
                M.toast({
                    html: " this letter is already exist "
                });
            }

        } else {
            if (!inCorrectLetters.includes(letter)) {
                inCorrectLetters.push(letter);
                showIncorrectLetter();
            } else {
                M.toast({
                    html: " this letter is already exist "
                })
            }


        }
    }
})

const playAgain = () => {
    correctLetters = [];
    inCorrectLetters = [];
    let rand = randomWord();
    type = rand.type;
    word = rand.word;
    displayLettres();
    console.log(word);
    category.innerText = `(Category is ${type})`;
    showIncorrectLetter();
}

play.addEventListener('click', playAgain)

displayLettres();
category.innerText = `(Category is ${type})`;