import React from 'react';
import video from '../assets/videos/hero.mp4';
import { useGlobalStatistics } from '../hooks/useGlobalStatistics';
import Loading from './Loading/Loading';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function Main() {
   const { isLoading, data } = useGlobalStatistics();

   if (isLoading) return <Loading />

   return (
      <>
         <div id='video__wrapper'>
            <section id='main__hero'>
               <div>
                  <h1>ЦИФРОВОЙ ОБРАЗОВАТЕЛЬНЫЙ СЕРВИС ДЛЯ ШКОЛЬНИКОВ И ПРЕПОДАВАТЕЛЕЙ</h1>
                  <p>Сервис для быстрого создания карточек, которые помогут запомнить любой материал.</p>
               </div>
            </section>
            <video id='video' src={video} playsInline autoPlay loop muted />
         </div>
         <section id='main__leaders__wrapper'>
            <h2>Лучшие ученики</h2>
            <ul>
               {data.map(leader =>
                  <li key={v4()}>
                     <Link to={`user/${leader.userId}`} className='leader__name'>@{leader.login}</Link>
                     <p>{leader.score} очков</p>
                  </li>
               )}
            </ul>
         </section>
         <section id='main__about'>
            <h2>КАК ЭТО РАБОТАЕТ?</h2>
            <div>
               <p>Преподаватель или же сам студент создает карточки для интервального повторения
                  содержимого.</p>
               <p>Созданные карточки для запоминания отображается в разделе “ОБУЧЕНИЕ”</p>
            </div>
         </section>
      </>
   )
}
