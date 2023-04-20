import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCards } from '../hooks/useDeck';
import Loading from './Loading/Loading';
import { WithAuth } from '../hoc/withAuth';
import { useGrade, useImages } from '../hooks/useCard';
import { stopPropagation } from '../util';

function Training() {
   const { deckId } = useParams();
   const { isLoading, data: { deckName, cards } } = useCards(deckId);
   const [i, setIndex] = useState(0);
   const card = cards[i];
   const { isLoading: isLoading2, images } = useImages(deckId, card);
   const [side, setSide] = useState(true);
   const [previousTimestamp, setPreviousTimestamp] = useState(Date.now() / 1000);
   const [scores] = useState([0, 0, 0, 0, 0]);
   const cardRef = useRef(null);

   const reverseCard = () => setSide(!side);

   const nextCard = () => {
      setIndex((i + 1) % cards.length);
      reverseCard();
   };

   const { isLoading: isLoading1, postGrade } = useGrade(nextCard);

   const increaseScore = grade => scores[grade - 1]++;

   const flip = (e) => {
      reverseCard();
      e.target.parentElement.classList.toggle('flipped')
   };

   const onSubmit = grade => {
      const currentTimestamp = Date.now() / 1000;
      postGrade({
         deckId,
         cardId: cards.id,
         grade,
         timeInSeconds: +(currentTimestamp - previousTimestamp).toFixed(3)
      });
      setPreviousTimestamp(currentTimestamp);
      increaseScore(grade);
      cardRef.current.classList.toggle('flipped');
   };

   const isGradeSubmitDisabled = isLoading1 || isLoading2;

   if (isLoading || isLoading2) return <Loading />

   return (
      <>
         <h1>{deckName}</h1>
         <div className='training-wrapper'>
            <ul className='training__score-list'>
               <li className='worst'>{scores[0]}</li>
               <li className='bad'>{scores[1]}</li>
               <li className='normal'>{scores[2]}</li>
               <li className='good'>{scores[3]}</li>
               <li className='best'>{scores[4]}</li>
            </ul>

            <button ref={cardRef} className='training__card'
               onClick={() => {
                  reverseCard();
                  cardRef.current.classList.toggle('flipped')
               }}>
               {
                  side ?
                     images[0]
                        ? <img className='card__image' src={images[0]} alt={card.frontSide}
                           onClick={flip} />
                        : <p className='card__text' onClick={stopPropagation}>{card.frontSide}</p>
                     : images[1]
                        ? <img className='card__image' src={images[1]} alt={card.backSide}
                           onClick={flip} />
                        : <p className='card__text' onClick={stopPropagation}>{card.backSide}</p>
               }
            </button>

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
