import React from "react";
import produce from "immer";

const Grid = ({ grid, cols, gridSetter }) => {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 20px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            className="cell"
            key={`${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
              });
              gridSetter(newGrid);
            }}
            style={{
              backgroundColor: grid[i][k] ? "lightgreen" : undefined,
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;
