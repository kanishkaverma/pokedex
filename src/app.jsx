/*global $*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pokesearch from "./components/Pokesearch";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";

//Root sass file for webpack to compile
import "./sass/main";
import Pokefind from "./components/Pokefind";

//Initial Default Redux Settings
const store = configureStore();
function App() {
  return (
    <Provider store={store}> 
     <Pokefind />
      </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
