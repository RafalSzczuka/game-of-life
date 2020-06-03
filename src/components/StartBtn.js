import React from "react";

const StartBtn = ({ handler, state }) => {
  return (
    <button
      className={state ? "startBtn active" : "startBtn"}
      onClick={handler}
    >
      {state ? "pause" : "start"}
    </button>
  );
};

export default StartBtn;
