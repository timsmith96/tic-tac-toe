// GLBOAL VARIBALES
const gridCells = document.querySelectorAll('.grid-cell');
const restartBtn = document.querySelector('.restart');
const display = document.querySelector('.display');
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// GAMEBOARD
const Gameboard = function (board) {
  this.board = board;
};

Gameboard.prototype.displayBoard = function (cell, currentMover) {
  let img = document.createElement('img');
  img.src = currentMover.visualMarker;
  gridCells[cell].appendChild(img);
};

Gameboard.prototype.updateBoard = function (index, currentMover) {
  if (this.board[index] === '') {
    this.board[index] = currentMover.cpuMarker;
  }
};

Gameboard.prototype.resetBoard = function () {
  this.board = ['', '', '', '', '', '', '', '', ''];
  game.currentMover = playerOne;
  game.isValidMove = true;
  gridCells.forEach((cell) => (cell.innerHTML = ''));
  display.textContent = 'Beansy baby to move';
  game.gameOver = false;
};

// GAME FLOW
const Gameflow = function (currentMover, isValidMove, gameOver, winner) {
  this.currentMover = currentMover;
  this.isValidMove = this.isValidMove;
  this.gameOver = this.gameOver;
  this.winner = winner;
};

Gameflow.prototype.updateDisplay = function () {
  if (this.gameOver) {
    display.textContent = `Game over. ${
      gameboard.board.filter((x) => x === '').length === 0
        ? "It's a draw"
        : this.winner.name + ' won!'
    }`;
  } else {
    display.textContent = `${this.currentMover.name} to move`;
  }
};

Gameflow.prototype.updateMover = function () {
  this.currentMover =
    this.currentMover.name === playerOne.name ? playerTwo : playerOne;
};

Gameflow.prototype.validateMove = function (cellNo) {
  if (gameboard.board[cellNo] !== '' || game.gameOver) {
    this.isValidMove = false;
    return;
  }
  this.isValidMove = true;
};

Gameflow.prototype.checkGameOver = function () {
  if (gameboard.board.filter((x) => x === '').length === 0) {
    this.gameOver = true;
  }
  let arr = winningCombos.map((x) => {
    return [
      gameboard.board[x[0]],
      gameboard.board[x[1]],
      gameboard.board[x[2]],
    ];
  });
  let arrLength = arr.filter(
    (x) => x[0] === 'X' && x[1] === 'X' && x[2] === 'X'
  ).length;
  if (arrLength > 0) {
    this.gameOver = true;
    this.winner =
      playerOne;
  }
  arrLength = arr.filter(
    (x) => x[0] === 'O' && x[1] === 'O' && x[2] === 'O'
  ).length;
  if (arrLength > 0) {
    this.gameOver = true;
    this.winner = playerTwo;
  }
};

// PLAYERS
const Player = function (name, visualMarker, cpuMarker) {
  this.name = name;
  this.visualMarker = visualMarker;
  this.cpuMarker = cpuMarker;
};

Player.prototype.makeMove = function (cellNo, currentMover) {
  game.validateMove(cellNo);
  if (game.isValidMove) {
    gameboard.updateBoard(cellNo, currentMover);
    game.checkGameOver();
    gameboard.displayBoard(cellNo, currentMover);
    game.updateMover();
    game.updateDisplay();
  }
};

Player.prototype.validateMove = function (cellNo) {
  if (gameboard.board[cellNo] !== '') {
  }
};

// CREATING GAME ELEMENTS
const gameboard = new Gameboard(['', '', '', '', '', '', '', '', '']);
const playerOne = new Player('Beansy baby', './beansy-baby.png', 'X');
const playerTwo = new Player('Dooood', './dood.png', 'O');
const game = new Gameflow(playerOne, true, false);

// EVENT LISTENERS
gridCells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    let cellNo = e.target.dataset.cell;
    let currentMover = game.currentMover;
    currentMover.makeMove(cellNo, currentMover);
  });
});

restartBtn.addEventListener('click', (e) => {
  gameboard.resetBoard();
});
