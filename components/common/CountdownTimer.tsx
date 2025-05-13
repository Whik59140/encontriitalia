'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onTimerEnd?: () => void;
}

function calculateTimeLeft(targetDate: Date) {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

export function CountdownTimer({ targetDate, onTimerEnd }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (+targetDate - +new Date() <= 0)) {
      if (onTimerEnd) onTimerEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onTimerEnd, timeLeft]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (+targetDate - +new Date() <= 0)) {
    return <span className="ml-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">Offerta Scaduta!</span>;
  }

  return (
    <span className="ml-1.5 whitespace-nowrap rounded bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white tabular-nums">
      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
    </span>
  );
} 