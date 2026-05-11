const wordList = ["МЕТАЛ", "ОКСИД", "РАДИЙ", "АРГОН", "БАРИЙ", "ТИТАН", "ФЛУОР", "КВАРЦ", "СПЛАВ", "ХИМИЯ", "ЦЕЗИЙ", "БЕРИЛ"];
const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ".split("");

let targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
let currentRow = 0;
let currentTile = 0;
let gameOver = false;

const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const messageArea = document.getElementById('message-container');

function initGame() {
    board.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${currentRow + i}-${j}`; // Корекция на ID-тата за по-лесно управление
            tile.id = `tile-${i}-${j}`;
            row.appendChild(tile);
        }
        board.appendChild(row);
    }

    keyboard.innerHTML = "";
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.innerText = letter;
        btn.className = 'key';
        btn.id = `key-${letter}`;
        btn.onclick = () => handleInput(letter);
        keyboard.appendChild(btn);
    });

    addSpecialKey("←", "Backspace");
    addSpecialKey("ENTER", "Enter");
}

function addSpecialKey(label, action) {
    const btn = document.createElement('button');
    btn.innerText = label;
    btn.className = 'key wide';
    btn.onclick = () => handleInput(action.toUpperCase());
    keyboard.appendChild(btn);
}

function handleInput(key) {
    if (gameOver) return;

    if (key === 'BACKSPACE') {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
            tile.innerText = "";
            tile.classList.remove('pop');
        }
    } else if (key === 'ENTER') {
        if (currentTile === 5) checkRow();
        else showMessage("Твърде малко букви!");
    } else if (currentTile < 5 && alphabet.includes(key)) {
        const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
        tile.innerText = key;
        tile.classList.add('pop');
        currentTile++;
    }
}

async function checkRow() {
    let guess = "";
    const tiles = [];
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tiles.push(tile);
        guess += tile.innerText;
    }

    if (!wordList.includes(guess)) {
        showMessage("Няма такава дума!");
        const row = document.getElementsByClassName('row')[currentRow];
        row.style.animation = "shake 0.5s";
        setTimeout(() => row.style.animation = "", 500);
        return;
    }

    // ЛОГИКА ЗА ПРАВИЛНО ОЦВЕТЯВАНЕ (Wordle Algorithm)
    const targetLetters = targetWord.split("");
    const guessLetters = guess.split("");
    const statuses = Array(5).fill("absent"); // По подразбиране всички са сиви

    // 1. Първо минаваме за ЗЕЛЕНИТЕ (правилно място)
    guessLetters.forEach((letter, i) => {
        if (letter === targetLetters[i]) {
            statuses[i] = "correct";
            targetLetters[i] = null; // Маркираме буквата като "използвана"
        }
    });

    // 2. Второ минаваме за ЖЪЛТИТЕ (има я, но на друго място)
    guessLetters.forEach((letter, i) => {
        if (statuses[i] !== "correct" && targetLetters.includes(letter)) {
            statuses[i] = "present";
            targetLetters[targetLetters.indexOf(letter)] = null; // Маркираме като използвана
        }
    });

    // 3. Анимиране и оцветяване
    for (let i = 0; i < 5; i++) {
        const tile = tiles[i];
        const letter = guessLetters[i];
        const status = statuses[i];
        const keyBtn = document.getElementById(`key-${letter}`);

        tile.classList.add('flip');
        await new Promise(r => setTimeout(r, 250));

        tile.classList.add(status);
        
        // Обновяване на клавиатурата (само ако не е вече зелена)
        if (keyBtn) {
            if (status === "correct") {
                keyBtn.className = 'key correct';
            } else if (status === "present" && !keyBtn.classList.contains('correct')) {
                keyBtn.className = 'key present';
            } else if (status === "absent" && !keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) {
                keyBtn.className = 'key absent';
            }
        }
        await new Promise(r => setTimeout(r, 100));
    }

    if (guess === targetWord) {
        gameOver = true;
        setTimeout(() => showEndGameModal(true), 500);
    } else if (currentRow === 5) {
        gameOver = true;
        setTimeout(() => showEndGameModal(false), 500);
    } else {
        currentRow++;
        currentTile = 0;
    }
}

function showEndGameModal(won) {
    const modal = document.getElementById('game-modal');
    const title = document.getElementById('modal-title');
    const message = document.getElementById('modal-message');

    modal.style.display = 'flex';
    if (won) {
        title.innerText = "ПОБЕДА! 🎉";
        message.innerText = `Браво! Познахте думата: ${targetWord}`;
    } else {
        title.innerText = "ГРЕШКА! ❌";
        message.innerText = `Свършихте опитите. Думата беше: ${targetWord}`;
    }
}

function showMessage(msg) {
    messageArea.innerText = msg;
    setTimeout(() => messageArea.innerText = "", 3000);
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER' || key === 'BACKSPACE' || alphabet.includes(key)) {
        handleInput(key);
    }
});

initGame();