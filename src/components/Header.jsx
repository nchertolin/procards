import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {IS_DARK_THEME, isAuth} from '../util';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


export default function Header() {
    const [isDarkTheme, setDarkTheme] = useState(IS_DARK_THEME);
    const switchTheme = () => {
        localStorage.setItem('dark-theme', isDarkTheme ? 'false' : 'true')
        document.body.classList.toggle('dark');
        setDarkTheme(!isDarkTheme);
    };

    return (
        <header className='page-header'>
            <div className='header-wrapper'>
                <div className='header-nav'>
                    <nav className='header-nav__list'>
                        <NavLink to=''>Главная</NavLink>
                        {
                            isAuth &&
                            <>
                                <NavLink to='learn'>Обучение</NavLink>
                                <NavLink to='editor'>Редактор</NavLink>
                                <NavLink to='donate'>Поддержать проект</NavLink>
                            </>
                        }
                    </nav>
                    <div className='header-nav__buttons'>
                        <button onClick={switchTheme}>
                            {isDarkTheme ? <LightModeIcon/> : <DarkModeIcon/>}
                        </button>
                        <NavLink to={`${isAuth ? 'account' : 'signin'}`}>
                            <PersonIcon/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}
