# Tic-tac-toe

Project Structure:
- **Backend**: Contains the FastAPI server code for handling WebSocket connections and game logic.
- **Front**: Contains the React client code for displaying the game board and handling user input.

Entities:
- **Game Board**: Represents the 3x3 grid for the Tic-tac-toe game.
- **Players**: Represent the two players participating in the game. Each player can be assigned a symbol: 'X' or 'O'.

Basic Flow:
1. The server starts and waits for WebSocket connections.
2. When a player connects to the server, the server adds the player to the list of connected players.
3. If there are two connected players, the server starts the game.
4. The server initializes the game board and sends a game start message to both players.
5. The server enters a loop where it waits for each player's move.
6. When a player makes a move, the server updates the game board with the player's symbol and broadcasts the move to both players.
7. After each move, the server checks for a win condition by examining the game board.
8. If a win condition is detected, the server sends a win message to both players and ends the game.
9. If no win condition is detected, the server switches the turn to the other player and waits for their move.
10. Steps 6-9 are repeated until a win condition is met or the game ends in a draw.
11. Once the game ends, the server closes the WebSocket connections for both players.

Win Condition Check:
After each move, the server checks for a win condition by examining the game board. It checks for the following winning combinations:
- Rows: Three cells with the same symbol in a horizontal row.
- Columns: Three cells with the same symbol in a vertical column.
- Diagonals: Three cells with the same symbol in a diagonal line.

The server iterates through these winning combinations and checks if all three cells have the same non-null symbol. If a winning combination is found, the server declares the player corresponding to the symbol as the winner.
