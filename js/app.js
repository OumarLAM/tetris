
/*
To do  
- Build 200 boxes
- Create tetrominoes
- Draw tetrominoes
- Randomly select a tetromino and its first rotation
- Move down the tetromino
- When reached the bottom or crosses another block, block it and make another fall
*/

// Build boxes
let frame = document.querySelector(".frame")
for (let i = 0; i < 209; i++) {
  const div = document.createElement("div")
  if (i < 200) {
    div.className = "grid"
    div.textContent = i
  } else {
    div.className = "taken"
  }
  frame.append(div);
}

let squares = Array.from(document.querySelectorAll(".grid"))
const score = document.querySelector("#score")
const width = 10

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
let currentRotation = 0

// Select a tetromino and its first rotation randomly
let randomTetro = Math.floor(Math.random() * tetrominoes.length)
let currentTetro = tetrominoes[randomTetro][currentRotation]

// Draw the tetromino
const draw = () => {
  currentTetro.forEach(index => {
    const nextIndex = currentPosition + index;
    if (nextIndex >= 0 && nextIndex < squares.length) {
      squares[currentPosition + index].classList.add('tetromino')
    }
  })
}

draw()  // For displaying the tetromino the first time in the first line

// Undraw the tetromino
const undraw = () => {
  currentTetro.forEach(index => {
    const nextIndex = currentPosition + index;
    if (nextIndex >= 0 && nextIndex < squares.length) {
      squares[currentPosition + index].classList.remove('tetromino')
    }
  })
}

// freeze function
const freeze = () => {
  if (currentTetro.some(index => {
    const nextIndex = currentPosition + index + width
    // The tetromino has reached the bottom or there is another block (collision)
    return nextIndex >= squares.length || (nextIndex >= 0 && squares[nextIndex].classList.contains("taken"))
  })) {
    currentTetro.forEach(index => {
      const nextIndex = currentPosition + index
      if (nextIndex >= 0 && nextIndex < squares.length) {
        squares[nextIndex].classList.add("taken")
      }
    });

    // Start a new tetromino falling
    randomTetro = Math.floor(Math.random() * tetrominoes.length)
    currentTetro = tetrominoes[randomTetro][currentRotation]
    currentPosition = 4
    draw()
  }
}

// Move the tetromino left, unless it's at the edge or there is a blockage
const moveLeft = () => {
  undraw()
  const isAtLeftEdge = currentTetro.some(index => (currentPosition + index) % width === 0)
  if (!isAtLeftEdge) currentPosition -= 1

  if (currentTetro.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1
  }
  draw()
}

// Move the tetromino left, unless it's at the edge or there is a blockage
const moveRight = () => {
  undraw()
  const isAtRightEdge = currentTetro.some(index => (currentPosition + index) % width === width - 1)
  if (!isAtRightEdge) currentPosition += 1

  if (currentTetro.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1
  }
  draw()
}

// Movedown the tetromino every 1 second
const moveDown = () => {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

timerId = setInterval(moveDown, 300)

const keyControl = (element) => {
  if (element.keyCode === 37) { // Left Arrow
    moveLeft()
  } else if (element.keyCode === 39) {  // Right Arrow
    moveRight()
  }
}
document.addEventListener("keydown", keyControl)