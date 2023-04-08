import React, { useEffect } from 'react';
import cardsIcon from '../assets/icons/cards-icon.svg';
import { v4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { LearningDeckService } from '../services/learningDecksService';
import { useState } from 'react';
import Loading from './Loading/Loading';

export default function DeckInfo() {
   const { deckId } = useParams();
   const [deck, setDeck] = useState(null);

   useEffect(() => {
      const fetchData = async () => setDeck(await LearningDeckService.getDeck(deckId));
      fetchData();
   }, [deckId]);

   if (!deck) return <Loading />

   return (
      <div className='deck-info__wrapper'>
         <h1>{deck.title}</h1>
         <h2>Таблица лидеров</h2>
         <ul className='deck-info__leaderboard'>
            {
               deck.leaders.map(({ firstName, lastName, score }) =>
                  <li key={v4()}>
                     <h2>{firstName} {lastName}</h2>
                     <p>{score} очков</p>
                  </li>
               )
            }
         </ul>
         <section className='deck-info__row'>
            <h2>Описание</h2>
            <p>{deck.description}</p>
         </section>
         <section className='deck-info__row'>
            <h2>Автор колоды</h2>
            <p>{deck.author.firstName} {deck.author.lastName}</p>
         </section>
         <div className='deck-info__cards-amount'>
            <img src={cardsIcon} alt="" />
            <section>
               <p>Количество карточек</p>
               <h4>{deck.cardsCount}</h4>
            </section>
         </div>
         <div className='deck-info__actions'>
            <Link className='start' to='training'>Развернуть колоду</Link>
            <button className='delete'>Удалить колоду</button>
         </div>
      </div>
   )
}
