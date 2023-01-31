export default function generateRandomInt(
  min: number,
  max: number,
  exclude?: number[],
): number {
  if (Array.isArray(exclude)) {
    let isRandom = false;
    let randomValue: number | null = null;
    while (!isRandom) {
      randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      if (exclude.indexOf(randomValue) === -1) isRandom = !isRandom;
    }
    return randomValue as number;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
