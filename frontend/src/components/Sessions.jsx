import board2 from "../assets/ui/board.png"
// import dot from "../assets/ui/:.png"
import h from "../assets/ui/h.png"
import m from "../assets/ui/m.png"
import { numbers, preloadNumbers } from "../utils/preloadNumbers";
import { useEffect } from "react";
import { splitNumber } from "../utils/splitNumber";

export default function Sessions({ display }) {
  const { hdeci, huni, mdeci, muni } = splitNumber(display.hours, display.minutes);
  useEffect(() => {
    preloadNumbers();
  }, []);
  return (
    <>
      <div className="relative inline-block m-10">
        <img src={board2} className="block w-[280px] h-auto" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center leading-none">

          <div className="flex">
            <img src={numbers[hdeci]} className="w-[32px] h-[32px] object-contain block" />
            <img src={numbers[huni]} className="w-[32px] h-[32px] object-contain block" />
            <img src={h} alt="" className="w-[20px] object-contain" />
          </div>

          {display.minutes !== 0 && (
            <>
            

              <div className="flex">
                <img src={numbers[mdeci]} className="w-[32px] h-[32px] object-contain block" />
                <img src={numbers[muni]} className="w-[32px] h-[32px] object-contain block" />
                <img src={m} alt="" className="w-[20px] object-contain" />
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}