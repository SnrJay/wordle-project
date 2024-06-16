const WORD_URL = 'https://words.dev-apis.com/word-of-the-day';
const CHECK_WORD_URL = 'https://words.dev-apis.com/validate-word';

let word = '';
let wordArray = [];
let isValidWord; 

const allInputs = document.querySelectorAll('.input-row input');

async function getWord() {
    const promise = await fetch(WORD_URL);
    const processedPromise = await promise.json();
    word = processedPromise.word;
    wordArray = word.split('');
    console.log(word); // to check if word is fetched correctly
}

async function checkWord(url = '', data = {}) {
    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data);
  
    // Define the options for the fetch request
    const fetchOptions = {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: jsonData // The data to send in the request body
    };
  
    // Make the request using fetch and wait for the response
    const response = await fetch(url, fetchOptions);
  
    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      // If the response is not OK, throw an error with the status text
      throw new Error('Network response was not ok ' + response.statusText);
    }
  
    // Parse the JSON response
    const responseData = await response.json();
    isValidWord = responseData.validWord;
  }

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
        //console.log(parentElement);
        const inputsInParent = Array.from(parentElement.children);
        //console.log(inputsInParent);
        const inputIndex = inputsInParent.indexOf(input);

        if (inputIndex < 4) {
            const nextInputIndex = inputIndex + 1;
            const nextInput = inputsInParent[nextInputIndex];
            if (nextInput) {
                nextInput.focus();
            }
        } else if (e.key === 'Enter') {
            const loadingElement = document.getElementById('loader');
            loadingElement.style.visibility = 'visible';

            let currentGuess = [];
            let data = {};

            for (let i = 0; i < inputsInParent.length; i++) {
                currentGuess.push(inputsInParent[i].value);
            }

            // the following code isn't great but it works
            data.word = currentGuess.join('');
            //console.log(data);

            console.log(checkWord(CHECK_WORD_URL, data));

            checkWord(CHECK_WORD_URL, data)
            .then(() => {
                const loadingElement = document.getElementById('loader');
                if (loadingElement) {
                    loadingElement.style.visibility = 'hidden';
                }

                if (!isValidWord) {
                    currentGuess.forEach((guessChar, i) => {
                        inputsInParent[i].classList.add('invalid');
                    });
                    setTimeout(() => {
                        currentGuess.forEach((guessChar, i) => {
                            inputsInParent[i].classList.remove('invalid', 'wrong', 'close', 'correct')
                        })
                    }, 1000);

                    const nextInput = inputsInParent[inputIndex];
                    nextInput.focus();
                }
            })
            // end of embarrassment

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

getWord().then(() => {
    const loadingElement = document.getElementById('loader');
        if (loadingElement) {
            loadingElement.style.visibility = 'hidden';
        }
    allInputs.forEach(sampleFn);
});

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