import { combineReducers } from 'redux';
import delta from './deltaReducer';

const rootReducer = combineReducers({
  // short hand property names , we only have one reducer for now
  // but will have more than one in future as project expands
  delta
})

export default rootReducer;  

// state  = { 
//   loading: true, 
//   data : [ ],
//      error: [] 
// }
// Actions { 
//FETCH_USERS_SUCESS_REQUEST_FAILURE
// // }
// reducer
// case: REQUEST 
// loading: true 
// CASE: SUCCESS   
// loading: false 
// users: data(from api )
// failure: 
// loading :false 
// error : error 