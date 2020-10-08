import { useState, useEffect, useCallback } from 'react';

class Timer {
  remaining: number;
  start: Date;
  timerId: number;

  constructor(public callback: () => void, public delay: number) {
    this.remaining = delay;
    this.timerId = -1;
    this.start = new Date();

    this.resume();
  }

  pause = () => {
    clearTimeout(this.timerId);
    this.remaining -= new Date().getTime() - this.start.getTime();
  };

  resume = () => {
    this.start = new Date();
    clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };

  clear = () => clearTimeout(this.timerId);
}

let timer: Timer;

const useCountdown = (): {
  count: number | undefined;
  isRunning: boolean;
  done: boolean;
  start: (duration: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
} => {
  const [count, setCount] = useState<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (count !== undefined) {
      if (count > 0) {
        timer = new Timer(() => setCount(count - 1), 1000);
      } else {
        setIsRunning(false);
        setDone(true);
      }
    }

    return () => timer && timer.clear();
  }, [count]);

  const start = (duration: number) => {
    setDone(false);
    setIsRunning(true);
    setCount(duration);
  };

  const stop = () => timer && timer.clear();

  const pause = useCallback(() => {
    setIsRunning(false);
    timer.pause();
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
    timer.resume();
  }, []);

  return {
    count,
    isRunning,
    done,
    start,
    stop,
    pause,
    resume,
  };
};

export default useCountdown;
