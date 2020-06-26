import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData } from "../redux/actions/actions";
import { useSelector } from "react-redux";
import Pokeoption from "./Pokeoption";

const Pokefind = () => {
  const pokedata = useSelector((state) => state);
  const data = useSelector((state) => state.delta);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading_local, setLoadingLocal] = useState(false);

  // fall color back for default theme
  var fallback = "white";

  // refresh theme when there is a pokemon in the state
  useEffect(() => {
    if (data.color) {
      fallback = data.color.darkVibrant;
    }
  }, [data]);

  // click handler:
  // dispatches fetch data
  // sets loading  true and after a delay sets it false
  const handleClick = (e) => {
    dispatch(fetchData(input));
    setLoadingLocal(true);
    setInterval(() => {
      setLoadingLocal(false);
    }, 500);
  };

  return (
    <div>
      <div className="search-bar-root">
        {/* style theme tag according to the pokemon  */}
        <input
          type="text"
          value={input}
          onChange={(i) => setInput(i.target.value)}
          className="search-bar"
          style={{
            // use data.color if available otherwise use fallback color.
            border: `4px solid ${
              data.color && data.color.darkVibrant
                ? data.color.darkVibrant
                : fallback
            }`,
            backgroundColor: `${
              data.color && data.color.darkMuted
                ? data.color.darkMuted
                : fallback
            }`,
          }}
        />
        <button onClick={handleClick}>Search</button>
      </div>
      <div className="response">
        {/* if pokedata is empty or loading_local is true then display empty otherwise render pokeoption  */}
        {Object.keys(pokedata).length == 0 || loading_local ? (
          <h2>loading</h2>
        ) : pokedata.delta.error ? (
          <h2>{pokedata.delta.error}</h2>
        ) : (
          <div>
            <Pokeoption />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokefind;
