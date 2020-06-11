import React, { Component } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import Poketile from "./Poketile";
import levenshtein from "fast-levenshtein";
import Pokeicon from "./Pokeicon";
import ReactLoading from "react-loading";
import { usePalette } from "react-palette";

export class Pokesearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: "",
      pokedata: [],
      call: false,
      pokelist: [],
      searchresult: [],
      color: {},
    };
  }
  handleIconClick = (x) => {
    this.setState({ searchresult: [], pokemon: x, call: true });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${x}`)
      .then((response) => {
        this.setState({
          // ...this.state,
          pokedata: response.data,
        });
      })
      .finally(() => this.setState({ call: false }));
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`)
      .then((response) => {
        this.setState({ pokelist: response.data.results.map((x) => x.name) });
      });
  }

  handleChange = (event) => this.setState({ pokemon: event.target.value });

  handleClick = (event) => {
    this.setState({ call: true, pokedata: [] });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemon}`)
      .then((response) => {
        if (response.data.name) {
          this.setState({
            // ...this.state,
            pokedata: response.data,
          });
        } else {
        }
      })
      .catch(() => {
        setTimeout(
          () =>
            this.setState({
              searchresult: this.state.pokelist.filter(
                (e) =>
                  e.includes(this.state.pokemon) ||
                  levenshtein.get(e, this.state.pokemon) < 3
              ),
            }),
          1000
        );
      })
      .finally(() => {
        setTimeout(() => this.setState({ call: false }), 1000);
      });
  };

  render() {
    const { pokemon, call, pokedata, searchresult } = this.state;
    // if (call && pokedata.length != 0) {
    //   const { col, loading, error } = usePalette(
    //     this.state.pokedata.sprites.front_default
    //   );
    //   console.log(col);
    //   this.setState({ color: col });
    // }

    return (
      <div>
        <div id="input_container">
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
        </div>
        {pokedata.length == 0 && !call ? (
          <></>
        ) : call ? (
          <div className="loading">
            <ReactLoading
              type={"spinningBubbles"}
              color={"red"}
              height={"20px"}
              width={"20px"}
            />
          </div>
        ) : (
          <Poketile pokedata={pokedata} color={this.state.color} />
        )}
        {searchresult.length > 0 ? (
          searchresult.map((x, i) => (
            <Pokeicon
              name={x}
              key={`${i}-${x}`}
              onClick={this.handleIconClick}
            />
          ))
        ) : (
          <></>
        )}
        {/* {call
          ? types.map((x) => <Pokemon types={x.type.name}>{pokedata}</Pokemon>)
          : null} */}
      </div>
    );
  }
}

export default Pokesearch;
