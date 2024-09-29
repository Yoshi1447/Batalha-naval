const boardSize = 10;
let board = [];
let ships = [];
let isBotMode = false;

document.getElementById('playVsBot').onclick = () => startGame(true);
document.getElementById('playMultiplayer').onclick = () => startGame(false);

function startGame(botMode) {
    isBotMode = botMode;
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    ships = placeShips();
    renderBoard();
    document.getElementById('gameArea').style.display = 'block';
}

function placeShips() {
    const shipSizes = [5, 4, 3, 3, 2, 2, 2, 1, 1, 1]; // 10 barcos
    const placedShips = [];
    shipSizes.forEach(size => {
        let placed = false;
        while (!placed) {
            const orientation = Math.random() < 0.5; // Horizontal ou vertical
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (canPlaceShip(row, col, size, orientation)) {
                placeShip(row, col, size, orientation);
                placedShips.push({ size, orientation, start: { row, col } });
                placed = true;
            }
        }
    });
    return placedShips;
}

function canPlaceShip(row, col, size, orientation) {
    for (let i = 0; i < size; i++) {
        const r = orientation ? row : row + i;
        const c = orientation ? col + i : col;
        if (r >= boardSize || c >= boardSize || board[r][c]) {
            return false;
        }
    }
    return true;
}

function placeShip(row, col, size, orientation) {
    for (let i = 0; i < size; i++) {
        const r = orientation ? row : row + i;
        const c = orientation ? col + i : col;
        board[r][c] = 'ship';
    }
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.onclick = () => handleCellClick(r, c);
            boardDiv.appendChild(cellDiv);
        });
    });
}

function handleCellClick(row, col) {
    if (board[row][col] === null) {
        board[row][col] = 'miss';
        document.querySelectorAll('.cell')[row * boardSize + col].classList.add('miss');
        checkGameState();
        if (isBotMode) botTurn();
    } else if (board[row][col] === 'ship') {
        board[row][col] = 'hit';
        document.querySelectorAll('.cell')[row * boardSize + col].classList.add('hit');
        explode(row, col);
        checkGameState();
    }
}

function explode(row, col) {
    const cell = document.querySelectorAll('.cell')[row * boardSize + col];
    cell.classList.add('explosion');
}

function botTurn() {
    // Lógica simples do bot: apenas escolha uma célula aleatória
    let row, col;
    do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
    } while (board[row][col] !== null);
    handleCellClick(row, col);
}

function checkGameState() {
    // Verifica se o jogo acabou
    const hits = board.flat().filter(cell => cell === 'hit').length;
    if (hits >= 17) { // 17 hits para afundar 10 barcos
        document.getElementById('message').innerText = 'Você ganhou!';
    }
}
