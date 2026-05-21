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
export const numbers = [
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
export function preloadNumbers() {
  numbers.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}