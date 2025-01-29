Tic Tac Yo is a fun and interactive web-based game built using HTML, CSS, and JavaScript. It follows the traditional Tic Tac Toe mechanics, where two players take turns marking "X" or "O" on a 3×3 grid. The first player to align three of their marks horizontally, vertically, or diagonally wins the game.

Key Features:
1. Simple and Responsive UI: Designed using HTML and CSS, making it visually appealing and mobile-friendly.
2. Interactive Gameplay: JavaScript manages player turns, validates the winner, and displays game status dynamically.
3. Restart Option: Players can reset the game anytime without refreshing the page.
4. Winning Logic Implementation: Checks for a win or a draw after every move and provides instant feedback.

my codes-

html-

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tic Tac Toe</title>
  <link rel="stylesheet" href="style.css">
  <script src="tic.js" defer></script>
</head>
<body>

  <div class="game-container">
    <h1>Tic Tac Toe</h1>
    <div class="board">
      <div class="cell" data-index="0"></div>
      <div class="cell" data-index="1"></div>
      <div class="cell" data-index="2"></div>
      <div class="cell" data-index="3"></div>
      <div class="cell" data-index="4"></div>
      <div class="cell" data-index="5"></div>
      <div class="cell" data-index="6"></div>
      <div class="cell" data-index="7"></div>
      <div class="cell" data-index="8"></div>
    </div>
    <button id="reset-btn">Reset Game</button>
    <p id="status">Player X's turn</p>
  </div>
  <script src="script.js"></script>
</body>
</html>

css-


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
  }
  
  .game-container {
    text-align: center;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    margin-bottom: 20px;
  }
  
  .cell {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    font-size: 2rem;
    cursor: pointer;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    color: red;
    background: beige;
    border-radius: 10px;
    
  }

  #reset-btn:hover{
    color: #780C28;
    background-color: #8ecae6;
  }
  
  #status {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .winner {
    color: green;
  }


  javascript-


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
