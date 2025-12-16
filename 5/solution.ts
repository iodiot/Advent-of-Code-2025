// --- Day 5: Cafeteria ---

import fs from 'fs';

function countFresh(ranges: number[][], ids: number[]): number {
  let total = 0;

  for (const id of ids) {
    for (const range of ranges) {
      if (id >= range[0] && id <= range[1]) {
        total += 1;
        break;
      }
    }
  }

  return total;
}

function countAllFresh(ranges: number[][]) {
  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; ++i) {
    const prev = merged.pop();
    const curr = ranges[i];

    if (!prev) throw new Error('Stack is empty');

    if (curr[0] <= prev[1]) {
      merged.push([prev[0], Math.max(prev[1], curr[1])]);
    } else {
      merged.push(prev);
      merged.push(curr);
    }
  }

  let total = 0;

  for (const [start, end] of merged) {
    total += end - start + 1;
  }

  return total;
}

console.time('time');

const lines: string[] = fs.readFileSync('./input.txt', 'utf8')
    .trim().split('\n');

const div = lines.indexOf('');

const ranges = lines.slice(0, div)
  .map(line => line.split('-').map(Number))
  .sort((a, b) => a[0] - b[0]);

const ids = lines.slice(div + 1).map(Number);

console.log(`part 1: ${ countFresh(ranges, ids)}`);
console.log(`part 2: ${ countAllFresh(ranges) }`);

console.timeEnd('time');
