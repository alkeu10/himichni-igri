// --- CONFIGURATION: ADD YOUR WORDS HERE ---
const wordList = ["ВОДОРОД", "ХЕЛИЙ", "ЛИТИЙ", "БЕРИЛИЙ", "БОР", "ВЪГЛЕРОД", "АЗОТ", "КИСЛОРОД", "ФЛУОР", "НЕОН", 
  "НАТРИЙ", "МАГНЕЗИЙ", "АЛУМИНИЙ", "СИЛИЦИЙ", "ФОСФОР", "СЯРА", "ХЛОР", "АРГОН", "КАЛИЙ", "КАЛЦИЙ", 
  "СКАНДИЙ", "ТИТАН", "ВАНАДИЙ", "ХРОМ", "МАНГАН", "ЖЕЛЯЗО", "КОБАЛТ", "НИКЕЛ", "МЕД", "ЦИНК", 
  "ГАЛИЙ", "ГЕРМАНИЙ", "АРСЕН", "СЕЛЕН", "БРОМ", "КРИПТОН", "РУБИДИЙ", "СТРОНЦИЙ", "ИТРИЙ", "ЦИРКОНИЙ", 
  "НИОБИЙ", "МОЛИБДЕН", "ТЕХНЕЦИЙ", "РУТЕНИЙ", "РОДИЙ", "ПАЛАДИЙ", "СРЕБРО", "КАДМИЙ", "ИНДИЙ", "КАЛАЙ", 
  "АНТИМОН", "ТЕЛУР", "ЙОД", "КСЕНОН", "ЦЕЗИЙ", "БАРИЙ", "ЛАНТАН", "ЦЕРИЙ", "ПРАЗЕОДИМ", "НЕОДИМ", 
  "ПРОМЕТИЙ", "САМАРИЙ", "ЕВРОПИЙ", "ГАДОЛИНИЙ", "ТЕРБИЙ", "ДИСПРОЗИЙ", "ХОЛМИЙ", "ЕРБИЙ", "ТУЛИЙ", "ИТЕРБИЙ", 
  "ЛУТЕЦИЙ", "ХАФНИЙ", "ТАНТАЛ", "ВОЛФРАМ", "РЕНИЙ", "ОСМИЙ", "ИРИДИЙ", "ПЛАТИНА", "ЗЛАТО", "ЖИВАК", 
  "ТАЛИЙ", "ОЛОВО", "ВИСМУТ", "ПОЛОНИЙ", "АСТАТ", "РАДОН", "ФРАНЦИЙ", "РАДИЙ", "АКТИНИЙ", "ТОРИЙ", 
  "ПРОТАКТИНИЙ", "УРАН", "НЕПТУНИЙ", "ПЛУТОНИЙ", "АМЕРИЦИЙ", "КЮРИЙ", "БЕРКЛИЙ", "КАЛИФОРНИЙ", "АЙНЩАЙНИЙ", "ФЕРМИЙ",

  // Органични съединения и групи
  "МЕТАН", "ЕТАН", "ПРОПАН", "БУТАН", "ПЕНТАН", "ХЕКСАН", "ХЕПТАН", "ОКТАН", "НОНАН", "ДЕКАН", 
  "ЕТИЛЕН", "АЦЕТИЛЕН", "БЕНЗЕН", "ТОЛУЕН", "КСИЛЕН", "ФЕНОЛ", "АНИЛИН", "ЕТАНОЛ", "МЕТАНОЛ", "АЦЕТОН", 
  "ГЛИЦЕРИН", "ЕТЕР", "ЕСТЕР", "АЛДЕХИД", "КЕТОН", "КИСЕЛИНА", "АМИД", "АМИН", "НИТРИЛ", "ТИОЛ",
  "ГЛЮКОЗА", "ФРУКТОЗА", "ЗАХАРОЗА", "ЛАКТОЗА", "МАЛТОЗА", "НИШЕСТЕ", "ЦЕЛУЛОЗА", "ГЛИКОГЕН", "ХИТИН", "ЛИПИД",
  "ПРОТЕИН", "АМИНОКИСЕЛИНА", "ПЕПТИД", "ЕНЗИМ", "ХОРМОН", "ВИТАМИН", "НУКЛЕОТИД", "ДНК", "РНК", "АТФ",

  // Процеси и понятия
  "ОКИСЛЕНИЕ", "РЕДУКЦИЯ", "ЕЛЕКТРОЛИЗА", "ДИСТИЛАЦИЯ", "СУБЛИМАЦИЯ", "КОНДЕНЗАЦИЯ", "ИЗПАРЕНИЕ", "КРИСТАЛИЗАЦИЯ", "ФИЛТРАЦИЯ", "СЕДИМЕНТАЦИЯ",
  "ДИФУЗИЯ", "ОСМОЗА", "АДСОРБЦИЯ", "АБСОРБЦИЯ", "КАТАЛИЗА", "ИНХИБИЦИЯ", "ТИТРУВАНЕ", "НЕЙТРАЛИЗАЦИЯ", "ХИДРОЛИЗА", "ПОЛИМЕРИЗАЦИЯ",
  "ВАЛЕНТНОСТ", "ЕЛЕКТРООТРИЦАТЕЛНОСТ", "ИЗОТОП", "АЛОТРОПИЯ", "ИЗОМЕРИЯ", "ХИБРИДИЗАЦИЯ", "ЕНТАЛПИЯ", "ЕНТРОПИЯ", "РАДИОАКТИВНОСТ", "ПОЛУРАЗПАД",
  "МОЛЯРНОСТ", "КОНЦЕНТРАЦИЯ", "НАСИТЕНОСТ", "РАЗТВОРИМОСТ", "УТАЙКА", "КОЛОИД", "ЕГЗОТЕРМИЧНА", "ЕНДОТЕРМИЧНА", "РЕАКТИВ", "ИНДИКАТОР",

  // Лаборатория и техника
  "ЕПРУВЕТКА", "КОЛБА", "МЕНЗУРА", "ПИПЕТА", "БЮРЕТА", "ФУНИЯ", "ДИСИКАТОР", "АВТОКЛАВ", "ЦЕНТРИФУГА", "МИКРОСКОП",
  "СПЕКТРОМЕТЪР", "ХРОМАТОГРАФ", "РЕФРАКТОМЕТЪР", "ВЕЗНА", "ГОРЕЛКА", "СТАТИВ", "ТЕРМОМЕТЪР", "МАГНИТНА", "БЪРКАЛКА", "ТИГЕЛ",

  // Минерали и обща химия
  "КВАРЦ", "ПИРИТ", "МАЛАХИТ", "ХЕМАТИТ", "БОКСИТ", "ГИПС", "ВАРОВИК", "МРАМОР", "ГРАФИТ", "ДИАМАНТ",
  "КОРУНД", "САПФИР", "РУБИН", "АМЕТИСТ", "ФЛУОРИТ", "АПАТИТ", "ТАЛК", "ПОЛЕВ", "ШПАТ", "СЛЮДА",
  "СПЛАВ", "СТОМАНА", "БРОНЗ", "МЕСИНГ", "АМАЛГАМА", "НЕФТ", "БЕНЗИН", "КЕРОСИН", "ПАРАФИН", "БИТУМ",
  "САПУН", "ДЕТЕРГЕНТ", "ПОЛИМЕР", "ПЛАСТМАСА", "КАУЧУК", "ТЕФЛОН", "НАЙЛОН", "КЕВЛАР", "КОЛОФОН", "БАЛСАМ",

  // Учени (за по-трудно)
  "МЕНДЕЛЕЕВ", "ЛАВОАЗИЕ", "ДАЛТОН", "РЪДЪРФОРД", "БОР", "КЮРИ", "АВОГАДРО", "ЛЕ ШАТЕЛИЕ", "ПАУЛИ", "ХАЙЗЕНБЕРГ"];

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