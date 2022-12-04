const { access, constants, readFile, writeFile } = require('fs/promises');
const dotenv = require('dotenv');
const axios = require('axios');
const { DOMParser } = require('@xmldom/xmldom');
const { URLSearchParams } = require('url');

const fileExists = async (filename) => {
  try {
    await access(filename, constants.W_OK);
  } catch (err) {
    if (err.code === 'ENOENT') return false;

    throw err;
  }

  return true;
};

const parseInputFile = async (filename) => {
  const inputFileExists = await fileExists(filename);
  if (inputFileExists) {
    const contents = await readFile(filename, 'utf8');

    return contents.trim().split('\n');
  }

  return '';
};

const downloadInputFile = async (year, day) => {
  try {
    const paddedDay = day.toString(10).padStart(2, '0');
    const inputFile = `./${year}/input/day${paddedDay}.txt`;

    const inputFileExists = await fileExists(inputFile);
    if (inputFileExists) return inputFile;

    dotenv.config();
    const { SESSION } = process.env;
    const cookie = `session=${SESSION}`;
    const headers = { cookie };
    const timeout = 5000;
    const transformResponse = (resp) => resp;

    const resp = await axios.get(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers,
        timeout,
        transformResponse,
      }
    );

    const { data } = resp;
    await writeFile(inputFile, data, 'utf-8');

    return inputFile;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const submitAnswer = async (year, day, level, answer) => {
  const request = axios.create({
    baseURL: 'https://adventofcode.com',
  });
  const params = new URLSearchParams({ level, answer });
  dotenv.config();
  const cookie = `session=${process.env.SESSION}`;
  const headers = { cookie };

  try {
    const resp = await request.post(
      `/${year}/day/${day}/answer`,
      params.toString(),
      { headers }
    );

    const doc = new DOMParser().parseFromString(resp.data, 'text/html');
    const article = doc.getElementsByTagName('article')[0];
    const responseText = article.textContent.split('  ')[0];

    console.log();
    console.log(responseText);
    console.log('='.repeat(80));
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};

module.exports = {
  downloadInputFile,
  parseInputFile,
  submitAnswer,
};
