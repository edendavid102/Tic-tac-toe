import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const TicTacToe = () => {
  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    const newSocket = new WebSocket(`ws://localhost:8000/ws`);

    newSocket.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    newSocket.onmessage = (message) => {
      const gameData = JSON.parse(message.data);
      setBoard([...gameData.board]);
      setCurrentPlayer(gameData.currentPlayer);
      setWinner(gameData.winner);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleCellClick = (row, col) => {
    if (winner || board[row][col] !== null) return;

    const move = { row: row, col: col };
    socket.send(JSON.stringify(move));
  };

  return (
    <div>
      {winner && <p style={{ fontSize: "24px", fontWeight: "bold", color: "green", textAlign: "center" }}> Winner: {winner}</p>}
      <div className="board">
        <div className="flex-center">
          {board[0].map((value, index) => (
            <Cell
              value={value}
              key={`first-row-${index}`}
              onClick={() => handleCellClick(0, index)}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {board[1].map((value, index) => (
            <Cell
              value={value}
              key={`second-row-${index}`}
              onClick={() => handleCellClick(1, index)}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {board[2].map((value, index) => (
            <Cell
              value={value}
              key={`third-row-${index}`}
              onClick={() => handleCellClick(2, index)}
            />
          ))}
        </div>
      </div>
      <p style={{ fontSize: "24px", textAlign: "center"}}>Current Player: {currentPlayer}</p>
    </div>
  );
};

export default TicTacToe;
