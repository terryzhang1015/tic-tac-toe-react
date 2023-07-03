import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ player, map, onPlay }) {
  const winner = checkWin();
  let status = winner ? "Winner: " + winner : "Player Now: " + (player ? "X" : "O");

  function handleClick(i, j) {
    if (winner || map[i][j]) return;
    const newMap = [map[0].slice(), map[1].slice(), map[2].slice()];
    newMap[i][j] = player ? "X" : "O";
    onPlay(newMap);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={map[0][0]} onSquareClick={() => handleClick(0, 0)} />
        <Square value={map[0][1]} onSquareClick={() => handleClick(0, 1)} />
        <Square value={map[0][2]} onSquareClick={() => handleClick(0, 2)} />
      </div>
      <div className="board-row">
        <Square value={map[1][0]} onSquareClick={() => handleClick(1, 0)} />
        <Square value={map[1][1]} onSquareClick={() => handleClick(1, 1)} />
        <Square value={map[1][2]} onSquareClick={() => handleClick(1, 2)} />
      </div>
      <div className="board-row">
        <Square value={map[2][0]} onSquareClick={() => handleClick(2, 0)} />
        <Square value={map[2][1]} onSquareClick={() => handleClick(2, 1)} />
        <Square value={map[2][2]} onSquareClick={() => handleClick(2, 2)} />
      </div>
    </div>
  );

  function checkWin() {
    for (let i = 0; i < 3; ++i) {
      if (map[i][0] && map[i][0] === map[i][1] && map[i][1] === map[i][2])
        return map[i][0];
      if (map[0][i] && map[0][i] === map[1][i] && map[1][i] === map[2][i])
        return map[0][i];
    }
    return null;
  }
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(3).fill(Array(3).fill(null))]);
  const player = !(currentMove & 1);
  const currentMap = history[currentMove];
  const moves = history.map((map, move) => {
    let description = move > 0 ? "Go to move " + move : "Go to start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function handlePlay(newMap) {
    let newHistory = [...history.slice(0, currentMove+1), newMap];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board player={player} map={currentMap} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}