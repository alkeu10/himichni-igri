document.addEventListener('DOMContentLoaded', () => {
    const columns = Array.from(document.querySelectorAll('.column')).map(col =>
        Array.from(col.querySelectorAll('.cell'))
    );

    function findPosition(cell) {
        for (let c = 0; c < columns.length; c++) {
            const r = columns[c].indexOf(cell);
            if (r !== -1) return { col: c, row: r };
        }
        return null;
    }

    columns.forEach(colCells => {
        colCells.forEach((cell, rowIndex) => {

            cell.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                if (e.target.value.length === 1 && rowIndex < colCells.length - 1) {
                    colCells[rowIndex + 1].focus();
                }
            });

            cell.addEventListener('keydown', (e) => {

                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (rowIndex < colCells.length - 1) {
                        colCells[rowIndex + 1].focus();
                    }
                }

                if (e.key === 'Backspace') {
                    if (cell.value === '') {
                        e.preventDefault();
                        if (rowIndex > 0) {
                            const prev = colCells[rowIndex - 1];
                            prev.focus();
                            prev.value = '';
                        }
                    }
                }

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (rowIndex < colCells.length - 1) colCells[rowIndex + 1].focus();
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (rowIndex > 0) colCells[rowIndex - 1].focus();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const pos = findPosition(cell);
                    if (pos && pos.col < columns.length - 1) {
                        columns[pos.col + 1][0].focus();
                    }
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const pos = findPosition(cell);
                    if (pos && pos.col > 0) {
                        columns[pos.col - 1][0].focus();
                    }
                }
            });
        });
    });
});