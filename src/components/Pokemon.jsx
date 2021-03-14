import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

// import MyChart from './PokeChart';

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
    stats: [a,b,c,d,e]
  } = useSelector((state) => state.delta.data);
  useEffect(() => {
    // console.log(stats)
    console.log(a.base_stat,b,c)
  }, []);

  const data = {
    labels: [a.stat.name,b.stat.name,c.stat.name,d.stat.name,e.stat.name],
    datasets: [
      {
        label: '# of Votes',
        data: [a.base_stat,b.base_stat,c.base_stat,d.base_stat,e.base_stat ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
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
          <Doughnut data={data} />

          <div>height: {`${height / 10}m`}</div>
          <div>weight: {`${weight / 10}kg`}</div>
        </div>
      </h1>
    </div>
  );
}
