export const cookie = `session=${process.env.SESSION_COOKIE}`;
export const year = process.env.AOC_YEAR || "2023";
export const day = process.env.AOC_DAY || new Date().getUTCDate();
export const inputsFolder = "inputs";
export const filePath = `${inputsFolder}/${year}/${day}.txt`;
