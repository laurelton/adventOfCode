const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');

const solvePart1 = (input) => {
  const calTotals = input.map((arr) =>
    arr.reduce((total, cals) => total + cals)
  );

  return Math.max(...calTotals);
};

const solvePart2 = (input) => {
  const calTotals = input.map((arr) =>
    arr.reduce((total, cals) => total + cals)
  );

  return calTotals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, cals) => total + cals);
};

const formatInput = (content) => {
  const input = [[]];
  let idx = 0;
  for (const line of content) {
    if (line.trim().length) {
      input[idx].push(Number.parseInt(line, 10));
    } else {
      idx += 1;
      input.push([]);
    }
  }

  return input;
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
