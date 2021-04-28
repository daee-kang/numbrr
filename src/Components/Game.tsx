import "./Game.css"
import React, { createRef, useEffect, useRef, useState } from 'react'
import GameLogic from '../GameLogic'
import { Timer } from "./Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {

}

export const Game = (props: Props) => {
  const game = useRef(new GameLogic());
  const [numbers, setNumbers] = useState(game.current.numbers);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);

  const [gameStart, setGameStart] = useState(false);

  const [npm, setNpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [time, setTime] = useState(60);

  const [isFocused, setFocused] = useState(false);
  const input = React.useRef<HTMLInputElement>(null);


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(event.key))) return;

    setGameStart(true)
    let num = parseInt(event.key);
    if (numbers[0] === num) {
      let nums = numbers;
      let used = usedNumbers;
      used.push(nums.shift() ?? 0);
      setNumbers(nums);
      setUsedNumbers(used);
      setCorrect(correct + 1);
      return;
    }
    setIncorrect(incorrect + 1);
  }

  useEffect(() => {

    //accuracy
    let a = game.current.getAccuracy(correct, incorrect);
    setAccuracy(a);

    //npm
    let n = game.current.getNpm(correct, time);
    setNpm(n);

  }, [time, correct, incorrect])

  return (
    <div>
      <div className={`number-box ${isFocused ? "number-box-focused" : null}`} onClick={() => input.current!.focus()}>
        <span className="done-numbers">
          {usedNumbers}
        </span>
        <input type="text" ref={input} onKeyDown={handleKeyPress} className="invisible"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <span className="type-numbers">
          {numbers}
        </span>
      </div>

      <div className={`meter-container ${isFocused ? "show" : "hide"}`}>
        {/* change key to restart timer */}
        <div className="timer">
          <CountdownCircleTimer
            size={100}
            strokeWidth={8}
            isPlaying={gameStart}
            duration={60}
            colors={[
              ['#40916c', 1.00],
            ]}>
            <Timer timeLeft={time} setTimeLeft={setTime} gameStart={gameStart} setGameStart={setGameStart} />
          </CountdownCircleTimer>
        </div>


        <div className="meter">
          <span className="box">
            <div className="center">
              {Math.trunc(npm)}
            </div>
            <span className="subtitle">
              numbers/min
            </span>
          </span>
        </div>

        <div className="meter">
          <span className="box">
            <div className="center">
              {Math.trunc(accuracy)}
            </div>
            <span className="subtitle">
              accuracy %
            </span>
          </span>
        </div>
      </div>


    </div>
  )
}
