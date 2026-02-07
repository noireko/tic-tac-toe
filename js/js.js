const cell = document.querySelectorAll(".cell")

let currentPlayer = "X";

function switchTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

cell.forEach(cell => {
    cell.addEventListener("click", () => {
        if (currentPlayer === "X") {
            cell.innerText = "X"
        } else {
            cell.innerText = "O"
        }
        switchTurn()
    })
});



function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
    return board
}


const board = gameBoard();
console.table(board);