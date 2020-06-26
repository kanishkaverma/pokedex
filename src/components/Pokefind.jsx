import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchData,
  setPokelist,
  fetchPokelist,
} from "../redux/actions/actions";
import { useSelector } from "react-redux";
import Pokeoption from "./Pokeoption";
import axios from "axios";
import { timeout } from "d3";
import { random } from "core-js/fn/number";

const Pokefind = () => {
  const pokedata = useSelector((state) => state);
  const data = useSelector((state) => state.delta);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading_local, setLoadingLocal] = useState(false);
  const pokelist = useSelector((state) => state.delta.pokelist);
  // const pokelistLoaded = useSelector((state)=> statee)

  // fall color back for default theme
  var fallback = "white";

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000").then((res) => {
      //  const randomInt = Math.floor(Math.random() * res.data.results.length);
      //   // console.log(res);
      //   // dispatch(fetchData(res.data.results[randomInt].name));

      dispatch(setPokelist(res.data.results));
      //   console.log(pokelist);
      //   dispatch(pokelist[randomInt].name);
      // });
      // dispatch(fetchPokelist());
    });
    // .then(console.log(pokelist));
  }, []);

  useEffect(() => {
    if (pokelist && pokelist.length > 800) {
      const randomInt = Math.floor(Math.random() * pokelist.length);
      // dispatch(pokelist[randomInt].name);
      console.log(pokelist[randomInt]);
    }
  }, [pokelist]);

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
