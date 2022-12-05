const {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
} = require('../utils/puzzleInput');
const { getYear, getDay } = require('../utils/puzzleDate');

const solvePart1 = (input, moves) => {
  const stacks = input.map((stack) => stack.slice());

  for (const move of moves) {
    let [count, src, dest] = move;
    for (let i = 0; i < count; i += 1) {
      stacks[dest].push(stacks[src].pop());
    }
  }

  return stacks.reduce(
    (rslt, stk) => (rslt += stk.length ? stk.at(-1) : ''),
    ''
  );
};

const solvePart2 = (input, moves) => {
  const stacks = input.map((stack) => stack.slice());
  
  for (const [count, fr, to] of moves) {
    const crates = [];
    for (let i = 0; i < count; i += 1) {
      crates.unshift(stacks[fr].pop());
    }
    while (crates.length) {
      stacks[to].push(crates.shift());
    }
  }

  return stacks.reduce(
    (rslt, stk) => (rslt += stk.length ? stk.at(-1) : ''),
    ''
  );
};

const formatInput = (content) => {
  let stacks = new Array(10).fill(null).map(() => []);
  content.slice(0, 8).forEach((line) => {
    const crates = line.match(/.{3,4}/g).map((str) => str.trim());
    crates.forEach((crate, idx) => {
      if (crate.length) {
        stacks[idx + 1].unshift(crate[1]);
      }
    });
  });

  const moves = content
    .slice(10)
    .map((line) =>
      line.split(' ').filter((elem) => Number.isInteger(parseInt(elem)))
    )
    .map((arr) => arr.map((str) => Number.parseInt(str)));

  return { stacks, moves };
};

const main = async () => {
  const year = parseInt(getYear(__dirname));
  const day = parseInt(getDay(__filename));

  const inputFile = await downloadInputFile(year, day);
  const fileContent = await parseInputFile(inputFile);
  const { stacks, moves } = formatInput(fileContent);

  const sol1 = solvePart1(stacks, moves);
  console.log(`Part #1 solution:     ${sol1}`);
  // submitAnswer(year, day, 1, sol1);

  const sol2 = solvePart2(stacks, moves);
  console.log(`Part #2 solution:     ${sol2}`);
  // submitAnswer(year, day, 2, sol2);
};

main();
