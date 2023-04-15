import React from 'react';
import cardsIcon from '../assets/icons/cards-icon.svg';
import ratingIcon from '../assets/icons/rating-icon.svg';
import decksIcon from '../assets/icons/decks-icon.svg';
import hoursIcon from '../assets/icons/hours-icon.svg';
import { Link } from 'react-router-dom';
import { WithAuth } from '../hoc/withAuth';
import { AuthService } from '../services/authService';
import { useUser } from '../hooks/useUser';
import Loading from './Loading/Loading';

function Account() {
   const { isLoading, data: user } = useUser();

   if (isLoading) return <Loading />

   return (
      <div className='account__wrapper'>
         <div className='account__info'>
            <h1 id='account__name'>{user.firstName} {user.lastName}</h1>
            <h3>@{user.login}</h3>
            <p>{user.location}</p>
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
         <div className='account__actions'>
            <Link className='edit' to='edit'>Редактровать профиль</Link>
            <button className='logout' to='edit'
               onClick={() => AuthService.logout()}>Выйти</button>
         </div>
      </div>
   )
}
export default WithAuth(Account)
