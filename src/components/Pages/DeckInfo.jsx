import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Loading from '../Loading/Loading';
import {useDeck} from '../../hooks/useDeck';
import {WithAuth} from '../../hoc/withAuth';
import {useRemoveDeckFromLatest} from '../../hooks/useDecks';
import {showConfirmAlert} from "../../js/utils";
import {userId} from "../../js/consts";
import Navigation from "../UI/Navigation";
import Leaderboard from "../UI/Leaderboard";
import {CardsCountStatisticLabel, PeopleStatisticLabel} from "../UI/StatisticLabels";

function DeckInfo() {
    const {deckId} = useParams();
    const {isLoading, data} = useDeck(deckId);
    const {isLoading: isLoading1, removeDeckFromLatest} = useRemoveDeckFromLatest();
    const onDelete = () => showConfirmAlert(
        'Вы действительно хотите покинуть колоду?',
        () => removeDeckFromLatest(deckId)
    );

    if (isLoading) return <Loading/>

    return (
        <div className='deck-info__wrapper'>
            <Navigation parentText='Обучение' text={data.deckName}/>
            <section className='deck-info__row deck-info__row__first'>
                <section>
                    <section className='deck-info__leaderboard__head__wrapper'>
                        <h2 className='deck-info__leaderboard__head'>Рейтинг</h2>
                        <button className='main__btn'>Посмотреть всех</button>
                    </section>
                    <Leaderboard data={data.statistics}/>
                </section>
                <section className='deck-info__owner'>
                    <h2>Автор колоды</h2>
                    <Link to={`/user/${data.ownerId}`}>
                        <img className='' src="/assets/avatars/avatar-1.svg" alt=""/>
                        <h3>{data.ownerLogin}</h3>
                    </Link>
                </section>
            </section>
            <div className='statistic-grid'>
                <PeopleStatisticLabel data={data.statistics.length}/>
                <CardsCountStatisticLabel data={data.cardsCount}/>
            </div>
            <section className='deck-info__row'>
                <h2>Описание</h2>
                <p>{data.description}</p>
            </section>
            <div className='deck-info__actions'>
                <Link className='main__btn' to='training'>Развернуть колоду</Link>
                {
                    data.ownerId !== userId &&
                    <button className='delete__btn' onClick={onDelete} disabled={isLoading1}>
                        Покинуть колоду
                    </button>
                }
            </div>
        </div>
    )
}

export default WithAuth(DeckInfo)
