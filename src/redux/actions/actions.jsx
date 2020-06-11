import * as types from "./actionTypes";
import axios from "axios";
const fetchPokemonSuccess = (x) => ({
  type: types.FETCH_POKEMON_SUCCESS,
  payload: x,
});
const fetchPokemonFailure = (e) => ({
  type: types.FETCH_POKEMON_FAILURE,
  payload: e,
});
const fetchPokemonRequest = () => ({ type: types.FETCH_POKEMON_REQUEST });
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

export const setColor = (x) => ({
  type: types.SET_COLOR,
  payload: x,
});
