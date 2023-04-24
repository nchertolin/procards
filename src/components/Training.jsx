import React, {useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useCards} from '../hooks/useDeck';
import Loading from './Loading/Loading';
import {WithAuth} from '../hoc/withAuth';
import {useGrade, useImages} from '../hooks/useCard';
import TrainingCard from './TrainingCard';
import TrainingEmpty from "./TrainingEmpty";

function Training() {
    const {deckId} = useParams();
    const {isLoading, data, getNewCards} = useCards(deckId);
    const [index, setIndex] = useState(0);
    const card = data?.cards[index];
    const {isLoading: isLoading2, images} = useImages(deckId, card);
    const [side, setSide] = useState(true);
    const [scores, setScores] = useState([0, 0, 0, 0, 0]);
    const nextCard = () => {
        setSide(!side);
        if (index === data?.cards?.length - 1) {
            getNewCards();
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const {isLoading: isLoading1, postGrade} = useGrade(nextCard);
    const isGradeSubmitDisabled = isLoading1 || isLoading2;
    const [previousTimestamp, setPreviousTimestamp] = useState(Date.now() / 1000);
    const cardRef = useRef();
    const increaseScore = grade => setScores(prev => {
        const newScores = [...prev];
        newScores[grade - 1] += 1;
        return newScores;
    });

    const onSubmit = grade => {
        const currentTimestamp = Date.now() / 1000;
        postGrade({
            deckId,
            cardId: card?.id,
            grade,
            timeInSeconds: +(currentTimestamp - previousTimestamp).toFixed(3)
        });
        setPreviousTimestamp(currentTimestamp);
        increaseScore(grade);
        cardRef.current.classList.toggle('flipped');
    };

    if (isLoading || isLoading2) return <Loading/>
    if (!data?.cards?.length) return <TrainingEmpty deckId={deckId}/>

    return (
        <>
            <h1>{data?.deckName}</h1>
            <div className='training-wrapper'>
                <ul className='training__score-list'>
                    <li className='worst'>{scores[0]}</li>
                    <li className='bad'>{scores[1]}</li>
                    <li className='normal'>{scores[2]}</li>
                    <li className='good'>{scores[3]}</li>
                    <li className='best'>{scores[4]}</li>
                </ul>

                <TrainingCard
                    cardRef={cardRef}
                    card={card}
                    images={images}
                    side={side}
                    setSide={setSide}
                />

                <div className='training__rating'>
                    {
                        side
                            ? <p>Нажатие на карточку перевернет ее.</p>
                            : <>
                                <p>Оцените насколько хорошо вы знали содержимое.</p>
                                <div className='training__rating__list'>

                                    <button className='worst' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(1)}>1
                                    </button>

                                    <button className='bad' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(2)}>2
                                    </button>

                                    <button className='normal' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(3)}>3
                                    </button>

                                    <button className='good' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(4)}>4
                                    </button>

                                    <button className='best' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(5)}>5
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default WithAuth(Training);
