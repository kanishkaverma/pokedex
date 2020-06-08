import React from "react";

const Pokemon = (props) => {
  return (
    <div>
      <div className="image">
        <img src={props.children.sprites.front_default} />
      </div>
      <div className="type">{props.types}</div>
    </div>
  );
};

export default Pokemon;
