const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');

const getPriority = (char) => {
  const diff = char === char.toUpperCase() ? 38 : 96;

  return char.charCodeAt(0) - diff;
};

const solvePart1 = (input) => {
  let count = 0;
  for (const line of input) {
    const mid = line.trim().length / 2;
    const left = new Set(line.slice(0, mid));
    const right = new Set(line.slice(mid));

    const dupe = [...left].filter((char) => right.has(char)).join('');

    count += getPriority(dupe);
  }

  return count;
};

const solvePart2 = (input) => {
  let count = 0;
  for (let i = 0; i < input.length; i += 3) {
    const frst = new Set(input[i]);
    const scnd = new Set(input[i + 1]);
    const thrd = new Set(input[i + 2]);

    const badge = [...frst]
      .filter((char) => scnd.has(char) && thrd.has(char))
      .join('');

    count += getPriority(badge);
  }

  return count;
};

const formatInput = (content) => {
  return content;
};

const main = async () => {
  const year = parseInt(getYear(__dirname));
  const day = parseInt(getDay(__filename));

  const inputFile = await downloadInputFile(year, day);
  const fileContent = await parseInputFile(inputFile);
  const input = formatInput(fileContent);

  const sol1 = solvePart1(input);
  console.log(`Part #1 solution:     ${sol1}`);
  // submitAnswer(year, day, 1, sol1);

  const sol2 = solvePart2(input);
  console.log(`Part #2 solution:     ${sol2}`);
  // submitAnswer(year, day, 2, sol2);
};

main();
