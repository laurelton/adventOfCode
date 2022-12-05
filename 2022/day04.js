const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');

const solvePart1 = (input) => {
  return input.reduce(
    (count, [frst, scnd]) => count + Number(scnd.end <= frst.end),
    0
  );
};

const solvePart2 = (input) => {
  return input.reduce(
    (count, [frst, scnd]) => count + Number(scnd.begin <= frst.end),
    0
  );
};

const formatInput = (content) => {
  const input = [];
  for (const line of content) {
    const assignments = line
      .trim()
      .split(',')
      .map((asgnmnt) => asgnmnt.split('-').map((num) => parseInt(num, 10)))
      .sort((a, b) => a[0] - b[0] || b[1] - a[1])
      .map((asgn) => ({ begin: asgn[0], end: asgn[1] }));

    input.push(assignments);
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
