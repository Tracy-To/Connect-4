const playerRed = "Player Red"
const playerYellow = "Player Yellow"
const currentPlayer = "Current Player"


document.addEventListener('DOMContentLoaded', () => {
  // prepare the grid for the game board
  const boardGrid = document.getElementById('board')

  // define the number of rows and columns for the grid 
  const numRows = 6
  const numCols = 7

  // create the grid using nested loops
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      
      // create a div element for each tile in the grid 
      const tile = document.createElement('div')

      // add each tile to the grid 
      boardGrid.appendChild(tile)

      // allow tiles to be styled in CSS
      tile.className = 'tile'

    }
  }
})