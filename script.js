let word = '';
let wordArray = [];
const WORD_URL = 'https://words.dev-apis.com/word-of-the-day';

const allInputs = document.querySelectorAll('.input-row input');

async function getWord() {
    const promise = await fetch(WORD_URL);
    const processedPromise = await promise.json();
    word = processedPromise.word;
    wordArray = word.split('');
    console.log(word); // to check if word is fetched correctly
}

getWord().then(() => {
    const loadingElement = document.getElementById('loader');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    allInputs.forEach(sampleFn);
});

function sampleFn(input) {
    input.addEventListener('keydown', function (e) {
        if (!e.code.startsWith('Key') && e.key !== 'Enter' && e.key !== 'Backspace') {
            e.preventDefault();
            return false;
        }
    });

    input.addEventListener('keyup', function (e) {
        if (!e.code.startsWith('Key') && e.key !== 'Enter' && e.key !== 'Backspace') {
            return;
        }

        const parentElement = input.parentElement;
        const inputsInParent = Array.from(parentElement.children);
        const inputIndex = inputsInParent.indexOf(input);

        if (inputIndex < 4) {
            const nextInputIndex = inputIndex + 1;
            const nextInput = inputsInParent[nextInputIndex];
            if (nextInput) {
                nextInput.focus();
            }
        } else if (e.key === 'Enter') {
            let currentGuess = [];

            for (let i = 0; i < inputsInParent.length; i++) {
                currentGuess.push(inputsInParent[i].value);
            }

            if (currentGuess.join('') === wordArray.join('')) {
                inputsInParent.forEach((input) => input.classList.add('correct'));
                alert('You Win!');
                return;
            }

            currentGuess.forEach((guessChar, i) => {
                if (guessChar === wordArray[i]) {
                    inputsInParent[i].classList.add('correct');
                } else if (wordArray.includes(guessChar)) {
                    inputsInParent[i].classList.add('close');
                } else {
                    inputsInParent[i].classList.add('wrong');
                }
            });

            const nextRow = parentElement.nextElementSibling;
            if (nextRow) {
                nextRow.children.item(0).focus();
            } else {
                alert(`Game over. The word was ${word}`);
            }
        }

        if (e.key === 'Backspace') {
            const lastIndex = inputIndex - 1;
            if (lastIndex >= 0) {
                const nextInput = inputsInParent[lastIndex];
                nextInput.focus();
                nextInput.value = '';
            }
        }
    });
}

//my first attempt 🥹
/* window.addEventListener('keydown', function enterKey(e) {

    if (e.key === "Enter") {
        const currentGuess = [];

        for (let i = 0; i < wordArray.length; i++) {
            const input = document.getElementById(i);

            const inputValue = input.value;

            currentGuess.push(inputValue);
        }

        // win function
        if (currentGuess.toString() === wordArray.toString()) {
            for (let i = 0; i < wordArray.length; i++) {
                const input = document.getElementById(i);

                input.classList.add('correct');
            }

            alert('correct');

            return;

        }

        else {
            for (let i = 0; i < wordArray.length; i++) {
                if (currentGuess[i] == wordArray[i]) {
                    const input = document.getElementById(i);

                    input.classList.add('correct');
                }

                else if (wordArray.includes(currentGuess[i])) {
                    const input = document.getElementById(i);

                    input.classList.add('close');
                }

                else {
                    const input = document.getElementById(i);

                    input.classList.add('wrong');
                }
            }
        }

        round++;

        console.log(round);
    }
}, false); */