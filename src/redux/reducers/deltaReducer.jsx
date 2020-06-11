import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// Perils of having a nested tree strucutre in the Redux State XD XD XD
export default function deltaReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_POKEMON_REQUEST:
      return { ...initialState, loading: true };
    case types.FETCH_POKEMON_SUCCESS:
      return { loading: false, data: action.payload, error: "" };
    case types.FETCH_POKEMON_FAILURE:
      return { loading: false, data: [], error: action.payload };
    case types.SET_COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
}
