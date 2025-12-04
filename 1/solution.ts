// --- Day 1: Secret Entrance ---

import fs from 'fs';

const trueMod = (a: number, n: number) => ((a % n) + n) % n;

function breakPassword(lines: string[], countAllZeroClicks: boolean = false): number {
  let current = 50;
  let n = 0;

  for (let line of lines) {
    const turns = Number.parseInt(line.slice(1));

    const next = line[0] === 'R' ? current + turns : current - turns;

    current = trueMod(next, 100);

    // console.log(`The dial is rotated ${line} to point at ${current}. [${Math.abs(Math.floor(next / 100))}]`);

    if (countAllZeroClicks) {
      n += Math.abs(Math.floor(next / 100));
    } else {
      n += current === 0 ? 1 : 0;
    }
  }

  return n;
}

console.time('time');

const lines: string[] = fs.readFileSync('./input.txt', 'utf8')
  .trim()
  .split('\n');

console.log(`part 1: ${ breakPassword(lines) } `);
console.log(`part 2: ${ breakPassword(lines, true) } `);

console.timeEnd('time');

// 5765 -- to low
