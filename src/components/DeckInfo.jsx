import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Loading from './Loading/Loading';
import {useDeck} from '../hooks/useDeck';
import {WithAuth} from '../hoc/withAuth';
import {useRemoveDeckFromLatest} from '../hooks/useDecks';
import {userId} from "../util";
import {confirmAlert} from "react-confirm-alert";
import HeadText from "./HeadText";

function DeckInfo() {
    const {deckId} = useParams();
    const {isLoading, data} = useDeck(deckId);
    const {isLoading: isLoading1, removeDeckFromLatest} = useRemoveDeckFromLatest();

    const onDelete = () => confirmAlert({
        title: 'Подтвердите действие',
        message: 'Вы действительно хотите покинуть колоду?',
        buttons: [
            {label: 'Да', onClick: () => removeDeckFromLatest(deckId)},
            {label: 'Отмена'}
        ]
    });

    if (isLoading) return <Loading/>

    return (
        <div className='deck-info__wrapper'>
            <HeadText parentText='Обучение' text={data.deckName}/>
            <h2 className='deck-info__leaderboard__head'>Таблица лидеров</h2>
            <ul className='leaderboard'>
                {
                    data.statistics.map(({userId, login, score}, index) =>
                        <li key={userId} className='leaderboard__leader'>
                            <div>
                                <h3>{index + 1}</h3>
                                <Link className='leader__name' to={`/user/${userId}`}>@{login}</Link>
                            </div>
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
                <Link to={`/user/${data.ownerId}`}>@{data.ownerLogin}</Link>
            </section>
            <div className='deck-info__cards-amount'>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.9583 13.125V4.375H30.625V13.125H18.9583ZM4.375 18.9583V4.375H16.0417V18.9583H4.375ZM18.9583 30.625V16.0417H30.625V30.625H18.9583ZM4.375 30.625V21.875H16.0417V30.625H4.375ZM7.29167 16.0417H13.125V7.29167H7.29167V16.0417ZM21.875 27.7083H27.7083V18.9583H21.875V27.7083ZM21.875 10.2083H27.7083V7.29167H21.875V10.2083ZM7.29167 27.7083H13.125V24.7917H7.29167V27.7083Z"/>
                </svg>
                <section>
                    <p>Количество карточек</p>
                    <h4>{data.cardsCount}</h4>
                </section>
            </div>
            <div className='deck-info__actions'>
                <Link className='main__btn' to='training'>Развернуть колоду</Link>
                {data.ownerId !== userId &&
                    <button className='delete__btn' disabled={isLoading1} onClick={onDelete}>
                        Покинуть колоду
                    </button>}
            </div>
        </div>
    )
}

export default WithAuth(DeckInfo)
