import { useEffect, useRef } from "react"
import breakBtn from '../assets/ui/buttons/Break.png'
import finishBtn from '../assets/ui/buttons/Finish.png'
import board from "../assets/ui/board.png"
export default function TimeUp({ handleBreak, handleReset }) {
  const alarmRef = useRef(null);

  useEffect(() => {
    if (alarmRef?.current) {
      alarmRef.current.play().catch((e) => {
        console.log("Autoplay blocked:", e);
      });
    }

    const originalTitle = document.title;
    document.title = "🔔 Let's Make a Break";

    return () => {
      document.title = originalTitle;
    }
  }, [])
  const stopAlarm = () => {
    const alarm = alarmRef.current;
    if (!alarm) return;
    alarm.pause();
    alarm.currentTime = 0;
  }
  const onBreak = () => {
    stopAlarm();
    handleBreak();
  }
  const onReset = () => {
    stopAlarm();
    handleReset();
  }
  return (
    <>
      <audio ref={alarmRef} loop>
        <source src="/music/frogSound.mp3" type="audio/mpeg" />
      </audio>
      <div className="relative flex justify-center">
        <img src={board} className="w-160" />
        
        <div className=" absolute inset-0 flex items-center justify-center gap-4" >
          <button className="w-50" onClick={onBreak}>
            <img src={breakBtn} alt="break button" />
          </button>

          <button className="w-50" onClick={onReset}>
            <img src={finishBtn} alt="break button" />
          </button>
        </div>
      </div>
    </>
  )
}