export default function getRandomAge(lowerBound = 10): number {
  return Math.floor(Math.random() * 60) + lowerBound;
}
