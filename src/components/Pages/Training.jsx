import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import {useCards} from '../../hooks/useDeck';
import Loading from '../Loading/Loading';
import {WithAuth} from '../../hoc/withAuth';
import {useGrade, useImages} from '../../hooks/useCard';
import TrainingCard from '../TrainingCard';
import TrainingEmpty from "../TrainingEmpty";
import Navigation from "../UI/Navigation";
import TrainingGradesList from "../UI/TrainingGradesList";

function Training() {
    const {deckId} = useParams();
    const {isLoading: isCardLoading, data, getNewCards} = useCards(deckId);
    const [index, setIndex] = useState(0);
    const card = data?.cards[index];
    const {isLoading: isImagesLoading, images} = useImages(deckId, card);
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

    const {isLoading: isGradeSending, postGrade} = useGrade(nextCard);
    const [previousTimestamp, setPreviousTimestamp] = useState(Date.now() / 1000);

    const onGradeSubmit = async (grade) => {
        const currentTimestamp = Date.now() / 1000;
        await postGrade({
            deckId,
            cardId: card?.id,
            grade,
            timeInSeconds: +(currentTimestamp - previousTimestamp).toFixed(3)
        });
        setPreviousTimestamp(currentTimestamp);
    };

    if (isCardLoading) return <Loading/>
    if (!data?.cards?.length) return <TrainingEmpty deckName={data?.deckName}/>

    return (
        <div>
            <Navigation parentText={data?.deckName} text='Тренировка'/>
            <div className='training-wrapper'>
                <TrainingCard
                    card={card}
                    images={images}
                    side={side}
                    setSide={setSide}
                />
                <TrainingGradesList
                    side={side}
                    onClick={onGradeSubmit}
                    isDisabled={isGradeSending || isImagesLoading}
                />
            </div>
        </div>
    )
}

export default WithAuth(Training);
