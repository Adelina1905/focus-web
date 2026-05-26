import musicIcon from '../assets/ui/buttons/Music-removebg-preview.png';
import muteIcon from '../assets/ui/buttons/MusicMute-removebg-preview.png'
import { useRef, useState } from 'react';

export default function MusicBtn() {
  const audioRef = useRef(null);
  const [music, setMusic] = useState(false);
  const playMusic = async () => {
    if(!music){
    try {
      await audioRef.current.play();
      setMusic(true)
    } catch (err) {
      console.error(err);
    }}else{
    try {
      await audioRef.current.pause();
      setMusic(false)
    } catch (err) {
      console.error(err);
    }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={`${import.meta.env.BASE_URL}music/test.mp3`} type="audio/mpeg" />
      </audio>
      <button
        type="button"
        onClick={playMusic}
        className='w-30'>
        {music ? <img src={musicIcon} alt="music" />:<img src={muteIcon} alt="music" />}
      </button>
    </>
  );
}