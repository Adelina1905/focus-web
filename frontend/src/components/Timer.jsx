import board from "../assets/ui/board.png"
import image0 from "../assets/ui/numbers/0-removebg-preview.png"
import image1 from "../assets/ui/numbers/1-removebg-preview.png"
import image2 from "../assets/ui/numbers/2-removebg-preview.png"
import image3 from "../assets/ui/numbers/3-removebg-preview.png"
import image4 from "../assets/ui/numbers/4-removebg-preview.png"
import image5 from "../assets/ui/numbers/5-removebg-preview.png"
import image6 from "../assets/ui/numbers/6-removebg-preview.png"
import image7 from "../assets/ui/numbers/7-removebg-preview.png"
import image8 from "../assets/ui/numbers/8-removebg-preview.png"
import image9 from "../assets/ui/numbers/9-removebg-preview.png"
import two_dots from "../assets/ui/:.png"
const numbers = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9
];
numbers.forEach((src) => {
  const img = new Image();
  img.src = src;
});
export default function Timer({ time }) {

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const mdeci = Math.floor(minutes / 10)
  const muni = minutes % 10
  const sdeci = Math.floor(seconds / 10)
  const suni = seconds % 10
  return (
    <>
      <div className="relative">
        <img className="h-auto w-170 object-contain mx-auto" src={board} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-nowrap">
            <img src={numbers[mdeci]} className="w-15 object-contain" />
            <img src={numbers[muni]}  className="w-15 object-contain" />
          </div>
          <img src={two_dots} alt="double-dots"  className="w-15 object-contain" />
          <div className="flex flex-nowrap">
            {seconds < 10 ?
              (
                <>
                  <img src={numbers[0]}  className="w-15 object-contain" />
                  <img src={numbers[suni]}  className="w-15 object-contain" />
                </>
              )
              :
              (
                <>
                  <img src={numbers[sdeci]}  className="w-15 object-contain" />
                  <img src={numbers[suni]}  className="w-15 object-contain" />
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}