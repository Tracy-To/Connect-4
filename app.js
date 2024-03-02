document.addEventListener('DOMContentLoaded', () => {
  // define player names
  const playerRed = "Player Red"
  const playerYellow = "Player Yellow"

  // decide who goes first randomly
  const players = ["Player 1", "Player 2"];
  const startingPlayer = players[Math.floor(Math.random() * players.length)];

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



