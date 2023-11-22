export const cookie = `session=${process.env.SESSION_COOKIE}`;
export const year = process.env.AOC_YEAR || "2023";
export const day = process.env.AOC_DAY || new Date().getUTCDate();
export const inputsFolder = "inputs";
const path = `${inputsFolder}/${year}/${day}`;
export const puzzleFile = `${path}.txt`;
export const instructionsFile = `${path}.md`;
