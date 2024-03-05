document.addEventListener('DOMContentLoaded', () => {

  // define player names
  const playerRed = "Player Red"
  const playerYellow = "Player Yellow"

  // show which player's turn it is
  const playerTurnElement = document.getElementById('playerTurn')
  playerTurnElement.textContent = "add some logic"

  // decide who goes first randomly
  const players = ["Player 1", "Player 2"];
  const startingPlayer = players[Math.floor(Math.random() * players.length)];

  // prepare the board grid
  const boardElement = document.getElementById('board')
  const numRows = 6
  const numCols = 7

  // create the board grid using nested loops
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      
      // create a div element for each tile in the board
      const tile = document.createElement('div')

      // add each tile to the board
      boardElement.appendChild(tile)

      // allow tiles to be styled in CSS
      tile.className = 'tile'
    }
  }
  
  const checkForWinner = () => {
    // check for a horizontal winner
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols - 3; col++) {
            if (
                checkTile(row, col) &&
                checkTile(row, col + 1) &&
                checkTile(row, col + 2) &&
                checkTile(row, col + 3)
            ) 
              return true }
          }
    
    // check for a vertical winner
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows - 3; row++) {
            if (
                checkTile(row, col) &&
                checkTile(row, col + 1) &&
                checkTile(row, col + 2) &&
                checkTile(row, col + 3)
            )
              return true }
          }
    
    // check for a diagonal winner (from bottom-left to top-right)
    for (let row = 0; row < numRows - 3; row++) {
        for (let col = 0; col < numCols - 3; col++) {
            if (
                checkTile(row, col) &&
                checkTile(row + 1, col + 1) &&
                checkTile(row + 2, col + 2) &&
                checkTile(row + 3, col + 3)
            )
              return true }
        }

    // check for a diagonal winner (from top-left to bottom-right)
    for (let row = 0; row < numRows - 3; row++) {
        for (let col = 0; col < numCols - 3; col++) {
          if (
              checkTile(row, col) &&
              checkTile(row - 1, col + 1) &&
              checkTile(row - 2, col + 2) &&
              checkTile(row - 3, col + 3)
          )
            return true }
        }
          return false
    }



})