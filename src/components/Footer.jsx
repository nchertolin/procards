import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='page-footer'>
            <div className='footer-wrapper'>
                <Link to='signin'>Войти в аккаунт</Link>
                <Link to=''>Поддержка</Link>
                <Link to=''>Условия</Link>
                <Link to=''>Политика конфиденциальности</Link>
            </div>
        </footer>
    )
}
