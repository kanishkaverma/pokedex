import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
// import PokeChart from './PokeChart';

export default function Pokemon(props) {
  const {
    types,
    height,
    weight,
    name,
    sprites: { front_default: imgsrc },
    stats: [a, b, c, d, e, f]
  } = useSelector((state) => state.delta.data);
  useEffect(() => {
    // console.log(stats);
  }, [a]);
  return (
    <div>
      <h1>
        <div className='pokeimage'>
          <img src={imgsrc} alt='Pokemon image.' />
        </div>
        <div className='info'>
          {name}
          {/* <PokeChart /> */}
          <div className='types'>
            <div>Types</div>
            {types.map((x, i) => (
              <div key={`${x.type.name}-${i}`}>{x.type.name} </div>
            ))}
          </div>
          <div>height: {`${height / 10}m`}</div>
          <div>weight: {`${weight / 10}kg`}</div>
        </div>
      </h1>
    </div>
  );
}
