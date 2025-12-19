// --- Day 2: Gift Shop ---

import fs from 'fs';

function findOccurrences(str: string, search: string): number {
  let index = str.indexOf(search);
  let n = 0;

  while (index !== -1) {
    index = str.indexOf(search, index + search.length);
    n += 1;
  }

  return n;
}

function findInvalid(ranges: number[][], moreThanTwo = false): number {
  let sum = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; ++i) {
      const str = i.toString();
      const len = str.length;

      if (moreThanTwo) {
        for (let j = 1; j <= Math.floor(len / 2); ++j) {
          const n = findOccurrences(str, str.slice(0, j));

          if (j * n === len  && n >= 2) {
            sum += i;
            break;
          }
        }
      } else {
        if (len % 2 === 0) {
          sum += findOccurrences(str, str.slice(0, len / 2)) === 2 ? i : 0;
        }
      }
    }
  }

  return sum;
}

console.time('time');

const ranges: number[][] = fs.readFileSync('./input.txt', 'utf8')
  .split(',')
  .map(r => r.trim().split('-').map(Number));

console.log(`part 1: ${ findInvalid(ranges) }`);
console.log(`part 2: ${ findInvalid(ranges, true) }`);

console.timeEnd('time');

