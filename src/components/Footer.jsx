import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='page-footer'>
      <div className='footer-wrapper'>
        <ul>
          <li>
            <Link to=''>О нас</Link>
          </li>
          <li>
            <Link to=''>Поддержка</Link>
          </li>
          <li>
            <Link to=''>Условия</Link>
          </li>
          <li>
            <Link to=''>Политика конфиденциальности</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
