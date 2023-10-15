import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "./calculateWinner";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  // const [board, setBoard] = useState(Array.from(Array(9).keys()));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const huPlayer = "X";
  const aiPlayer = "O";

  const emptySquares = () => {
    return board.filter(s => typeof s == "number")
  }

  const handleClick = (i) => {
    const boardCopy = [...board]

    if (winner || boardCopy[i]) return
    // boardCopy[i] = xIsNext ? "X" : "O";
    boardCopy[i] = huPlayer;

    setBoard(boardCopy);
    setXisNext(!xIsNext);
    bestSpot(boardCopy, aiPlayer)
  }

  const renderMoves = () => (
    <button className="renderButton" onClick={() => setBoard(Array(9).keys())}>
      Start Game
    </button>
  )

  const bestSpot = (squares, player) => {
    let availSpots = emptySquares();

  // если при текущем расположении побеждает игрок
  if (winner(squares, huPlayer)) {
  	// отнимаем от результата 10 очков
  	return {score: -10};
  // если выиграет компьютер
  } else if (winner(squares, aiPlayer)) {
  	// прибавляем 10 очков
  	return {score: 10};
  // если ничья, то не менеяем очки
  } else if (availSpots.length === 0) {
  	return {score: 0};
  }

  // тут будем хранить все будущие ходы для их оценки
  let moves = [];
  // перебираем доступные клетки
  for (let i = 0; i < availSpots.length; i++) {
  	// переменная для следующего шага
  	let move = {};
  	// делаем шаг в очередную пустую клетку и получаем новое положение на доске
  	move.index = squares[availSpots[i]];
  	// заполняем эту клетку символом того, чей ход мы рассчитываем
  	squares[availSpots[i]] = player;

  	// если считаем ход для компьютера
  	if (player == aiPlayer) {
  		// рекурсивно вызываем минимаксную функцию для нового положения и указываем, что следующий ход делает человек
  		let result = bestSpot(squares, huPlayer);
  		move.score = result.score;
  	// то же самое, но если считаем ход человека
  	} else {
  		let result = bestSpot(squares, aiPlayer);
  		move.score = result.score;
  	}
  	// запоминаем результат
  	squares[availSpots[i]] = move.index;
  	// добавляем ход в список ходов
  	moves.push(move);
  }
  // переменная для лучшего хода
  let bestMove;
  // если считаем ход компьютера
  if(player === aiPlayer) {
  	// берём максимально низкое значение
  	var bestScore = -10000;
  	// перебираем все ходы, что у нас получились
  	for(let i = 0; i < moves.length; i++) {
  		// если очки текущего хода больше лучшего значения
  		if (moves[i].score > bestScore) {
  			// запоминаем это как лучшее значение
  			bestScore = moves[i].score;
  			// запоминаем номер хода
  			bestMove = i;
  		}
  	}
  // то же самое делаем с ходом, если моделируем ход человека
  } else {
  	let bestScore = 10000;
  	for(let i = 0; i < moves.length; i++) {
  		if (moves[i].score < bestScore) {
  			bestScore = moves[i].score;
  			bestMove = i;
  		}
  	}
  }
  // возвращаем лучший ход
  return moves[bestMove];
  }

  // bestSpot(squares)

  return (
    <div className="game">
      <div className="game-info">
        <p>
          {winner ? "Winner: " + winner : "Next player: " + (xIsNext ? huPlayer : aiPlayer)}
        </p>
        {renderMoves()}
      </div>
      <Board squares={board} onClick={handleClick} />
    </div>
  );
}

export default Game;