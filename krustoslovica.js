document.addEventListener('DOMContentLoaded', () => {
    // ВАЖНО: Тези думи трябва да имат ТОЧНО толкова букви, колкото са клетките в съответната колона
    const solutions = [
        "МЕТАН",          // Код 1
        "БЕЛТЪЦИ",        // Код 2
        "САПУНИ",         // Код 3
        "ОКСИД",          // Код 4
        "ПОЛИМЕРИЗАЦИЯ",    // Код 5
        "АЛКОХОЛИ",       // Код 6
        "ЕСТЕР",          // Код 7
        "ГЛИЦЕРОЛ",       // Код 8
        "ВОДОРОД"         // Код 9
    ];

    const columns = Array.from(document.querySelectorAll('.column')).map(col =>
        Array.from(col.querySelectorAll('.cell'))
    );

    const checkBtn = document.getElementById('check-button');

    // Логика за въвеждане и навигация
    columns.forEach((colCells, colIndex) => {
        colCells.forEach((cell, rowIndex) => {
            cell.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                cell.classList.remove('error', 'success');
                if (e.target.value.length === 1 && rowIndex < colCells.length - 1) {
                    colCells[rowIndex + 1].focus();
                }
            });
        });
    });

    // Проверка на отговорите
    checkBtn.addEventListener('click', () => {
        let allCorrect = true;

        columns.forEach((colCells, colIndex) => {
            const correctWord = solutions[colIndex];
            
            colCells.forEach((cell, rowIndex) => {
                const letter = cell.value.trim().toUpperCase();
                
                // Ако клетката е празна или буквата не съвпада с буквата от думата в масива
                if (letter === "" || letter !== correctWord[rowIndex]) {
                    cell.classList.add('error');
                    cell.classList.remove('success');
                    allCorrect = false;
                } else {
                    cell.classList.add('success');
                    cell.classList.remove('error');
                }
            });
        });

        if (allCorrect) {
            showEndGameModal(true);
        } else {
            // Вместо досаден alert, само оцветяваме грешните
            console.log("Има грешни или празни клетки.");
        }
    });

    function showEndGameModal(won) {
        const modal = document.getElementById('game-modal');
        if(modal) modal.style.display = 'flex';
    }
});