import board from "../assets/ui/board.png"
import two_dots from "../assets/ui/:.png"
import { numbers, preloadNumbers } from "../utils/preloadNumbers";
import { useEffect } from "react";
import { splitNumber } from "../utils/splitNumber";
export default function Timer({ time }) {

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const {mdeci, muni, sdeci, suni} = splitNumber(0, minutes, seconds);

  useEffect(() => {
    preloadNumbers();
  }, []);
  return (
    <>
      <div className="relative">
        <img className="h-auto w-170 object-contain mx-auto" src={board} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-nowrap">
            <img src={numbers[mdeci]} className="w-15 object-contain" />
            <img src={numbers[muni]} className="w-15 object-contain" />
          </div>
          <img src={two_dots} alt="double-dots" className="w-15 object-contain" />
          <div className="flex flex-nowrap">
            {seconds < 10 ?
              (
                <>
                  <img src={numbers[0]} className="w-15 object-contain" />
                  <img src={numbers[suni]} className="w-15 object-contain" />
                </>
              )
              :
              (
                <>
                  <img src={numbers[sdeci]} className="w-15 object-contain" />
                  <img src={numbers[suni]} className="w-15 object-contain" />
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}