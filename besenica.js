// --- CONFIGURATION: ADD YOUR WORDS HERE ---
const wordList = ["ВОДОРОД", "КИСЛОРОД", "АЗОТ", "ЖЕЛЯЗО", "МОЛЕКУЛА", "РЕАКЦИЯ"];

let selectedWord = "";
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 11;
const hangmanParts = ['g-base', 'g-pole', 'g-beam', 'g-rope', 'head', 'body', 'l-arm', 'r-arm', 'l-leg', 'r-leg'];

const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ".split("");

function initGame() {
    // Pick random word
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    guessedLetters = [];
    mistakes = 0;

    // Reset Hangman
    document.querySelectorAll('.part').forEach(p => p.classList.remove('show'));

    // Create Word Slots
    wordDisplay.innerHTML = "";
    selectedWord.split("").forEach(() => {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        slot.innerHTML = `<span class="letter-text"></span><div class="underline"></div>`;
        wordDisplay.appendChild(slot);
    });

    // Create Keyboard
    keyboard.innerHTML = "";
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.innerText = letter;
        btn.className = 'key';
        btn.onclick = () => handleGuess(letter, btn);
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, button) {
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        // Correct Guess
        button.classList.add('correct');
        updateWordDisplay(letter);
        checkWin();
    } else {
        // Wrong Guess
        button.classList.add('wrong');
        showNextPart();
        mistakes++;
        if (mistakes === maxMistakes) endGame(false);
    }
}

function updateWordDisplay(letter) {
    const slots = document.querySelectorAll('.letter-text');
    selectedWord.split("").forEach((char, index) => {
        if (char === letter) {
            slots[index].innerText = char;
            slots[index].classList.add('visible');
        }
    });
}

function showNextPart() {
    // Only try to draw if we haven't run out of parts in the array
    if (mistakes < hangmanParts.length) {
        const partId = hangmanParts[mistakes];
        document.getElementById(partId).classList.add('show');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));

    cells.forEach((cell, index) => {
        // 1. Auto-move forward on typing
        cell.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < cells.length - 1) {
                cells[index + 1].focus();
            }
        });

        cell.addEventListener('keydown', (e) => {
            // 2. Backspace: If empty, go back and clear the previous cell
            if (e.key === 'Backspace') {
                if (cell.value === '' && index > 0) {
                    e.preventDefault();
                    cells[index - 1].focus();
                    cells[index - 1].value = '';
                }
            }

            // 3. Enter: Move to the next rectangle
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < cells.length - 1) {
                    cells[index + 1].focus();
                }
            }
        });
    });
});

function showEndGameModal(won) {
    const modal = document.getElementById('game-modal');
    const title = document.getElementById('modal-title');
    const message = document.getElementById('modal-message');

    modal.style.display = 'flex';
    title.innerText = won ? "ПОБЕДА! 🏆" : "КРАЙ НА ИГРАТА!";
    message.innerText = won ? `Познахте думата: ${selectedWord}` : `Бесеницата е готова. Думата беше: ${selectedWord}`;
}

// Обновете съществуващите функции:
function checkWin() {
    const visibleLetters = document.querySelectorAll('.letter-text.visible').length;
    if (visibleLetters === selectedWord.length) {
        setTimeout(() => showEndGameModal(true), 500);
    }
}

function endGame(won) {
    if (!won) {
        setTimeout(() => showEndGameModal(false), 500);
    }
}

// Start
initGame();