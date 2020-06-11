import React from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData } from "../redux/actions/actions";
import { useSelector } from "react-redux";

export default function Pokemon(props) {
  const [state, setState] = useState({
    img: " ",
    name: " ",
  });
  const types = useSelector((state) => state.delta.data.types);
  const height = useSelector((state) => state.delta.data.height);
  const weight = useSelector((state) => state.delta.data.weight);

  useEffect(() => {
    setState({ img: props.img, name: props.name });
  }, []);
  const name = useSelector((state) => state.delta.data.name);
  return (
    <div>
      <h1>
        <div className="pokeimage">
          <img src={state.img} alt="Pokemon image." />
        </div>
        <div className="info">
          {state.name}
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
