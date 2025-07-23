class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    const board = [];
    for (let row = 0; row < this.height; row++) {
      const rowArr = [];
      for (let col = 0; col < this.width; col++) {
        rowArr.push(0); //each cell is dead at start
      }
      board.push(rowArr);
    }
    return board;
  }

  getCell(row, col) {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) return 0;
    return this.board[row][col];
  }

  setCell(value, row, col) {
    if (row >= 0 && row < this.height && col >= 0 && col < this.width)
      this.board[row][col] = value;
  }

  toggleCell(row, col) {
    if (this.getCell(row, col) === 1) this.setCell(0, row, col);
    else this.setCell(1, row, col);
  }

  livingNeighbors(row, col) {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue; //skips own
        count += this.getCell(row + r, col + c); //counting the 1 s (live ones)
      }
    }
    return count;
  }

  tick() {
    const newBoard = this.makeBoard();
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const alive = this.getCell(row, col);
        const neighbors = this.livingNeighbors(row, col);

        if (alive) {
          //value true if exists
          if (neighbors === 2 || neighbors === 3) newBoard[row][col] = 1;
          else newBoard[row][col] = 0;
        } else {
          if (neighbors === 3) newBoard[row][col] = 1;
        }
      }
    }
    this.board = newBoard;
  }
}
