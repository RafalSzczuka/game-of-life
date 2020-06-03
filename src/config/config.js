const size = 30;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const interval = 100;

// lower ratio === more alive cells at the beginning
const randomSeedRatio = 0.8;

export { size, operations, interval, randomSeedRatio };
