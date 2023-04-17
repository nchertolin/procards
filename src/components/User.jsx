import React from 'react';
import cardsIcon from '../assets/icons/cards-icon.svg';
import ratingIcon from '../assets/icons/rating-icon.svg';
import decksIcon from '../assets/icons/decks-icon.svg';
import hoursIcon from '../assets/icons/hours-icon.svg';
import { useParams } from 'react-router-dom';
import { useUserStatistic } from '../hooks/useUser';
import Loading from './Loading/Loading';
import { WithAuth } from '../hoc/withAuth';

function User() {
   const userId = useParams();
   const { isLoading, data: user } = useUserStatistic(userId);

   if (isLoading) return <Loading />

   return (
      <div className='account__wrapper'>
         <div className='account__info'>
            <h1 id='account__name'>@{user.login}</h1>
            <h3>{user.location}</h3>
         </div>
         <ul className='account-stat'>
            <li>
               <img src={cardsIcon} alt="" />
               <section>
                  <p>Карточек просмотрено</p>
                  <h4>{user.cardsViewed}</h4>
               </section>
            </li>
            <li>
               <img src={ratingIcon} alt="" />
               <section>
                  <p>Рейтинг</p>
                  <h4>{user.score}</h4>
               </section>
            </li>
            <li>
               <img src={decksIcon} alt="" />
               <section>
                  <p>Карточек создано</p>
                  <h4>{user.cardsCreated}</h4>
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
      </div>
   )
}
export default WithAuth(User);
