/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';

//Root sass file for webpack to compile
import './sass/main';
import Pokefind from './components/Pokefind';

//Initial Default Redux Settings
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <Favicon url='https://github.com/kanishkaverma/pokedex/blob/featureBranch/build/assets/favicon.ico' />
      <Pokefind />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
