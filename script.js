const word = "cream";
const wordArray = word.split('');

const allInputs = document.querySelectorAll('.input-row input');

allInputs.forEach(sampleFn)

function sampleFn(input) {
    input.addEventListener('keydown', function (e) {
        if (!e.code.startsWith('Key') && e.key !== 'Enter' && e.key !== 'Backspace') {
            e.preventDefault();
            return false;
        }
    })

    input.addEventListener('keyup', function (e) {
        if (!e.code.startsWith('Key') && e.key !== 'Enter' && e.key !== 'Backspace') {
            return;
        }

        const parentElement = input.parentElement;
        const inputsInParent = Array.from(parentElement.children);
        const inputIndex = inputsInParent.indexOf(input);

        if (inputIndex < 4) {
            //console.log(inputsInParent);
            const nextInputIndex = inputIndex + 1;
            const nextInput = inputsInParent[nextInputIndex];
            nextInput.focus();
        } 
        
        else if (e.key === 'Enter') {
            let currentGuess = [];

            for (let i = 0; i < inputsInParent.length; i++) {
                currentGuess.push(inputsInParent[i].value);

                if (currentGuess.toString() === wordArray.toString()) {
                    const input = inputsInParent[i];

                    input.classList.add('correct');

                    alert('You Win!');

                    return;
                }

                //console.log(currentGuess);

                if (currentGuess[i] === wordArray[i]) {
                    const input = inputsInParent[i];

                    input.classList.add('correct');
                }

                else if (wordArray.includes(currentGuess[i])) {
                    const input = inputsInParent[i];

                    input.classList.add('close');
                }

                else {
                    const input = inputsInParent[i];

                    input.classList.add('wrong');
                }
            }
            // moves to next line
            const nextRow = parentElement.nextElementSibling;

            if (nextRow) {
                nextRow.children.item(0).focus();
            } 
            // i added this part
            else {
                alert(`game over the word was ${word}`);

                return;
            }
        }

        if (e.key === 'Backspace') {
            //console.log(`you pressed ${e.key}`);
            const lastIndex = inputIndex - 1;
            const nextInput = inputsInParent[lastIndex];
            nextInput.focus();
            nextInput.value = ''
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