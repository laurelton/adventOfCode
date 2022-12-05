const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');

const solvePart1 = (input) => {
  const scores = new Map();
  scores.set('X', { points: 1, A: 3, B: 0, C: 6 });
  scores.set('Y', { points: 2, A: 6, B: 3, C: 0 });
  scores.set('Z', { points: 3, A: 0, B: 6, C: 3 });

  let totalScore = 0;
  for (const [opp, player] of input) {
    const scoreObj = scores.get(player);
    totalScore += scoreObj.points;
    totalScore += scoreObj[opp];
  }

  return totalScore;
};

const solvePart2 = (input) => {
  const scores = new Map();
  scores.set('X', { points: 0, A: 3, B: 1, C: 2 });
  scores.set('Y', { points: 3, A: 1, B: 2, C: 3 });
  scores.set('Z', { points: 6, A: 2, B: 3, C: 1 });

  let totalScore = 0;
  for (const [opp, player] of input) {
    const scoreObj = scores.get(player);
    totalScore += scoreObj.points;
    totalScore += scoreObj[opp];
  }

  return totalScore;
};

const formatInput = (content) => {
  return content.map((line) => line.trim().split(' '));
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
