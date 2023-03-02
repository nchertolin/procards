import React from 'react';
import { NavLink } from 'react-router-dom';
import moonIcon from './assets/icons/moon-icon.svg'
import userIcon from './assets/icons/user-icon.svg'


export default function Header() {
  return (
    <header className='page-header'>
      <div className='header-wrapper'>
        <nav className='header-nav'>
          <NavLink className='header-logo' to=''>PROCARDS</NavLink>
          <ul className='header-nav__list'>
            <li>
              <NavLink to='learn'>Обучение</NavLink>
            </li>

            <li>
              <NavLink to='editor'>Редактор колод</NavLink>
            </li>
          </ul>
          <ul className='header-nav__buttons'>
            <li>
              <button><img src={moonIcon} alt="" /></button>
            </li>
            <li>
              <NavLink to='account'><img src={userIcon} alt="" /></NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
