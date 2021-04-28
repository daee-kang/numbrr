import React from 'react'
import GameLogic from '../GameLogic'
import './Score.css'

interface Props {
  correct: number
  incorrect: number
  gameLogic: React.MutableRefObject<GameLogic>
  resetGame: () => void
}

interface meterProps {
  value: number;
  caption: string
}

const Meter = ({ value, caption }: meterProps) => {
  return (
    <div className="meter-final">
      <div className="meter-val">
        {Math.trunc(value)}{caption === "accuracy" ? "%" : null}
      </div>
      <div className="meter-caption">
        {caption}
      </div>
    </div>
  )
}

export const Score = ({ correct, incorrect, gameLogic, resetGame }: Props) => {
  return (
    <div className="score-container">
      <div className="score-box">
        <button className="exit" onClick={resetGame}>
          ✖
        </button>
        <div style={{ flex: 2 }}>
          <div className="center big-emoji">
            {gameLogic.current.getEmoji(correct)}
          </div>
          <div style={{ width: "90%", margin: "auto" }}>
            {gameLogic.current.getDescription(correct)}
          </div>
        </div>


        <div className="results">
          <Meter value={gameLogic.current.getNpm(correct)} caption={"npm"} />
          |
          <Meter value={incorrect} caption={"missed"} />
          |
          <Meter value={gameLogic.current.getAccuracy(correct, incorrect)} caption={"accuracy"} />
        </div>
      </div>
    </div>
  )
}
