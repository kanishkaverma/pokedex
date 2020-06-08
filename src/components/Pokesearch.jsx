import React, { Component } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";

export class Pokesearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: "",
      pokedata: [],
      types: [],
      call: false,
      img: "",
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
          types: response.data.types,
          call: true,
        });
        //   { pokemon: "", pokedata: res  ponse.data },
        //   console.log(this.state)
      });

    // console.log(this.state);
  };

  render() {
    const { pokemon, call, types, pokedata } = this.state;
    // if (this.state.pokedata != null) {
    //   const { types } = this.state;

    //   types.map((x) => <Pokemon />);
    // }
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
        {call
          ? types.map((x) => (
              <Pokemon types={x.type.name} img={pokedata.sprites.front_default}>
                {pokedata}
              </Pokemon>
            ))
          : null}
      </div>
    );
  }
}

export default Pokesearch;
