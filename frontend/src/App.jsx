
import './App.css';
import PlayBtn from './components/PlayBtn';
import PondScene from './components/background/PondScene';
import ResetBtn from './components/ResetBtn';
import Timer from './components/Timer';
import MusicBtn from './components/MusicBtn';
import TimeUp from './components/TimeUp';
import { useState, useEffect, useCallback, useRef } from 'react';
import Sessions from './components/Sessions';

import TaskBoard from "./components/task-board/TaskBoard";
import { loadFocusData, saveFocusData } from "./utils/storage";


function App() {
  let timer = 1500;  //variable for working session
  let breakTimer = 300; //variable for break session
  const [time, setTime] = useState(timer);
  const [mode, setMode] = useState("idle");
  const [lastSession, setLastSession] = useState(null);

  //local Storage
  const [appData, setAppData] = useState(() => loadFocusData());

  const endTimeRef = useRef(null);

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

    setMode(prevMode => {
      if (prevMode === "idle") return prevMode;

      if (prevMode === "work") {
        setLastSession("work");
        setAppData(prev => ({
          ...prev,
          workingSession: (prev.workingSession ?? 0) + elapsedSeconds
        }));
      } else if (prevMode === "break") {
        setLastSession("break");
        setAppData(prev => ({
          ...prev,
          workingSession: (prev.workingSession ?? 0) + elapsedSeconds
        }));
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

  // Task handlers
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      checked: false
    }
    setAppData(prev => ({
      ...prev,
      tasks: [...(prev.tasks || []), newTask]
    }))
  }

  const handleToggleTask = (id) => {
    setAppData(prev => ({
      ...prev,
      tasks: (prev.tasks || []).map(t =>
        t.id === id ? { ...t, checked: !t.checked } : t
      )
    }))
  }

  const handleEditTask = (id, text) => {
    setAppData(prev => ({
      ...prev,
      tasks: (prev.tasks || []).map(t =>
        t.id === id ? { ...t, text } : t
      )
    }))
  }

  const handleDeleteTask = (id) => {
    setAppData(prev => ({
      ...prev,
      tasks: (prev.tasks || []).filter(t => t.id !== id)
    }))
  }

  // Reset the session end flag when mode changes
  useEffect(() => {
    hasEndedRef.current = false;
  }, [mode])

  // Countdown timer effect
  useEffect(() => {
    endTimeRef.current = Date.now() + time * 1000;

    if (mode === "idle" || mode === "paused") return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        Math.ceil((endTimeRef.current - Date.now()) / 1000),
        0
      );

      setTime(remaining);

    if (remaining <= 0) {
      clearInterval(interval);
    }

    }, 250)

    return () => clearInterval(interval);

  }, [mode, time])

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
        <div className="absolute top-0 right-0 flex flex-col items-end gap-2">
          <Sessions
            display={display} />
          <TaskBoard
            tasks={appData.tasks || []}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
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
