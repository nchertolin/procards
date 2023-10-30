import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {IS_DARK_MODE, IS_AUTH} from '../js/consts';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';


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
                    <NavLink to=''><HomeIcon/></NavLink>
                    <NavLink to='learn'><SchoolIcon/></NavLink>
                    <NavLink to='editor'><DashboardCustomizeIcon/></NavLink>
                    <NavLink to='donate'><VolunteerActivismIcon/></NavLink>
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
