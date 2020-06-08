import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "./Chart";

const Poketile = (props) => {
  const {
    pokedata: {
      sprites: { front_default: img },
      types,
      height,
      weight,
      stats,
    },
  } = props;

  return (
    <div>
      <div className="image-root">
        <img src={img} />
      </div>
      <div id="stats-root">
        <Chart stats={stats} />
      </div>
      <div className="types-root">
        types
        {types.map((x, i) => (
          <div key={i} className="types">
            {x.type.name}
          </div>
        ))}
        <br />
      </div>
      <div className="stats.root">
        <div id="height">height: {`${height / 10} m`}</div>
        <div id="weight">weight: {`${weight / 10} kg`}</div>
      </div>
    </div>
  );
};

export default Poketile;
