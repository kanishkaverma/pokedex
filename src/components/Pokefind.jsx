import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, setPokelist, fetchPokelist } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import Pokeoption from './Pokeoption';
import axios from 'axios';
import Loading_svg from './Loading_svg';
import keys from '../../build/assets/arrow_keys.svg';
import Navbar from './Navbar';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Pokefind = () => {
  const { data, pokelist, loading, color, error } = useSelector((state) => state.delta);
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  const [error_local, setError] = useState(null);
  const [visible, setvisible] = useState(true);
  const ref = useRef(null);
  const dispatch = useDispatch();

  // fall color back for default theme
  var fallback = 'white';
  // api call which fetches pokemon list and updates the global state.

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000').then((res) => {
      dispatch(setPokelist(res.data.results));
    });

    document.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 37:
          setIndex((prev) => prev - 1);
          break;
        case 39:
          setIndex((prev) => prev + 1);
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (pokelist && pokelist.length > 800) {
      dispatch(fetchData(pokelist[index].name));
    }
  }, [index]);

  //Display random pokemon from pokelist in globalstore.

  useEffect(() => {
    if (pokelist && pokelist.length > 800) {
      const randomInt = Math.floor(Math.random() * pokelist.length);
      setIndex(randomInt);
    }
  }, [pokelist]);

  // refresh theme when there is a pokemon in the state
  useEffect(() => {
    if (data?.color?.vibrant) {
      fallback = color.darkVibrant;
    }

    ref.current.value = data.name;
  }, [data]);

  useEffect(() => {
    setInput(input.trim().toLowerCase());
  }, [input]);
  // click handler:
  // sets index to current pokemon
  // dispatches fetch data
  // sets loading  true and after a delay sets it false
  const handleClick = (e) => {
    const currentIndex = pokelist.findIndex((element) => element.name == input);
    if (currentIndex == -1) {
      setError('Pokemon not found');
    } else {
      setError(null);
      setIndex(currentIndex);
      dispatch(fetchData(input));
    }
  };
  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };

  const visibleUseEffect = useEffect(() => {
    setTimeout(() => setvisible(false), 3000);
  }, [visible]);

  return (
    <>
      <Navbar />
      <div className='main'>
        {/* style theme tag according to the pokemon  */}
        <input
          type='text'
          ref={ref}
          onChange={(i) => setInput(i.target.value)}
          className='search-bar'
          style={{
            // use data.color if available otherwise use fallback color.
            border: `4px solid ${color?.darkVibrant ? color.darkVibrant : fallback}`,
            backgroundColor: `${color?.lightMuted ? color.lightMuted : fallback}`,
            color: `${color?.darkMuted ? color.darkMuted : fallback}`
          }}
          onKeyDown={handleEnter}
        />
        <div className='response'>{loading ? <Loading_svg /> : error_local || error ? <h2>{error_local || error}</h2> : <Pokeoption color={color} />}</div>
      </div>
      <div className='keys'>
        <div className='key left' title='Cycle to the previous pokemon.'>
          <HiArrowLeft />
        </div>
        <div className='key right' title='Cycle to the next pokemon.'>
          <HiArrowRight />
        </div>
        <div className='key return' title='Press the Enter key to see Pokemon details.'>
          <BsArrowReturnLeft />
        </div>
      </div>
    </>
  );
};

export default Pokefind;
