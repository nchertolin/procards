import React, { useContext } from 'react'
import { AuthContext } from './context';
import cardsIcon from './assets/icons/cards-icon.svg';
import ratingIcon from './assets/icons/rating-icon.svg';
import decksIcon from './assets/icons/decks-icon.svg';
import hoursIcon from './assets/icons/hours-icon.svg';
import { Link } from 'react-router-dom';

export default function Account() {
  const { user } = useContext(AuthContext);

  return (
    <div className='account-wrapper'>
      <h1>{user.firstName} {user.lastName}</h1>
      <ul className='account-stat'>
        <li>
          <img src={cardsIcon} alt="" />
          <section>
            <p>Карточек просмотрено</p>
            <h4>{user.cardsAmount}</h4>
          </section>
        </li>
        <li>
          <img src={ratingIcon} alt="" />
          <section>
            <p>Рейтинг</p>
            <h4>{user.rating}</h4>
          </section>
        </li>
        <li>
          <img src={decksIcon} alt="" />
          <section>
            <p>Колод создано</p>
            <h4>{user.decksAmount}</h4>
          </section>
        </li>
        <li>
          <img src={hoursIcon} alt="" />
          <section>
            <p>Часов за учебой</p>
            <h4>{user.hours}</h4>
          </section>
        </li>
      </ul>
      <Link className='account-edit-button' to='edit'>Редактровать профиль</Link>
    </div>
  )
}
