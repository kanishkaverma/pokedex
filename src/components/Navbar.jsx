import React from 'react';
import logo from '../../build/assets/logo.svg';
import '../sass/components/navbar.scss';
import { VscGithub } from 'react-icons/vsc';

const navbar = () => {
  return (
    <header className='nav_header'>
      {/* <add-comment></add-comment> */}
      <nav className='nav'>
        <img src={logo} alt='' />
        <ul className='nav_links'>
          <li>
            <a href='https://github.com/kanishkaverma/pokedex' target='_blank' className='nav_item'>
              <VscGithub size={30} className='git_icon' />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default navbar;
