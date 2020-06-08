import React, { Component } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import Poketile from "./Poketile";

export class Pokesearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: "",
      pokedata: [],
      call: false,
    };
  }

  handleChange = (event) => this.setState({ pokemon: event.target.value });

  handleClick = (event) => {
    // event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemon}`)
      .then((response) => {
        console.log(response);
        this.setState({
          ...this.state,
          pokedata: response.data,
          call: true,
        });
      });
  };

  render() {
    const { pokemon, call, pokedata } = this.state;

    return (
      <div>
        <div id="input-field">
          <input
            type="text"
            value={pokemon}
            onChange={this.handleChange}
            name="search"
            id="search-bar"
          />
        </div>
        <button type="submit" onClick={this.handleClick}>
          search
        </button>
        {call ? <Poketile pokedata={pokedata} /> : null}
        {/* {call
          ? types.map((x) => <Pokemon types={x.type.name}>{pokedata}</Pokemon>)
          : null} */}
      </div>
    );
  }
}

export default Pokesearch;
