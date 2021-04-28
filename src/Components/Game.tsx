import "./Game.css";
import React, { useEffect, useRef, useState } from 'react';
import GameLogic from '../GameLogic';
import { Timer } from "./Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Score } from "./Score";

export const Game = () => {
  const game = useRef(new GameLogic());

  const [numbers, setNumbers] = useState(game.current.generateNumbers());
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);

  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [npm, setNpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [time, setTime] = useState(60);

  const [isFocused, setFocused] = useState(false);
  const input = React.useRef<HTMLInputElement>(null);

  //we need a different key to "restart" the timer
  const [timerKey, setTimerKey] = useState(`key${0}`);


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let num = parseInt(event.key);

    if (isNaN(num)) return;
    if (gameOver) return;

    if (!gameStart) setGameStart(true);

    if (numbers[0] === num) {
      let nums = numbers;
      let used = usedNumbers;

      used.push(nums.shift() ?? 0);
      setNumbers(nums);
      setUsedNumbers(used);
      setCorrect(correct + 1);

      return;
    }
    //incorrect
    setIncorrect(incorrect + 1);
  };

  useEffect(() => {
    //accuracy
    let a = game.current.getAccuracy(correct, incorrect);
    setAccuracy(a);

    //npm
    let n = game.current.getNpm(correct, time);
    setNpm(n);
  }, [time, correct, incorrect]);

  useEffect(() => {
    if (!gameOver) return;

    setGameStart(false);
    console.log("done")
  }, [gameOver])

  const resetGame = () => {
    setGameOver(false);
    setGameStart(false);
    setNpm(0);
    setAccuracy(0);
    setCorrect(0);
    setIncorrect(0);
    setTime(60);
    setUsedNumbers([]);
    setTimerKey(`key${Math.random() * 100000}`)
    setNumbers(game.current.generateNumbers());
  }

  return (
    <div className="game">
      {gameOver &&
        <Score
          correct={correct}
          incorrect={incorrect}
          gameLogic={game}
          resetGame={resetGame}
        />
      }

      <div
        className={`number-box 
          ${isFocused ? "number-box-focused" : null}
          ${gameOver ? "blur" : null}
          `}
        onClick={() => input.current!.focus()}
      >
        <span className="done-numbers">
          {usedNumbers}
        </span>

        <input type="text"
          ref={input}
          onKeyDown={handleKeyPress}
          className="invisible"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <span className="type-numbers">
          {numbers}
        </span>
      </div>

      <div className={`meter-container ${isFocused ? "show" : "hide"}`}>
        <div className="timer">
          <CountdownCircleTimer
            key={timerKey}
            size={100}
            strokeWidth={8}
            isPlaying={gameStart}
            duration={60}
            colors={[
              ['#40916c', 0.8],
              ['#ffd166', 0.1],
              ['#d62828', 0.1]
            ]}>
            <Timer
              timeLeft={time}
              setTimeLeft={setTime}
              gameStart={gameStart}
              setGameOver={setGameOver}
              style={{ fontSize: "2rem", color: "#2b2d42" }}
            />
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
              {incorrect}
            </div>
            <span className="subtitle">
              missed
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


    </div >
  );
};
