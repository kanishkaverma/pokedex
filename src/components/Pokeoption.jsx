import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import Pokemon from './Pokemon';

import { usePalette } from 'react-palette';
import { setColor } from '../redux/actions/actions';

function Pokeoption() {
  //destructuring

  const {
    color,
    data: {
      name,
      sprites: { front_default: imgsrc }
    }
  } = useSelector((state) => state.delta);
  const dispatch = useDispatch();
  const [pokerender, setPokerender] = useState(false);
  const [pokeOptionrender, setPokeOptionrender] = useState(true);
  const { data, loading, error } = usePalette(imgsrc);

  //click handler
  const handleClick = (e) => {
    setPokerender(true);
    setPokeOptionrender(false);
  };
  // dynamically change theme
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log('Err');
      } else {
        dispatch(setColor(data));
        document.body.style.backgroundColor = data.vibrant;
      }
    }
  }, [loading]);

  return (
    <div className='pokeoption-root'>
      {/* conditional rendering of Pokemon component.   */}
      {pokeOptionrender && (
        <div className='pokemon-select'>
          <img src={imgsrc} alt='Pokemon image.' onClick={handleClick} />
          <h2>{name}</h2>
        </div>
      )}

      <div className='pokeoption-pokemon'>{pokerender && <Pokemon />}</div>
    </div>
  );
}
export default Pokeoption;
