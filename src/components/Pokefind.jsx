import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, setPokelist, fetchPokelist } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import Pokeoption from './Pokeoption';
import axios from 'axios';
import Loading_svg from './Loading_svg';
import logo from '../../build/assets/logo.svg';
import keys from '../../build/assets/arrow_keys.svg';

const Pokefind = () => {
    const pokedata = useSelector((state) => state);
    const data = useSelector((state) => state.delta);
    const dispatch = useDispatch();

    /*
     * @type {React.MutableRefObject<HTMLInputElement>}
     */
    const ref = useRef(null);

    const [input, setInput] = useState('');
    const [loading_local, setLoadingLocal] = useState(false);
    const [index, setIndex] = useState(0);
    const pokelist = useSelector((state) => state.delta.pokelist);
    const [error, setError] = useState(null);

    // const invertHex = (hex) => (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();

    // invertHex('00FF00'); // Returns FF00FF

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
                case 38:
                    alert('up');
                    break;
                case 39:
                    setIndex((prev) => prev + 1);
                    break;
                case 40:
                    break;
            }
        });
    }, []);

    useEffect(() => {
        if (pokelist && pokelist.length > 800) {
            dispatch(fetchData(pokelist[index].name));
            // setInput(pokelist[index].name);
            ref.current.value = pokelist[index].name;
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
            // console.log(invertHex(data.color.vibrant.slice(1)));
            console.log(data.color);
            fallback = data.color.darkVibrant;
        }
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
            // setInput(input.trim().toLowerCase())
            dispatch(fetchData(input));
            setLoadingLocal(true);
            setInterval(() => {
                setLoadingLocal(false);
            }, 1000);
        }
    };
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            handleClick();
        }
    };

    return (
        <div>
            <div className='icon'>
                <img src={logo} alt='' />
            </div>

            <div className='search-bar-root'>
                {/* style theme tag according to the pokemon  */}
                <input
                    type='text'
                    // value={input}
                    ref={ref}
                    onChange={(i) => setInput(i.target.value)}
                    className='search-bar'
                    style={{
                        // use data.color if available otherwise use fallback color.
                        border: `4px solid ${data?.color?.darkVibrant ? data.color.darkVibrant : fallback}`,
                        backgroundColor: `${data?.color?.lightMuted ? data.color.lightMuted : fallback}`,
                        color: `${data?.color?.darkMuted ? data.color.darkMuted : fallback}`
                    }}
                    onKeyDown={handleEnter}
                />
            </div>
            <div className='response'>
                {/* if pokedata is empty or loading_local is true then display empty otherwise render pokeoption  */}
                {Object.keys(pokedata).length == 0 || loading_local ? (
                    // {tr  ue ? (
                    <Loading_svg />
                ) : pokedata.delta.error || error ? (
                    <h2>{pokedata.delta.error || error}</h2>
                ) : (
                    <div className='Pokeoption-root'>
                        <Pokeoption />
                    </div>
                )}
            </div>
            <div className='keys-container'>
                <img src={keys} alt='' />
            </div>

            {/* <div className='keys-container'>
                <div>left</div>
                <div>right</div>
            </div> */}
        </div>
    );
};

export default Pokefind;
