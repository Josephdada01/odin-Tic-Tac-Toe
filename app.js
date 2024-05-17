document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const score1Display = document.getElementById('score1');
    const score2Display = document.getElementById('score2');
    const newGameButton = document.getElementById('newGame');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let score1 = 0;
    let score2 = 0;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = e.target.getAttribute('data-index');
        if (boardState[index] !== null) {
            return;
        }
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            updateScore(currentPlayer);
            resetGame();
        } else if (boardState.every(cell => cell !== null)) {
            setTimeout(() => alert(`It's a draw!`), 10);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function updateScore(winner) {
        if (winner === 'X') {
            score1++;
            score1Display.textContent = score1;
        } else {
            score2++;
            score2Display.textContent = score2;
        }
    }

    /*function resetGame() {
        boardState = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });*/

    function resetBoard() {
        boardState = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }

    function startNewGame() {
        score1 = 0;
        score2 = 0;
        score1Display.textContent = score1;
        score2Display.textContent = score2;
        resetBoard();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    newGameButton.addEventListener('click', startNewGame);
});
