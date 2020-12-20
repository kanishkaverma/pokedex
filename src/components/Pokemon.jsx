import React from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData } from "../redux/actions/actions";
import { useSelector } from "react-redux";

export default function Pokemon(props) {
  // useSelector passing stuff as props
  const types = useSelector((state) => state.delta.data.types);
  const height = useSelector((state) => state.delta.data.height);
  const weight = useSelector((state) => state.delta.data.weight);
  const name = useSelector((state) => state.delta.data.name);
  const imgsrc = useSelector((state) => state.delta.data.sprites.front_default);

  return (
    <div>
      <h1>
        <div className="pokeimage">
          <img src={imgsrc} alt="Pokemon image." />
        </div>
        <div className="info">
          {name}
          <div className="types">
            <div>Types</div>
            {types.map((x, i) => (
              <div key={`${x.type.name}-${i}`}>{x.type.name} </div>
            ))}
          </div>
          <div>height: {`${height / 10}m`}</div>
          <div>weight: {`${weight / 10}kg`}</div>
        </div>
      </h1>
    </div>
  );
}
