import React from 'react';
import logo from '../assets/images/logo.svg';
import {NavLink} from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className='page-footer'>
            <div className='footer__wrapper'>
                <div className='footer__row'>
                    <section className='footer__logo__wrapper footer__column'>
                        <img src={logo} alt=""/>
                        <h2>PROCARDS</h2>
                        <p>Cделаем ваше обучение эффективным.</p>
                    </section>
                    <div className='footer__row'>
                        <section className='footer__column'>
                            <h3>Тех. поддержка</h3>
                            <a href="mailto:procardsoff@gmail.com">procardsoff@gmail.com</a>
                        </section>
                        <section className='footer__column'>
                            <h3>Документы</h3>
                            <NavLink to=''>Пользовательское соглашение</NavLink>
                            <NavLink to=''>Политика конфиденциальности</NavLink>
                            <NavLink to=''>Cookie политика</NavLink>
                        </section>
                    </div>
                </div>
                <div className='footer__copyright__wrapper'>
                    <p>@{year} Procards. Сервис не несет ответственности за материалы, размещаемые
                        пользователями.</p>
                </div>
            </div>
        </footer>
    );
}
