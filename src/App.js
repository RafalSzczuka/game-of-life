import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";
import Grid from "./components/Grid";
import StartBtn from "./components/StartBtn";
import RandomSeedBtn from "./components/RandomSeedBtn";
import { interval, operations, size } from "./config/config";

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(Array.from(Array(size), () => 0));
  }
  return rows;
};

const generateRandomLife = () => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(Array.from(Array(size), () => (Math.random() > 0.8 ? 1 : 0)));
  }
  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(size);
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
        for (let i = 0; i < size; i++) {
          for (let k = 0; k < size; k++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // check boundaries reach
              if (newI >= 0 && newI < size && newK >= 0 && newK < size) {
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

    setTimeout(runSimulation, interval);
  }, []);

  const handleStartBtn = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  return (
    <>
      <div className="container">
        <div className="buttons">
          <StartBtn handler={() => handleStartBtn()} state={running} />
          <div className="secondary">
            <RandomSeedBtn setter={setGrid} generator={generateRandomLife} />
            <button
              className="clearBtn"
              onClick={() => {
                setRunning(false);
                setGrid(generateEmptyGrid());
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <Grid grid={grid} cols={size} gridSetter={setGrid} />
      </div>
    </>
  );
}

export default App;
