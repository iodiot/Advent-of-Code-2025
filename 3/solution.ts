// --- Day 3: Lobby ---

import fs from 'fs';

function findTotalJoltage(batteries: number[][], turnedOn: number) {
  let total = 0;

  for (const battery of batteries) {
    let start = 0;

    for (let n = turnedOn - 1; n >= 0 ; --n) {
      for (let i = start; i < battery.length - n; ++i) {
        if (battery[start] < battery[i]) start = i;
      }

      total += battery[start++] * Math.pow(10, n);
    }
  }

  return total;
}

console.time('time');

const batteries: number[][] = fs.readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number));

console.log(`part 1: ${ findTotalJoltage(batteries, 2) }`);
console.log(`part 2: ${ findTotalJoltage(batteries, 12) }`);

console.timeEnd('time');
