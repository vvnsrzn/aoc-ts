export function computeAverage(numbers: number[]) {
  return computeSum(numbers) / numbers.length;
}

export function computeSum(numbers: number[]) {
  return numbers.reduce((prev, curr) => prev + curr, 0);
}

export function computeMedian(numbers: number[]) {
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const length = sortedNumbers.length;
  const middleLength = length / 2;
  if (length % 2 === 1) {
    return sortedNumbers[Math.floor(middleLength)];
  }
  const middle1 = sortedNumbers[middleLength - 1];
  const middle2 = sortedNumbers[middleLength];
  return (middle1 + middle2) / 2;
}
