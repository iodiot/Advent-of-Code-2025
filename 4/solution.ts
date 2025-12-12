// --- Day 4: Printing Department ---

import fs from 'fs';

function isFree(grid: string[], x: number, y: number): boolean {
  return x < 0 || x >= grid[0].length || y < 0 || y >= grid.length || grid[y][x] === '.';
}

function isRollAccessible(grid: string[], x: number, y: number): boolean {
  if (isFree(grid, x, y)) return false;

  let n = 0;

  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      if (i == 0 && j == 0) continue;
      n += isFree(grid, x + i, y + j) ? 0 : 1;
    }
  }

  return n < 4;
}

function countAccessibleRolls(grid: string[]): number {
  let n = 0;

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      n += isRollAccessible(grid, x, y) ? 1 : 0;
    }
  }

  return n;
}

function countRemovableRolls(grid: string[]): number {
  let n = 0;

  let curr: string[] = structuredClone(grid);
  let running = true;

  while (running) {
    running = false;

    const next = [];

    for (let y = 0; y < curr.length; ++y) {
      const row = [];

      for (let x = 0; x < curr[y].length; ++x) {
        if (isRollAccessible(curr, x, y)) {
          running = true;
          n += 1;
          row.push('.');
        } else {
          row.push(curr[y][x]);
        }
      }

      next.push(row.join(''));
    }

    curr = next;
  }

  return n;
}

console.time('time');

const grid: string[] = fs.readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');

console.log(`part 1: ${ countAccessibleRolls(grid) }`);
console.log(`part 2: ${ countRemovableRolls(grid) }`);

console.timeEnd('time');
