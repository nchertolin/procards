import React from 'react';
import {Link} from "react-router-dom";

function LeaderboardLeader({place, score, userId, login}) {
    return (
        <li className='leaderboard__leader'>
            <div>
                <h3>{place}</h3>
                <Link className='leader__name' to={`/user/${userId}`}>@{login}</Link>
            </div>
            <p>{score} очков</p>
        </li>
    );
}

export default function Leaderboard({data}) {
    return (
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
    );
}
