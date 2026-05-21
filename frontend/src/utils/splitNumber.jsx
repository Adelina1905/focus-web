export function splitNumber(hours, minutes, seconds){
  const hdeci = Math.floor(hours / 10);
  const huni = hours % 10;

  const mdeci = Math.floor(minutes / 10)
  const muni = minutes % 10
  
  const sdeci = Math.floor(seconds / 10)
  const suni = seconds % 10

  return {hdeci, huni, mdeci, muni, sdeci, suni}
}