import React, { useEffect, useState } from 'react';
import { TimerSettings, useTimer } from 'react-timer-hook';

interface Props {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  gameStart: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties
}

export const Timer = ({ timeLeft, setTimeLeft, gameStart, setGameOver, style }: Props) => {

  useEffect(() => {
    //https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
    if (!gameStart) return;

    // exit early when we reach 0
    if (!timeLeft) {
      setGameOver(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, gameStart]);

  return (
    <span style={style}>{timeLeft}</span>
  );
};
