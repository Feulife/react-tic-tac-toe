import React from "react";

const calculateWinner = (squares, player) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const plays = squares.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);

  let gameWinner = null;

  for (let [index, win] of lines.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWinner = {index: index, player: player};
      break;
    }
  }

  return gameWinner;

  // for (let i = 0; i < lines.length; i++) {
  //   const [a, b, c] = lines[i];
  //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //     return squares[a];
  //   }
  // }
  // return null;
}

export default calculateWinner;