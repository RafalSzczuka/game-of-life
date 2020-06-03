import React from "react";

const RandomSeedBtn = ({ setter, generator }) => {
  return (
    <button
      className="randomBtn"
      onClick={() => {
        setter(generator);
      }}
    >
      Random seed
    </button>
  );
};

export default RandomSeedBtn;
