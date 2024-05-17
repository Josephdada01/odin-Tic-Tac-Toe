document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const score1Display = document.getElementById('score1');
    const score2Display = document.getElementById('score2');
    const newGameButton = document.getElementById('newGame');
    const messageDisplay = document.getElementById('message');
    
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
            const winnerName = currentPlayer === 'X' ? player1Input.value : player2Input.value;
            displayMessage(`${winnerName} wins!`);
            updateScore(currentPlayer);
            resetBoard();
        } else if (boardState.every(cell => cell !== null)) {
            displayMessage(`It's a draw!`);
            resetBoard();
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
        displayMessage('');
        resetBoard();
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    newGameButton.addEventListener('click', startNewGame);
});
