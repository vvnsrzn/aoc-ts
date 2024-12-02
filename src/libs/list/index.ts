/**
 * @function permutation
 * @param element number[]
 * @returns The permutation of the element
 * @example permutation([1, 2]) => [[2], [1]]
 * @example permutation([1, 2, 3]) => [[2, 3], [1, 3], [1, 2]]
 */
export function permutation(element: number[]): number[][] {
    const result = [];
    if (element.length === 0) return [[]];
    for (let i = 0; i < element.length; i++) {
        const remaining = element.slice(0, i).concat(element.slice(i + 1));
        result.push(remaining)
    }
    return result;
}
