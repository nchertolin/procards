import React from 'react';
import cardsIcon from './assets/icons/cards-icon.svg';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function DeckInfo({ info }) {
  const { title, leaders, description, author, amount, to } = info;
  return (
    <div className='deck-info__wrapper'>
      <h1>{title}</h1>
      <h2>Таблица лидеров</h2>
      <ul className='deck-info__leaderboard'>
        {
          leaders.map(leaderInfo =>
            <li key={v4()}>
              <h2>{leaderInfo.firstName} {leaderInfo.lastName}</h2>
              <p>{leaderInfo.score} очков</p>
            </li>
          )
        }
      </ul>
      <section className='deck-info__row'>
        <h2>Описание</h2>
        <p>{description}</p>
      </section>
      <section className='deck-info__row'>
        <h2>Автор колоды</h2>
        <p>{author.firstName} {author.lastName}</p>
      </section>
      <div className='deck-info__cards-amount'>
        <img src={cardsIcon} alt="" />
        <section>
          <p>Количество карточек</p>
          <h4>{amount}</h4>
        </section>
      </div>
      <Link className='deck-info__start' to='training'>Развернуть колоду</Link>
    </div>
  )
}
