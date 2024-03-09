document.addEventListener('DOMContentLoaded', () => {

  ///--- PLAYER INFO ---///

  // define player names
  const playerRed = "Player Red"
  const playerYellow = "Player Yellow"

  // choose who goes first randomly
  const players = ["Player Red", "Player Yellow"]
  let currentPlayer = players[Math.floor(Math.random() * players.length)]
  
  // display whose turn it is for the first turn --> used later in a repeating function
  const playerTurnElement = document.getElementById('playerTurn')
  playerTurnElement.textContent = `${currentPlayer}'s Turn`

  // change color of the the turn message based on the current player
  const updatePlayerColor = () => {
    if (currentPlayer === playerRed) {
      playerTurnElement.style.color = 'red'
      // console.log('red')
    } else if (currentPlayer === playerYellow) {
      playerTurnElement.style.color = 'yellow'
      // console.log('yellow')
    }
  }

  // change the color for the first turn --> used later in a repeating function
  updatePlayerColor()



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

      // allow tiles to be styled in CSS
      tile.className = 'tile'

      // give each tile a row and column index/dataset
      tile.dataset.row = row
      tile.dataset.col = col

      // allow each tile to be clicked and then process it
      tile.addEventListener('click', () => processTileClick(row, col)) // to be used in line 123

    }
  }

  // prepare an "empty" board players can drop their coins in
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
    // create empty board
    let board = createEmptyBoard()



  ///--- PLAYER MOVE & GAME HANDLING ---///

  // allow the board to visually update itself after each turn
  const updateBoard = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const tile = document.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`) // based on line 54 and 55

        // update the tiles with the player colors (red or yellow)
        if (board[row][col] === playerRed) { // to be figured out line 137
          tile.style.backgroundColor = 'red'
        } else if (board[row][col] === playerYellow) {
          tile.style.backgroundColor = 'yellow'
        }
      }
    }
  }

  // allow players to take take turns
  const switchPlayer = () => {

  if (currentPlayer === playerRed) {
      currentPlayer = playerYellow
    } else if (currentPlayer === playerYellow) {
      currentPlayer = playerRed
    }
    // update turn message on screen
    playerTurnElement.textContent = `${currentPlayer}'s Turn`
  
    // change the color of the turn message
    updatePlayerColor()
  
  }

  const processTileClick = (row, col) => { // added event listener in line 58

    console.log(`Row: ${row}, Col: ${col}`)
      
    // the bottom row is 0 and the top row is 5
    let lowestRow = 0
    // find the lowest available row in the selected column
    while (lowestRow < 5 && board[lowestRow][col] != null) {
      lowestRow++
    }
      
    // check if there is a tile space(s) available in the column
    if (lowestRow <= 5) {
    // updated the board based on the player's move
      board[lowestRow][col] = currentPlayer // tile will change color in line 110
      } else {
        // do nothing
        return
      }
      
    // add the player's move to the board
    updateBoard()
      
    // check for a winner
    if (checkForWinner()) {
      playerTurnElement.textContent = `${currentPlayer} Wins!`
      // show "Play Again" button
      document.getElementById('button').style.display = 'block'
    } else if (checkForTie()) {
      playerTurnElement.textContent = "It's a Tie!"
      playerTurnElement.style.color = 'orange'
      console.log('orange')
      // show "Play Again" button
      document.getElementById('button').style.display = 'block'
    } else {
      switchPlayer()
    }

  }



  ///--- WINNING PLAYER (AND TIE) INFO ---///

  // check for a winner and how
  const checkForWinner = () => {
      if (checkForHorizontalWin() || checkForVerticalWin() || checkForDiagonalWinBLTR() || checkForDiagonalWinTLBR()) {
        return true
      }
    return false
  }

  // check for a horizontal win
  const checkForHorizontalWin = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols - 3; col++) {
        if (
            board[row][col] === currentPlayer &&
            board[row][col + 1] === currentPlayer &&
            board[row][col + 2] === currentPlayer &&
            board[row][col + 3] === currentPlayer
          ) 
          return true 
        }
      }
      return false
    }   
          
  // check for a vertical win
  const checkForVerticalWin = () => {
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows - 3; row++) {
        if (
            board[row][col] === currentPlayer &&
            board[row + 1][col] === currentPlayer &&
            board[row + 2][col] === currentPlayer &&
            board[row + 3][col] === currentPlayer
          )
          return true 
        }
      }
      return false
    }

  // check for a diagonal win from bottom-left to top-right
  const checkForDiagonalWinBLTR = () => {
    for (let row = 0; row < numRows - 3; row++) {
      for (let col = 0; col < numCols - 3; col++) {
        if (
            board[row][col] === currentPlayer &&
            board[row + 1][col + 1] === currentPlayer &&
            board[row + 2][col + 2] === currentPlayer &&
            board[row + 3][col + 3] === currentPlayer
          ) 
          return true
        }
      }
      return false
    }
    
  // check for a diagonal win from top-left to bottom-right
  const checkForDiagonalWinTLBR = () => {
    for (let row = 3; row < numRows; row++) {
      for (let col = 0; col < numCols - 3; col++) {
        if (
            board[row][col] === currentPlayer &&
            board[row - 1][col + 1] === currentPlayer &&
            board[row - 2][col + 2] === currentPlayer &&
            board[row - 3][col + 3] === currentPlayer
          ) 
          return true
        }
      }
      return false
    }
    
  // check for a tie
  const checkForTie = () => {
    // go through all the rows and columns
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // if any tiles are empty, then it's not a tie
        if (board[row][col] === null) {
          return false
        }
      }
    }
    return true
  }

  

  ///--- RESETTING THE GAME ---///

  // enable the button to be clicked to restart the game (only appears after a player wins or there is a tie)
  const button = document.getElementById('button')
  button.addEventListener('click', () => resetGame())

  const resetGame = () => {

    // hide the "Play Again" button again
    document.getElementById('button').style.display = 'none'

    // clear the board (make all tiles white)
    const allTiles = document.querySelectorAll('.tile')
      for (const tile of allTiles) {
        tile.style.background = 'white'
      }

    // decide who goes first randomly (again)
    currentPlayer = players[Math.floor(Math.random() * players.length)]

    // create a new board where each tile has a null value
    board = createEmptyBoard()

    // enable players to switch turns again
    switchPlayer()

    // processTileClick() still active

  }

  

})


