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
                <img className='avatar'
                     src={`/assets/avatars/avatar-${user?.avatarNumber ?? 8}.svg`}
                     alt='аватар'
                />
                <div>
                    <h1 id='account__name'>@{user?.login}</h1>
                    <p>{user?.location}</p>
                </div>

            </div>
            <div className='statistic-grid'>
                <CardsViewedStatisticLabel data={user?.cardsViewed}/>
                <ScoreStatisticLabel data={user?.score}/>
                <HoursStatisticLabel data={user?.hours.toFixed(0)}/>
                <CardsCreatedStatisticLabel data={user?.cardsCreated}/>
            </div>
        </div>
    )
}

export default WithAuth(User);
