
import './App.css';
import PlayBtn from './components/PlayBtn';
import PondScene from './components/background/PondScene';
import ResetBtn from './components/ResetBtn';
import Timer from './components/Timer';
import MusicBtn from './components/MusicBtn';
import TimeUp from './components/TimeUp';
import { useState, useEffect, useCallback, useRef } from 'react';
import Sessions from './components/Sessions';

import { loadFocusData, saveFocusData } from "./utils/storage";


function App() {
  let timer = 1500;  //variable for working session
  let breakTimer = 300; //variable for break session
  const [time, setTime] = useState(timer);
  const [mode, setMode] = useState("idle");
  const [lastSession, setLastSession] = useState(null);

  //local Storage
  const [appData, setAppData] = useState(() => loadFocusData());
  
  useEffect(() => {
    saveFocusData(appData);
  }, [appData]);


  const workingSession = appData.workingSession ?? 0;

  const sessionStartRef = useRef(null);
  const hasEndedRef = useRef(false);
  const display = {
    hours: Math.floor(workingSession / 3600),
    minutes: Math.floor((workingSession % 3600) / 60)
  }

  const handleSessionEnd = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    const elapsedSeconds = Math.floor(
      (Date.now() - sessionStartRef.current) / 1000
    );

    setAppData(prev => ({
      ...prev,
      workingSession: (prev.workingSession ?? 0) + elapsedSeconds
    }));
    setMode(prevMode => {
      if (prevMode === "idle") return prevMode;

      if (prevMode === "work") {
        setLastSession("work");
      } else if (prevMode === "break") {
        setLastSession("break");
      }

      return "idle";
    });
  }, []);
  const handlePlay = () => {
    if (mode === "paused") {
      setMode("work");
      return;
    }
    sessionStartRef.current = Date.now();

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
    sessionStartRef.current = Date.now();

    setMode("break")
    setTime(breakTimer);
  }

  // Reset the session end flag when mode changes
  useEffect(() => {
    hasEndedRef.current = false;
  }, [mode])

  // Countdown timer effect
  useEffect(() => {
    if (mode === "idle" || mode === "paused") return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000)

    return () => clearInterval(interval);

  }, [mode])

  // Handle session end when time reaches 0
  useEffect(() => {
    if (time === 0 && mode !== "idle" && mode !== "paused") {
      handleSessionEnd();
    }
  }, [time, mode, handleSessionEnd])
  return (
    <>
      <div className="relative">
        <PondScene mode={mode} />
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
