
import './App.css';
import PlayBtn from './components/PlayBtn';
import PondScene from './components/background/PondScene';
import ResetBtn from './components/ResetBtn';
import Timer from './components/Timer';
import MusicBtn from './components/MusicBtn';
import TimeUp from './components/TimeUp';
import { useState, useEffect } from 'react';

function App() {
  let timer = 1500;
  const [time, setTime] = useState(timer);
  const [mode, setMode] = useState("idle")
  useEffect(() => {
    if (mode === "idle" || mode === "paused") return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) {
          clearInterval(interval);

          if (mode === "work") {
            setMode("idle");
          } else if (mode === "break") {
            setMode("idle");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000)

    return () => clearInterval(interval);

  }, [mode])

  const handlePlay = () => {
    if (mode === "paused") {
      setMode("work");
      return;
    }

    setMode("work");
    setTime(timer);
  }
  const handlePause = () => {
    setMode("paused")
  }
  const handleReset = () => {
    setTime(timer);
    setMode("idle")
  }
  const handleBreak = () => {
    setMode("break")
    setTime(300);
  }
  return (
    <>
      <div className="relative">
        <PondScene />
        <div className="absolute top-0 m-10 z-100 ">
          <MusicBtn />
        </div>
        <div className="absolute inset-0 content-end pb-10">

          <Timer
            time={time} />
          <div className="flex items-center justify-center gap-5">
            <PlayBtn
              mode={mode}
              handlePause={handlePause}
              handlePlay={handlePlay} />
            <ResetBtn onReset={handleReset} />
          </div>
        </div>

        {mode === "idle" && time === 0 && (
          <div className="absolute inset-0 pt-8">
            <TimeUp
              handleBreak={handleBreak}
              handleReset={handleReset} />
          </div>
        )}
      </div>

    </>
  )
}

export default App
