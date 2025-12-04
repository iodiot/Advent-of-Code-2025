// --- Day 2: Gift Shop ---

import fs from 'fs';

function findInvalid(ranges: number[][]): number {
  let sum = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; ++i) {
      const str = i.toString();
      const len = str.length;

      if (len % 2 === 0) {
        const l = str.slice(0, len / 2);
        const r = str.slice(len / 2);

        sum += l === r ? i : 0;
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
console.log(`part 2: ${0}`);

console.timeEnd('time');
