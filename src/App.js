import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";
import Grid from "./components/Grid";

const numRows = 10;
const numCols = 10;

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

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateRandomLife = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)));
  }
  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // check boundaries reach
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbours += g[newI][newK];
              }
            });

            // check neighbours conditions (alive / dead (1 / 0))
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbours === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 50);
  }, []);

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button
            className="launchBtn"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>

          <button
            onClick={() => {
              setGrid(generateRandomLife());
            }}
          >
            Random
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setGrid(generateEmptyGrid());
            }}
          >
            Clear
          </button>
        </div>
        <Grid grid={grid} cols={numCols} gridSetter={setGrid} />
      </div>
    </>
  );
}

export default App;
