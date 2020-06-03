import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";
import Grid from "./components/Grid";
import StartBtn from "./components/StartBtn";
import RandomSeedBtn from "./components/RandomSeedBtn";
import { interval, operations, size } from "./config/config";
import { generateGrid, generateRandomLife } from "./utils/utils";

function App() {
  const [grid, setGrid] = useState(() => {
    return generateGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((originGrid) => {
      return produce(originGrid, (draftGrid) => {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let neighbours = 0;

            // check every possible neighbour cell
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              // check grid boundaries reach
              if (newI >= 0 && newI < size && newJ >= 0 && newJ < size) {
                neighbours += originGrid[newI][newJ];
              }
            });

            // check neighbours conditions (alive / dead (1 / 0))
            if (neighbours < 2 || neighbours > 3) {
              draftGrid[i][j] = 0;
            } else if (originGrid[i][j] === 0 && neighbours === 3) {
              draftGrid[i][j] = 1;
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
                setGrid(generateGrid());
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <Grid grid={grid} gridSetter={setGrid} />
      </div>
    </>
  );
}

export default App;
