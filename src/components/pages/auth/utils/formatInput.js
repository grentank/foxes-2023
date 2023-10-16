export default function formatInput(rawString) {
  if (rawString === '(') return '';
  const phoneString = rawString.replace(/[^0-9]/g, '').slice(0, 10);
  const code = phoneString.slice(0, 3);
  const part1 = phoneString.slice(3, 6);
  const part2 = phoneString.slice(6, 8);
  const part3 = phoneString.slice(8, 10);
  if (phoneString.length <= 3) return `(${phoneString}`;
  if (phoneString.length <= 6) return `(${code}) ${part1}`;
  if (phoneString.length <= 8) return `(${code}) ${part1}-${part2}`;
  return `(${code}) ${part1}-${part2}-${part3}`;
}
