// Tic Tac Toe game logic
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // 3x3 grid
let gameActive = true;

const checkWinner = () => {
  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any winning combination is matched
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for a tie (no empty spots left)
  if (!board.includes('')) {
    return 'Tie';
  }

  return null; // No winner yet
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');

  // Prevent clicking if the cell is already filled or the game is over
  if (board[index] !== '' || !gameActive) return;

  // Fill the cell with the current player's mark
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Check for winner
  const winner = checkWinner();
  if (winner) {
    if (winner === 'Tie') {
      statusText.textContent = "It's a Tie!";
    } else {
      statusText.textContent = `${winner} Wins!`;
      statusText.classList.add('winner');
    }
    gameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";
  statusText.classList.remove('winner');
  cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);