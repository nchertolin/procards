import React, {useState} from 'react';
import image from '../../assets/images/hero.jpg';
import {useGlobalStatistics} from '../../hooks/useGlobalStatistics';
import Loading from '../Loading/Loading';
import Leaderboard from "../UI/Leaderboard";
import TrainingCard from "../TrainingCard";
import TrainingGradesList from "../UI/TrainingGradesList";
import {Link} from "react-router-dom";
import {CardWithoutLink} from "../Card";

export default function Main() {
    const {isLoading, data} = useGlobalStatistics();
    const [side, setSide] = useState(true);
    const card = {
        frontSide: 'Столица Российской Федерации',
        backSide: 'Москва'
    };
    const doNothing = () => {
    };

    if (isLoading) return <Loading/>

    return (
        <>
            <div id='image__wrapper'>
                <section id='main__hero'>
                    <h1>Procards</h1>
                    <p>Сервис для быстрого создания карточек, которые помогут запомнить любой материал.</p>
                </section>
                <img id='image' src={image} alt=''/>
            </div>
            <section id='main__wrapper'>
                <section className='main__info'>
                    <section className='main__info__text-block'>
                        <h2>Запоминай любой материал с помощью цифровых карточек</h2>
                        <p>
                            Исследования показывают, что самопроверка с помощью карточек более эффективна, чем
                            перечитывание
                            конспектов.
                        </p>
                        <Link to='editor' className='main__btn'>Создать карточки</Link>
                    </section>
                    <TrainingCard
                        card={card}
                        side={side}
                        setSide={setSide}
                        images={[null, null]}
                    />
                </section>
                <section className='main__info'>
                    <TrainingGradesList onClick={doNothing}/>
                    <section className='main__info__text-block'>
                        <h2>Система Лейтнера</h2>
                        <p>
                            Когда приходит время повторения, алгоритм автоматически предлагает вам карточки для
                            повторения на основе ваших оценок. Таким образом, вы активно повторяете материал, который
                            был
                            наиболее трудным для вас, и более редко повторяете материал, который вы уже хорошо знаете.
                        </p>
                    </section>
                </section>
                <section className='main__info'>
                    <section className='main__info__text-block'>
                        <h2>Делись своими и добавляй другие</h2>
                        <p>
                            Ты можешь создать публичную колоду и пригласить в нее других пользователей.
                            Также у тебя есть возможность добавить к себе колоду пользователя
                        </p>
                    </section>
                    <ul>
                        <CardWithoutLink deckName='Английский язык' isOwner={false}/>
                        <CardWithoutLink deckName='География' isOwner={true}/>
                    </ul>
                </section>
                <section id='main__leaders__wrapper'>
                    <h2>Лучшие ученики</h2>
                    <Leaderboard data={data}/>
                </section>
            </section>
        </>
    )
}
