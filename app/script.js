const generateGamingBoard = (rows, columns) => {
  const gameTable = document.querySelector(".game-table");

  for (let row = 1; row <= rows; row++) {
    gameTable.innerHTML += `<div class="row table-row-${row}"></div>`;
    const rowTable = document.querySelector(`.table-row-${row}`);

    for (let column = 1; column <= columns; column++) {
      rowTable.innerHTML += `<div class="col row-${row}-col-${column}"></div>`;
      const colPart = document.querySelector(`.row-${row}-col-${column}`);

      for (let button = 0; button < 1; button++) {
        colPart.innerHTML += `<button id="${row} "value="${column}" class="token-button"></button>`;
      }
    }
  }
};

const generateBoardLogic = (rows, columns) => {
  let boardLogic = [];
  for (let row = 1; row <= rows; row++) {
    let rowLocation = [];
    for (let column = 1; column <= columns; column++) {
      let col = {};
      col.matched = false;
      col.player = "";
      col.rowLocation = row;
      col.colLocation = column;
      rowLocation.push(col);
    }
    boardLogic.push(rowLocation);
  }
  return boardLogic;
};

const placeTokenOnBoard = (row, column, currentBoard, playerOne, playerTwo) => {
  let columnToPlaceToken = findSelectedInColumn(currentBoard, column);

  for (let col = columnToPlaceToken.length - 1; col >= 0; col--) {
    if (columnToPlaceToken[col].matched === false) {
      columnToPlaceToken[col].matched = true;
      let tokenToPlace = document.querySelector(
        `.row-${columnToPlaceToken[col].rowLocation}-col-${columnToPlaceToken[col].colLocation}`
      );
      if (playerOne === true) {
        tokenToPlace.classList.add("red-player");
        playerOne = false;
        playerTwo = true;
        return;
      }
      if (playerTwo === true) {
        tokenToPlace.classList.add("yellow-player");
        playerTwo = false;
        playerOne = true;
        return;
      }
    }
  }
};

const findSelectedInColumn = (currentBoard, column) => {
  let selectedColumn = [];

  for (let row = 0; row < currentBoard.length; row++) {
    let rowArray = currentBoard[row];

    for (let col = 0; col < rowArray.length; col++) {
      let columnCoordinate = rowArray[col];

      if (columnCoordinate.colLocation === column) {
        selectedColumn.push(columnCoordinate);
      }
    }
  }
  return selectedColumn;
};

const registerEventListeners = (currentBoard) => {
  let tokens = document.querySelectorAll(".token-button");
  let playerOne = true;
  let playerTwo = false;

  tokens.forEach((token) => {
    token.addEventListener("click", () => {
      let row = parseInt(token.id);
      let column = parseInt(token.value);
      placeTokenOnBoard(row, column, currentBoard, playerOne, playerTwo);
      [playerOne, playerTwo] = [playerTwo, playerOne];
    });
  });
};

const startGame = () => {
  let rows = 6;
  let columns = 7;
  let currentBoard = generateBoardLogic(rows, columns);
  generateGamingBoard(rows, columns);
  registerEventListeners(currentBoard);
};

startGame();
