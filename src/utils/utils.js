import { size, randomSeedRatio } from "../config/config";

const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      grid[i].push(0);
    }
  }
  return grid;
};

const generateRandomLife = () => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      grid[i].push(Math.random() > randomSeedRatio ? 1 : 0);
    }
  }
  return grid;
};

export { generateGrid, generateRandomLife };
