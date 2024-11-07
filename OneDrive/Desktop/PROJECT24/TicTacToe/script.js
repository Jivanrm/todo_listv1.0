// DOM Elements
const startGameBtn = document.getElementById("startGameBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

// Sound Effects
const placeSound = document.getElementById("placeSound");
const clickSound = new Audio("sounds/click.mp3");
const gameOverSound = new Audio("sounds/gameOver.mp3");

let currentPlayer = "X"; // X is the first player
let isGameActive = true;
let isPaused = false;
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Event Listeners
startGameBtn.addEventListener("click", () => {
  clickSound.play();
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  startGame();
});

restartBtn.addEventListener("click", () => {
  clickSound.play();
  startGame();
});

pauseBtn.addEventListener("click", () => {
  clickSound.play();
  togglePause();
});

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("X", "O", "win");
    cell.style.backgroundColor = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";  // Start with Player X
  isGameActive = true;
  isPaused = false;
  updateStatus();
}

function handleClick(e) {
  if (isPaused || !isGameActive) return;
  const cell = e.target;
  cell.classList.add(currentPlayer);
  cell.style.backgroundColor = currentPlayer === "X" ? "#3498db" : "#e74c3c"; // BLUE for X, RED for O
  placeSound.play();

  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function updateStatus() {
  // Update the player text to use "BLUE" for X and "RED" for O
  statusText.innerHTML = `Player ${currentPlayer === "X" ? "BLUE" : "RED"}'s Turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    if (combination.every(index => cells[index].classList.contains(currentPlayer))) {
      combination.forEach(index => cells[index].classList.add("win"));
      return true;
    }
    return false;
  });
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains("X") || cell.classList.contains("O"));
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function endGame(draw) {
  isGameActive = false;
  gameOverSound.play();
  if (draw) {
    statusText.innerHTML = "It's a Draw!";
  } else {
    statusText.innerHTML = `Player ${currentPlayer === "X" ? "BLUE" : "RED"} Wins!`;
  }
}

function togglePause() {
  isPaused = !isPaused;
  statusText.innerHTML = isPaused ? "Game Paused" : `Player ${currentPlayer === "X" ? "BLUE" : "RED"}'s Turn`;
}
