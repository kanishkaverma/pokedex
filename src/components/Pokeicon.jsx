import React, { Component } from "react";
import axios from "axios";
class Pokeicon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: "",
    };
  }
  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.name}`)
      .then((response) => {
        this.setState({ img: response.data.sprites.front_default });
      });
  }

  render() {
    return (
      <div onClick={()=>this.props.onClick(this.props.name)}>
        <img src={this.state.img} />
      </div>
    );
  }
}
export default Pokeicon;
