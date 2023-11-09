import React from 'react';
import {Link} from 'react-router-dom';
import {WithAuth} from '../../hoc/withAuth';
import {AuthService} from '../../services/authService';
import {useUser} from '../../hooks/useUser';
import Loading from '../Loading/Loading';
import Navigation from "../UI/Navigation";
import {
    CardsCreatedStatisticLabel,
    CardsViewedStatisticLabel,
    HoursStatisticLabel,
    ScoreStatisticLabel
} from "../UI/StatisticLabels";


function Account() {
    const {isLoading, data: user} = useUser();

    if (isLoading) return <Loading/>

    return (
        <div className='account__wrapper'>
            <Navigation parentText='Ваш профиль'/>

            <div className='account__info'>
                <img className='avatar'
                     src={`/assets/avatars/avatar-${user?.avatarNumber ?? 8}.svg`}
                     alt='аватар'
                />
                <div>
                    <h1 id='account__name'>{user?.firstName} <br/>{user?.lastName}</h1>
                    <h3 id='account__login'>@{user?.login}, {user?.location}</h3>
                </div>
            </div>
            <div className='statistic-grid'>
                <CardsViewedStatisticLabel data={user?.cardsViewed}/>
                <ScoreStatisticLabel data={user?.score}/>
                <HoursStatisticLabel data={user?.hours.toFixed(0)}/>
                <CardsCreatedStatisticLabel data={user?.cardsCreated}/>
            </div>
            <div className='account__actions'>
                <Link className='main__btn' to='edit'>Редактировать</Link>
                <button className='delete__btn' onClick={() => AuthService.logout()}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

export default WithAuth(Account)
