// Build boxes
let frame = document.querySelector(".frame");
for (let i = 0; i < 200; i++) {
  const div = document.createElement("div");
  div.className = "grid";
  div.textContent = i;
  frame.append(div);
}

let squares = Array.from(document.querySelectorAll(".grid"));
const score = document.querySelector("#score");
const width = 10;

// Drawing tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
]

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

// When we want to start drawing our tetrominoes on the squares
let currentPosition = 4
let current = tetrominoes[0][0]

// Draw the first rotation in the first tetromino
const draw = () => {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}

draw()