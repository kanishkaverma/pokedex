import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

export default function Pokemon(props) {
  defaults.global.defaultFontColor = 'black';
  const dict = {
    normal: '#A8A878',
    fire: 'rgb(240, 128, 48)',
    water: 'rgb(104, 144, 240)',
    grass: 'green',
    fighting: 'rgb(192, 48, 40)',
    flying: '#A890F0',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: ' #E0C068',
    psychic: '#F85888',
    rock: '#B8A038',
    ice: '#98D8D8',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848 ',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  const {
    types,
    height,
    weight,
    name,
    sprites: { front_default: imgsrc },
    stats: [a, b, c, d, e]
  } = useSelector((state) => state.delta.data);

  const { color } = useSelector((state) => state.delta);

  useEffect(() => {
    console.log(color);
  }, [color]);

  const data = {
    labels: [a.stat.name, b.stat.name, c.stat.name, d.stat.name, e.stat.name],
    datasets: [
      {
        label: 'Stats',
        data: [a.base_stat, b.base_stat, c.base_stat, d.base_stat, e.base_stat],
        backgroundColor: ['#4CC9F0', '#4895EF', '#4361EE', '#3F37C9', '#3A0CA3B', '#480CA8'],

        borderColor: ['#4CC9F0', '#4895EF', '#4361EE', '#3F37C9', '#3A0CA3B', '#480CA8'],
        borderWidth: 1
      }
    ]
  };
  return (
    <div className='pokemon'>
      <div className='name'>
        <h1>{name}</h1>
      </div>
      <div>
        <div className='pokeimage'>
          <img src={imgsrc} alt='Pokemon image.' />
        </div>
        <div className='info'>
          <div className='types'>
            <div className='title'>Types</div>
            <div className='sep'>|</div>
            {types.map((x, i) => (
              <div
                className='type'
                key={`${x.type.name}-${i}`}
                style={{
                  backgroundColor: dict[x.type.name]
                }}
              >
                {x.type.name}{' '}
              </div>
            ))}
          </div>
          <Doughnut data={data} />

          <div>height: {`${height / 10}m`}</div>
          <div>weight: {`${weight / 10}kg`}</div>
        </div>
      </div>
    </div>
  );
}
