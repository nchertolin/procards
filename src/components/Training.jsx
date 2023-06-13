import React, {useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useCards} from '../hooks/useDeck';
import Loading from './Loading/Loading';
import {WithAuth} from '../hoc/withAuth';
import {useGrade, useImages} from '../hooks/useCard';
import TrainingCard from './TrainingCard';
import TrainingEmpty from "./TrainingEmpty";
import HeadText from "./HeadText";

function Training() {
    const {deckId} = useParams();
    const {isLoading, data, getNewCards} = useCards(deckId);
    const [index, setIndex] = useState(0);
    const card = data?.cards[index];
    const {isLoading: isLoading2, images} = useImages(deckId, card);
    const [side, setSide] = useState(true);
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

    const onSubmit = grade => {
        const currentTimestamp = Date.now() / 1000;
        postGrade({
            deckId,
            cardId: card?.id,
            grade,
            timeInSeconds: +(currentTimestamp - previousTimestamp).toFixed(3)
        });
        setPreviousTimestamp(currentTimestamp);
        cardRef.current.classList.toggle('flipped');
    };

    if (isLoading || isLoading2) return <Loading/>
    if (!data?.cards?.length) return <TrainingEmpty deckName={data?.deckName}/>

    return (
        <div>
            <HeadText parentText={data?.deckName} text='Тренировка'/>

            <div className='training-wrapper'>

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
                                <p>Оцените, насколько хорошо вы знали ответ.</p>
                                <div className='training__rating__list'>
                                    <button className='pagination__button' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(1)}>1
                                    </button>

                                    <button className='pagination__button' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(2)}>2
                                    </button>

                                    <button className='pagination__button' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(3)}>3
                                    </button>

                                    <button className='pagination__button' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(4)}>4
                                    </button>

                                    <button className='pagination__button' disabled={isGradeSubmitDisabled}
                                            onClick={() => onSubmit(5)}>5
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default WithAuth(Training);
