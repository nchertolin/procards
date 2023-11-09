import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {IS_DARK_MODE, IS_AUTH} from '../js/consts';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';


export default function Header() {
    const [isDarkTheme, setDarkTheme] = useState(IS_DARK_MODE);
    const switchTheme = () => {
        localStorage.setItem('dark-theme', isDarkTheme ? 'false' : 'true')
        document.body.classList.toggle('dark');
        setDarkTheme(!isDarkTheme);
    };

    return (
        <header className='page-header'>
            <div className='header-nav'>
                <nav className='header-nav__list'>
                    <NavLink to=''>
                        <HomeRoundedIcon/>
                        <p>Главная</p>
                    </NavLink>
                    <NavLink to='learn'>
                        <SchoolRoundedIcon/>
                        <p>Обучение</p>
                    </NavLink>
                    <NavLink to='editor'>
                        <DashboardCustomizeRoundedIcon/>
                        <p>Редактор</p>
                    </NavLink>
                    <NavLink to='donate'>
                        <VolunteerActivismRoundedIcon/>
                        <p>Поддержать</p>
                    </NavLink>
                </nav>
                <div className='header-nav__buttons'>
                    {
                        IS_AUTH ?
                            <>
                                <button onClick={switchTheme}>
                                    {isDarkTheme ? <LightModeIcon/> : <DarkModeIcon/>}
                                </button>
                                <NavLink to='account'><PersonIcon/></NavLink>
                            </>
                            : <NavLink to='signin' id='header-nav__buttons__signin'>
                                <p>Войти</p>
                                <LoginIcon/>
                            </NavLink>
                    }

                </div>
            </div>
        </header>
    )
}
