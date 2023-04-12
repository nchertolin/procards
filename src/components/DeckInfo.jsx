import React from 'react';
import cardsIcon from '../assets/icons/cards-icon.svg';
import { v4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading/Loading';
import { useDeck } from '../hooks/useDeck';
import { WithAuth } from '../hoc/withAuth';
import { useRemoveDeckFromLatest } from '../hooks/useDecks';
import { useUserStatistic } from '../hooks/useUser';

function DeckInfo() {
   const { deckId } = useParams();
   const { isLoading, data } = useDeck(deckId);
   const { isLoading: isLoading2, data: user } = useUserStatistic(data.ownerId);
   const { isLoading: isLoading1, removeDeckFromLatest } = useRemoveDeckFromLatest();


   const onDelete = () => removeDeckFromLatest(deckId);

   if (isLoading || isLoading2) return <Loading />

   return (
      <div className='deck-info__wrapper'>
         <h1>{data.name}</h1>
         <h2>Таблица лидеров</h2>
         <ul className='deck-info__leaderboard'>
            {
               data.statistics.map(({ userId, login, score }) =>
                  <li key={v4()}>
                     <Link className='leader__name' to={`/user/${userId}`}>@{login}</Link>
                     <p>{score} очков</p>
                  </li>
               )
            }
         </ul>
         <section className='deck-info__row'>
            <h2>Описание</h2>
            <p>{data.description}</p>
         </section>
         <section className='deck-info__row'>
            <h2>Автор колоды</h2>
            <Link to={`/user/${data.ownerId}`}>@{user.login}</Link>
         </section>
         <div className='deck-info__cards-amount'>
            <img src={cardsIcon} alt="" />
            <section>
               <p>Количество карточек</p>
               <h4>{data.cardsCount}</h4>
            </section>
         </div>
         <div className='deck-info__actions'>
            <Link className='start' to='training'>Развернуть колоду</Link>
            <button className='delete' disabled={isLoading1}
               onClick={onDelete}>
               Удалить колоду
            </button>
         </div>
      </div>
   )
}

export default WithAuth(DeckInfo)