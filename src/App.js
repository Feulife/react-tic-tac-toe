import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay }) {
  cells = Array.from(Array(9).keys())

  function handleClick(i) {
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }

    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    // nextSquares[i] = 'O';
    onPlay(nextSquares);
  }

  function bestSpot(squares) {
    let availSpots = emptySquares();

	// если при текущем расположении побеждает игрок
  const winner = calculateWinner(squares);
	if (winner(newBoard, huPlayer)) {
		// отнимаем от результата 10 очков
		return {score: -10};
	// если выиграет компьютер
	} else if (winner(newBoard, aiPlayer)) {
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
		move.index = newBoard[availSpots[i]];
		// заполняем эту клетку символом того, чей ход мы рассчитываем
		newBoard[availSpots[i]] = player;

		// если считаем ход для компьютера
		if (player == aiPlayer) {
			// рекурсивно вызываем минимаксную функцию для нового положения и указываем, что следующий ход делает человек
			let result = minimax(newBoard, huPlayer);
			move.score = result.score;
		// то же самое, но если считаем ход человека
		} else {
			let result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
		// запоминаем результат
		newBoard[availSpots[i]] = move.index;
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

  bestSpot(squares)

  const winner = calculateWinner(squares);
  let status;
  if (winner) status = 'Winner: ' + winner;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// function Cells () {
//   return (
//     <>
//       <div className="board-row">
//         <Square value={0} />
//         <Square value={1} />
//         <Square value={2} />
//       </div>
//       <div className="board-row">
//         <Square value={3} />
//         <Square value={4} />
//         <Square value={5} />
//       </div>
//       <div className="board-row">
//         <Square value={6} />
//         <Square value={7} />
//         <Square value={8} />
//       </div>
//     </>
//   );
// }

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
        {/* <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> */}
      </div>
    </div>
  );
}
