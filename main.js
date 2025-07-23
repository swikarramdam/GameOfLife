const width = 30;
const height = 25; // width and height dimensions of the board

let interValid = null;
/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  for (let i = 0; i < tds.length; i++) {
    const td = tds[i];
    const row = Number(td.dataset.row);
    const col = Number(td.dataset.col);
    const alive = gol.getCell(row, col);

    if (alive) td.classList.add("alive");
    else td.classList.remove("alive");
  }
};

/**
 * Event Listeners
 */

// document.getElementById("board").addEventListener("click", (event) => {
//   // TODO: Toggle clicked cell (event.target) and paint
//   const td = event.target;
//   row = Number(td.dataset.row);
//   col = Number(td.dataset.col);

//   if (row >= 0 && col >= 0) {
//     gol.toggleCell(row, col);
//     paint();
//   }
// });

document.getElementById("step_btn").addEventListener("click", (event) => {
  gol.tick();
  paint();
});

document.getElementById("play_btn").addEventListener("click", (event) => {
  const playBtn = document.getElementById("play_btn");
  if (interValid === null) {
    interValid = setInterval(() => {
      gol.tick();
      paint();
    }, 200);
    playBtn.textContent = "Pause";
  } else {
    clearInterval(interValid);
    interValid = null;
    playBtn.textContent = "Play";
  }
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  for (let row = 0; row < gol.height; row++) {
    for (let col = 0; col < gol.width; col++) {
      gol.board[row][col] = Math.random() < 0.3 ? 1 : 0;
    }
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      gol.board[row][col] = 0;
    }
  }
  paint();
});

let isDrawing = false;
let drawMode = null;

const board = document.getElementById("board");

board.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "TD") {
    isDrawing = true;
    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);
    drawMode = gol.getCell(r, c) ? 0 : 1;
    gol.setCell(drawMode, r, c);
    paint();
  }
});

board.addEventListener("mouseup", () => {
  isDrawing = false;
  drawMode = null;
});

board.addEventListener("mousemove", (e) => {
  if (isDrawing && e.target.tagName === "TD") {
    const r = Number(e.target.dataset.row);
    const c = Number(e.target.dataset.col);
    if (gol.getCell(r, c) !== drawMode) {
      gol.setCell(drawMode, r, c);
      paint();
    }
  }
});
