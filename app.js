document.addEventListener('DOMContentLoaded', () => {

  ///--- PLAYER INFO ---///

  // define player names
  const playerRed = "Player Red"
  const playerYellow = "Player Yellow"

  // decide who goes first randomly
  const players = ["Player Red", "Player Yellow"]
  let currentPlayer = players[Math.floor(Math.random() * players.length)]
  
  // show whose turn it is
  const playerTurnElement = document.getElementById('playerTurn')
  playerTurnElement.textContent = `${currentPlayer}'s Turn`

  // allow players to take take turns
  const switchPlayer = () => {

    if (currentPlayer === playerRed) {
      currentPlayer = playerYellow
    } else if (currentPlayer === playerYellow) {
      currentPlayer = playerRed
    }
    // update turn message on screen
    playerTurnElement.textContent = `${currentPlayer}'s Turn`

    // change color of the the turn message based on the current player
    if (currentPlayer === playerRed) {
      playerTurnElement.style.color = 'red'
    } else if (currentPlayer === playerYellow) {
      playerTurnElement.style.color = 'yellow'
    }
  }
  switchPlayer()



  ///--- GAME BOARD INFO ---///

  // prepare the board grid
  const boardElement = document.getElementById('board')
  const numRows = 6
  const numCols = 7

  // create the board grid using nested loops
  for (let row = numRows - 1; row >= 0; row--) {
    for (let col = 0; col < numCols; col++) {
      
      // create a div element for each tile in the board
      const tile = document.createElement('div')

      // add each tile to the board
      boardElement.appendChild(tile)

      // give each tile a row and column index/dataset
      tile.dataset.row = row
      tile.dataset.col = col

      // allow tiles to be styled in CSS
      tile.className = 'tile'

      // allow each tile to be clicked and then process it
      tile.addEventListener('click', () => {
      processTileClick(row, col)
      })
    }
  }

  // create an "empty" board players can drop their chips/coins in
  const createEmptyBoard = () => {

    // create an empty array as the board
    const board = []

    for (let row = 0; row < numRows; row++) {
      // create an empty array for each row
      const rowArray = []

      for (let col = 0; col < numCols; col++) {
        // fill each column in the row with a 'null' value 
        rowArray.push(null)
      }

      // push the row array into the board array 
      board.push(rowArray)  

    }
    return board
  }
  let board = createEmptyBoard()

  // allow the board to visually update itself after each turn
  const updateBoard = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)

        // update the tiles with the player colors (red or yellow)
        if (board[row][col] === playerRed) {
          tile.style.backgroundColor = 'red'
        } else if (board[row][col] === playerYellow) {
          tile.style.backgroundColor === 'yellow'
        }
      }
    }
  }



  ///--- PLAYER MOVE & GAME HANDLING ---///
  const processTileClick = (row, col) => {
    // check if the selected column is full
    if (board[0][col] !== null) {
      // if the column is full, do nothing
      return
    }

    // find the lowest available row in the selected column
    let lowestRow = 0
    while (lowestRow < numRows && board[lowestRow][col] != null) {
      lowestRow++
    }

    // updated the board based on the player's move
    board[lowestRow][col] = currentPlayer

    /// make updateBoard() function
    updateBoard()

    // check for a winner
    if (checkForWinner()) {
      playerTurnElement.textContent = `${currentPlayer} wins!`
      // show "Play Again" button
      document.getElementById('button').style.display = 'block'
    } else {
      document.getElementById('button').style.display = 'none'
    }

    // check for a tie
    if (checkForTie()) {
      playerTurnElement.textContent = "It's a Tie!"
      document.getElementById('button').style.display = 'block'
    } else {
      document.getElementById('button').style.display = 'none'
    }

  }


  
  ///--- WINNING PLAYER (AND TIE) INFO ---///

  // check for a tie
  const checkForTie = () => {
    for (let col = 0; col < numCols; col++) {
      if (board[0][col] === null) {
        return false
      }
    }
    return true
  }

  // check for a winner and how
  const checkForWinner = () => {
      if (checkForHorizontalWin() || checkForVerticalWin() || checkForDiagonalWin()) {
        return true
      }
    return false
  }

  // checks a tile and assigns it to a player
  const checkTile = (row, col) => {
    return board[row][col] === currentPlayer
  }

  // check for a horizontal win
  const checkForHorizontalWin = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols - 3; col++) {
        if (
            checkTile(row, col) &&
            checkTile(row, col + 1) &&
            checkTile(row, col + 2) &&
            checkTile(row, col + 3)
          ) 
          return true 
        }
      }
      return false
    }   
          
  // check for a vertical win
  const checkForVerticalWin = () => {
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows - 2; row++) {
        if (
            checkTile(row, col) &&
            checkTile(row, col + 1) &&
            checkTile(row, col + 2) &&
            checkTile(row, col + 3)
          )
          return true 
        }
      }
      return false
    }

  // check for a diagonal win
  const checkForDiagonalWin = () => {
    for (let row = 0; row < numRows - 2; row++) {
      for (let col = 0; col < numCols - 3; col++) {
        if (
            // Check diagonal from bottom-left to top-right
            checkTile(row, col) &&
            checkTile(row + 1, col + 1) &&
            checkTile(row + 2, col + 2) &&
            checkTile(row + 3, col + 3)
          ) 
          return true
        } 
            
        if (
            // Check diagonal from top-left to bottom-right
            checkTile(row, col) &&
            checkTile(row - 1, col + 1) &&
            checkTile(row - 2, col + 2) &&
            checkTile(row - 3, col + 3)
          ) 
          return true
        }
        return false
      }



  ///--- RESETTING THE GAME ---///
  const resetGame = () => {

  }


})