import React from 'react';
import {useParams} from 'react-router-dom';
import {useUserStatistic} from '../../hooks/useUser';
import Loading from '../Loading/Loading';
import {WithAuth} from '../../hoc/withAuth';
import Navigation from "../UI/Navigation";
import {
    CardsCreatedStatisticLabel,
    CardsViewedStatisticLabel,
    HoursStatisticLabel,
    ScoreStatisticLabel
} from "../UI/StatisticLabels";

function User() {
    const {userId} = useParams();
    const {isLoading, data: user} = useUserStatistic(userId);

    if (isLoading) return <Loading/>

    if (!user) return (
        <p>Пользователь не найден.</p>
    )

    return (
        <div className='account__wrapper'>
            <Navigation parentText='Профиль пользователя'/>
            <div className='account__info'>
                <h1 id='account__name'>@{user?.login}</h1>
                <p>{user?.location}</p>
            </div>
            <div className='statistic-grid'>
                <CardsViewedStatisticLabel data={user?.cardsViewed}/>
                <ScoreStatisticLabel data={user?.score}/>
                <CardsCreatedStatisticLabel data={user?.cardsCreated}/>
                <HoursStatisticLabel data={user?.hours.toFixed(2)}/>
            </div>
        </div>
    )
}

export default WithAuth(User);
