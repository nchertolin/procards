import React from 'react';
import { NavLink } from 'react-router-dom';
import moonIcon from '../assets/icons/moon-icon.svg'
import userIcon from '../assets/icons/user-icon.svg'
import { isAuth } from '../util';


export default function Header() {
  return (
    <header className='page-header'>
      <div className='header-wrapper'>
        <nav className='header-nav'>
          <NavLink className='header-logo' to=''>PROCARDS</NavLink>
          {isAuth &&
            <ul className='header-nav__list'>
              <li>
                <NavLink to='learn'>Обучение</NavLink>
              </li>

              <li>
                <NavLink to='editor'>Редактор колод</NavLink>
              </li>
            </ul>
          }
          <div className='header-nav__buttons'>
            <button><img src={moonIcon} alt="" /></button>
            <NavLink to={`${isAuth ? 'account' : 'signin'}`}><img src={userIcon} alt="" /></NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
