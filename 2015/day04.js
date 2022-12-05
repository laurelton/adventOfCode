const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');
const crypto = require('node:crypto');

const getMD5sum = (str) => {
    return crypto.createHash('md5').update(str).digest('hex');
};

const solvePart1 = (input) => {
    let num = 1;
    while (true) {
        const md5sum = getMD5sum(`${input}${num}`);

        if (md5sum.startsWith('00000')) return num;

        num += 1;
    }
};

const solvePart2 = (input, start) => {
    let num = start;
    while (true) {
        const md5sum = getMD5sum(`${input}${num}`);

        if (md5sum.startsWith('000000')) return num;

        num += 1;
    }
};

const formatInput = (content) => {
    return content.pop();
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

  const sol2 = solvePart2(input, sol1);
  console.log(`Part #2 solution:     ${sol2}`);
  // submitAnswer(year, day, 2, sol2);
};

main();