/**
 * @function computeAverage
 * @param numbers 
 * @returns The average of the numbers
 */
export function computeAverage(numbers: number[]) {
  return computeSum(numbers) / numbers.length;
}

/**
 * @function computeSum
 * @param numbers 
 * @returns The sum of the numbers
 */
export function computeSum(numbers: number[]) {
  return numbers.reduce((prev, curr) => prev + curr, 0);
}

/**
 * @function computeMedian
 * @param numbers
 * @returns The median of the numbers
 */
export function computeMedian(numbers: number[]) {
  const sortedNumbers = numbers.toSorted((a, b) => a - b);
  const length = sortedNumbers.length;
  const middleLength = length / 2;
  if (length % 2 === 1) {
    return sortedNumbers[Math.floor(middleLength)];
  }
  const middle1 = sortedNumbers[middleLength - 1];
  const middle2 = sortedNumbers[middleLength];
  return (middle1 + middle2) / 2;
}
