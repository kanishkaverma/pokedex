import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
// import PokeChart from './PokeChart';

export default function Pokemon(props) {
  const dict = {
    normal: 'rgb(255, 255, 255)',
    fire: 'rgb(240, 128, 48)',
    water: 'rgb(104, 144, 240)',
    grass: 'green',
    fighting: 'rgb(192, 48, 40)', 
    flying: '#A890F0'
  };
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
              <div key={`${x.type.name}-${i}`}
              style={{
                  backgroundColor: dict[x.type.name]
                }} 
              
              >{x.type.name} </div>
            ))}
          </div>
          <div>height: {`${height / 10}m`}</div>
          <div>weight: {`${weight / 10}kg`}</div>
        </div>
      </h1>
    </div>
  );
}
