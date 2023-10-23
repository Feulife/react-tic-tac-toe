import React, { useEffect, useState } from "react"
import Board from "./Board"
import calculateWinner from "./calculateWinner"
import miniMax from "./MiniMax"
import emptySquares from "./EmptySpot"

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXisNext] = useState(true)
  const winner = calculateWinner(board)
  const huPlayer = "X"
  const aiPlayer = "O"

  useEffect(() => {
    if (!xIsNext) {
      const bestMove = findBestMove(board, aiPlayer)
      if (bestMove !== -1) handleClick(bestMove)
    }
  }, [xIsNext])

  const makeMove = (i) => {
    const boardCopy = [...board];    
    if (winner || boardCopy[i]) return
    boardCopy[i] = xIsNext ? huPlayer : aiPlayer;
    setBoard(boardCopy)
    setXisNext(!xIsNext)
  }

  const handleClick = (i) => {    
    makeMove(i)
  }

  const findBestMove = (spots, player) => {
    const opponent = player === huPlayer? aiPlayer : huPlayer
    return miniMax(spots, true, player, opponent).square
  }

  const newGame = () => {
    setBoard(Array(9).fill(null))
    setXisNext(true)
  }

  const renderMoves = () => (
    <button className="renderButton" onClick={() => { newGame() }}>
      Start Game
    </button>
  )

  const showStatus = () => {
    if (winner) {
        return `winner: ${winner}`
      } else if (emptySquares([...board])) {
        return "Tie!"
      } else {
        return `Next player: ${xIsNext ? huPlayer : aiPlayer}`
      }
  }

  return (
    <div className="game">
      <div className="game-info">
        <p>
          {showStatus()}
        </p>
        {renderMoves()}
      </div>
      <Board squares={board} onClick={handleClick} />

    </div>
  )
}

export default Game