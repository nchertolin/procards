import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import cardsIcon from '../assets/icons/cards-icon.svg';
import ratingIcon from '../assets/icons/rating-icon.svg';
import decksIcon from '../assets/icons/decks-icon.svg';
import hoursIcon from '../assets/icons/hours-icon.svg';
import { Link } from 'react-router-dom';
import { WithAuth } from '../HOC/WithAuth';

function Account() {
  const { user } = useContext(AuthContext);

  return (
    user.id &&
    <div className='account-wrapper'>
      <h1 id='account__name'>{user.firstName} {user.lastName}</h1>
      <p id='account__location'>г. {user.location}</p>
      <ul className='account-stat'>
        <li>
          <img src={cardsIcon} alt="" />
          <section>
            <p>Карточек просмотрено</p>
            <h4>1000</h4>
          </section>
        </li>
        <li>
          <img src={ratingIcon} alt="" />
          <section>
            <p>Рейтинг</p>
            <h4>1000</h4>
          </section>
        </li>
        <li>
          <img src={decksIcon} alt="" />
          <section>
            <p>Колод создано</p>
            <h4>1000</h4>
          </section>
        </li>
        <li>
          <img src={hoursIcon} alt="" />
          <section>
            <p>Часов за учебой</p>
            <h4>1000</h4>
          </section>
        </li>
      </ul>
      <div className='account__actions'>
        <Link className='edit' to='edit'>Редактровать профиль</Link>
        <button className='logout' to='edit'>Выйти</button>
      </div>
    </div>
  )
}

export default WithAuth(Account);
