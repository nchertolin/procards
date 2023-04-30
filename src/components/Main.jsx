import React from 'react';
import video from '../assets/hero.jpg';
import {useGlobalStatistics} from '../hooks/useGlobalStatistics';
import Loading from './Loading/Loading';
import {Link} from 'react-router-dom';

export default function Main() {
    const {isLoading, data} = useGlobalStatistics();

    if (isLoading) return <Loading/>

    return (
        <>
            <div id='image__wrapper'>
                <section id='main__hero'>
                    <h1>ЦИФРОВОЙ ОБРАЗОВАТЕЛЬНЫЙ СЕРВИС ДЛЯ ШКОЛЬНИКОВ И ПРЕПОДАВАТЕЛЕЙ</h1>
                    <p>Сервис для быстрого создания карточек, которые помогут запомнить любой материал.</p>
                </section>
                <img id='image' src={video} alt=''/>
            </div>
            <section id='main__leaders__wrapper'>
                <h2>Лучшие ученики</h2>
                <ul className='main__leaders__list'>
                    {data.map((leader, index) =>
                        <li key={leader.userId}>
                            <div>
                                <h3>{index + 1}</h3>
                                <Link to={`user/${leader.userId}`}>@{leader.login}</Link>
                            </div>
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
