import calculateWinner from "./calculateWinner"
import emptySquares from "./EmptySpot"

  const MiniMax = (spots, isMax, player, opponent) => {
    const winner = calculateWinner(spots)

    if (winner === player) return { square: -1, score: 1 }

    if (winner === opponent) return { square: -1, score: -1 }

    if (emptySquares(spots)) return { square: -1, score: 0 }

    const best = { square: -1, score: isMax ? -1000 : 1000 }

    for (let i = 0; i < spots.length; i++) {
      if (spots[i]) {
        continue
      }

      spots[i] = isMax ? player : opponent
      const score = MiniMax(spots, !isMax, player, opponent).score
      spots[i] = null

      if (isMax) {
        if (score > best.score) {
          best.score = score
          best.square = i
        }
      } else {
        if (score < best.score) {
          best.score = score
          best.square = i
        }
      }
    }
    return best
  }

  export default MiniMax