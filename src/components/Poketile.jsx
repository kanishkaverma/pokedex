import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "./Chart";
import { usePalette } from "react-palette";
import Palette from "react-palette";
const ColorThief = require("colorthief");

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

  const { data, loading, error } = usePalette(img);
  console.log(data);

  return (
    <div>
      <div className="image-root">
        <img src={img} />
        <div style={{ display: "flex" }}>
          {Object.keys(data).map((x) => (
            <div
              style={{
                height: "25px",
                width: "25px",
                backgroundColor: data[x],
              }}
            />
          ))}
        </div>
        <div style={{ color: data.vibrant }}>Text with the vibrant color</div>
      </div>
      <div id="stats-root">
        <Chart stats={stats} color={data} />
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
