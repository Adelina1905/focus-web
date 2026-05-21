
import './App.css';
import PlayBtn from './components/PlayBtn';
import PondScene from './components/background/PondScene';
import ResetBtn from './components/ResetBtn';
import Timer from './components/Timer';
import MusicBtn from './components/MusicBtn';
import TimeUp from './components/TimeUp';
import { useState, useEffect } from 'react';
import Sessions from './components/Sessions';

function App() {
  let timer = 1500;  //variable for working session
  let breakTimer = 300; //variable for break session
  const [time, setTime] = useState(timer);
  const [mode, setMode] = useState("idle");
  const [lastSession, setLastSession] = useState(null);

  const [workingSession, setWorkingSession] = useState(80);
  const display = {
    hours : Math.floor(workingSession/3600),
    minutes: Math.floor((workingSession % 3600)/60) 
  }

  const handleSessionEnd = () => {
    if (mode === "work") {
      setLastSession("work");
      setWorkingSession(prev => prev + timer)
    } else if (mode === "break") {
      setLastSession("break");
      setWorkingSession(prev => prev + breakTimer)
    }
      setMode("idle");

  }
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
    setTime(breakTimer);
  }

  useEffect(() => {
    if (mode === "idle" || mode === "paused") return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          handleSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000)

    return () => clearInterval(interval);

  }, [mode])
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
        <div className="absolute top-0 right-0">
          <Sessions
            display={display} />
        </div>
        {mode === "idle" && time === 0 && (
          <div className="absolute inset-0 pt-8">
            <TimeUp
              mode={mode}
              lastSession={lastSession}
              handlePlay={handlePlay}
              handleBreak={handleBreak}
              handleReset={handleReset} />
          </div>
        )}
      </div>

    </>
  )
}

export default App
