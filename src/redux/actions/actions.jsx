import * as types from "./actionTypes";
import axios from "axios";
import { dispatch } from "d3";

//Action creators
const fetchPokemonSuccess = (x) => ({
  type: types.FETCH_POKEMON_SUCCESS,
  payload: x,
});
const fetchPokemonFailure = (e) => ({
  type: types.FETCH_POKEMON_FAILURE,
  payload: e,
});
const fetchPokemonRequest = () => ({ type: types.FETCH_POKEMON_REQUEST });

export const setColor = (x) => ({
  type: types.SET_COLOR,
  payload: x,
});

export const getPokelist = () => {
  type: types.GET_POKELIST;
};

export const setPokelist = (x) => ({
  type: types.SET_POKELIST,
  payload: x,
});

// thunk making the api call
export const fetchData = (input = "pikachu") => {
  return (dispatch) => {
    dispatch(fetchPokemonRequest);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${input}`)
      .then((res) => {
        const data = res.data;
        dispatch(fetchPokemonSuccess(data));
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(fetchPokemonFailure(errormsg));
      });
  };
};

export const fetchPokelist = () => {
  return (dispatch) => {
    dispatch(fetchPokemonRequest);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then((res) => {
        const data = res.data.results;
        dispatch(setPokelist(data));
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(fetchPokemonFailure(errormsg));
      });
  };
};
