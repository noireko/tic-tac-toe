/* ---------- DOM ---------- */
const cells = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const turnText = document.getElementById("turn");
const scoreText = document.getElementById("score");

/* ---------- PLAYERS ---------- */
function createUser(name, symbol) {
  let score = 0;

  const getScore = () => score;
  const addPoint = () => score++;

  return { name, symbol, getScore, addPoint };
}

let playerX;
let playerO;

/* ---------- GAME STATE ---------- */
let currentPlayer = "X";
let gameOver = false;

/* ---------- BOARD ---------- */
function gameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }
  return board;
}

let board = gameBoard();

/* ---------- TURN ---------- */
function switchTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnText();
}

/* ---------- RENDER ---------- */
function renderBoard() {
  cells.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    cell.innerText = board[row][col];
  });
}

function updateTurnText() {
  const name = currentPlayer === "X" ? playerX.name : playerO.name;
  turnText.innerText = `Turno de ${name} (${currentPlayer})`;
}

function updateScore() {
  scoreText.innerText = `
    ${playerX.name} (X): ${playerX.getScore()} | 
    ${playerO.name} (O): ${playerO.getScore()}
  `;
}

/* ---------- WIN CHECK ---------- */
function checkWinner() {
  const winningCombos = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a[0]][a[1]] !== "" &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    );
  });
}

/* ---------- RESET BOARD ---------- */
function resetBoard() {
  board = gameBoard();
  gameOver = false;
  currentPlayer = "X";
  renderBoard();
  updateTurnText();
}

/* ---------- CLICK ---------- */
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver) return;

    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (board[row][col] !== "") return;

    board[row][col] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
      const winner = currentPlayer === "X" ? playerX : playerO;
      winner.addPoint();
      updateScore();
      alert(`Ganó ${winner.name}`);
      gameOver = true;
      return;
    }

    switchTurn();
  });
});

/* ---------- START GAME ---------- */
startBtn.addEventListener("click", () => {
  const nameX = playerXInput.value || "Jugador X";
  const nameO = playerOInput.value || "Jugador O";

  playerX = createUser(nameX, "X");
  playerO = createUser(nameO, "O");

  updateScore();
  resetBoard();
});
