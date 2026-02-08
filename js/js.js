const cell = document.querySelectorAll(".cell")

let currentPlayer = "X";

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

const winningChances = [
    [board[0][0], board[0][1], board[0][2]], 
    [board[1][0], board[1][1], board[1][2]], 
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][2], board[1][2], board[2][2]], 
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
]



if (winningChances[0] === "X") {
    alert("Ganó Player1")
    cell.innerText = "";
};

