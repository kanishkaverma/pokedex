import React from "react";

const Pokemon = (props) => {
  return (
    <div>
      <div className="image">
        <img src={props.img} />
      </div>
      <div className="type">{props.types}</div>
    </div>
  );
};

export default Pokemon;
