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
  var fallback = "white";
  useEffect(() => {
    if (data.color) {
      fallback = data.color.darkVibrant;
      console.log("fallback changed", fallback);
    }
  }, [data]);
  const handleClick = (e) => {
    dispatch(fetchData(input));
    setLoadingLocal(true);
    setInterval(() => {
      setLoadingLocal(false);
    }, 500);
  };
  // useEffect(() => {
  //   document.body.style.backgroundColor = pokedata.delta.color.vibrant;
  // }, [pokedata.delta.color]);

  return (
    <div>
      <div className="search-bar-root">
        <input
          type="text"
          value={input}
          onChange={(i) => setInput(i.target.value)}
          className="search-bar"
          style={{
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
        {/* {(pokedata == {}) & pokedata.delta.loading ? (
          <h2>loading</h2>
        ) : pokedata.delta.error ? (
          <h2>{pokedata.delta.error}</h2>
        ) : (
          <div>
            <Pokeoption />
          </div>
        )} */}
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
