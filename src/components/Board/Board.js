import React from "react";
import Cell from "../Cell/Cell";

const createGrid = (width) => {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid[i] = [];
  }
  return grid;
};

let grid = createGrid(1000);

let populatedGrid = grid.map((el) => <Cell />);

const Board = () => {
  return <div className="board">{populatedGrid}</div>;
};

export default Board;
