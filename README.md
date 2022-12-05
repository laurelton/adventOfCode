# Advent of Code

Solutions to [Advent of Code]

[Advent of Code]: https://adventofcode.com

The `utils` folder contains functions that automatically downloads input files, and submits answers.  These functions expect that a directory exists for each year, containing a subdirectory `input` where the input for each day will be stored. Additionally, solution files are expected to be named `dayXX.js`, where `XX` is the zero padded day of the puzzle.

Example directory structure:

```bash
2022
├── day01.js
├── day02.js
├── day03.js
├── day04.js
├── day05.js
└── input
    ├── day01.txt
    ├── day02.txt
    ├── day03.txt
    ├── day04.txt
    └── day05.txt
```