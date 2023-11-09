import React from 'react';
import {Link} from "react-router-dom";

function LeaderboardTitleRow() {
    return (
        <li className='leaderboard__title'>
            <h3>Ранг</h3>
            <h3 className='leader__name'>Ученик</h3>
            <h3>Очки</h3>
        </li>
    );
}

function LeaderboardLeader({place, score, userId, login}) {
    return (
        <li className='leaderboard__leader'>
            <h3>0{place}</h3>
            <Link className='leader__name__wrapper' to={`/user/${userId}`}>
                <img className='leader__avatar' src={`/assets/avatars/avatar-${place}.svg`} alt=""/>
                <p className='leader__name'>{login}</p>
            </Link>
            <h3>{score}</h3>
        </li>
    );
}

export default function Leaderboard({data}) {
    return (
        <>
            <LeaderboardTitleRow/>
            <ul className='leaderboard'>
                {
                    data.map((leader, index) =>
                        <LeaderboardLeader
                            key={leader.userId}
                            place={index + 1}
                            login={leader.login}
                            userId={leader.userId}
                            score={leader.score}
                        />
                    )
                }
            </ul>
        </>
    );
}
