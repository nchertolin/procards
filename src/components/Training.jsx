import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import Loading from './Loading/Loading';
import { WithAuth } from '../hoc/withAuth';
import { useGrade } from '../hooks/useCard';

function Training() {
   const { deckId } = useParams();
   const { isLoading, data } = useDeck(deckId);
   const [curentIndex, setCurrentIndex] = useState(0);
   const [card, setCard] = useState(data.cards[curentIndex]);
   const [currentSide, setCurrentSide] = useState(0);
   const [previousTimestamp, setPreviousTimestamp] = useState(Date.now() / 1000);
   const [scores] = useState([0, 0, 0, 0, 0]);
   const cardRef = useRef(null);

   const reverseCard = () => setCurrentSide(1);

   const nextCard = () => {
      setCurrentIndex(curentIndex === data.cards.length - 1 ? 0 : curentIndex + 1);
      setCard(data.cards[curentIndex])
      setCurrentSide(0);
   };

   const { isLoading: isLoading1, postGrade } = useGrade(nextCard);

   const increaseScore = grade => scores[grade - 1]++;

   const onSubmit = grade => {
      const currentTimestamp = Date.now() / 1000;
      postGrade({
         deckId,
         cardId: card.id,
         grade,
         timeInSeconds: +(currentTimestamp - previousTimestamp).toFixed(3)
      });
      setPreviousTimestamp(currentTimestamp);
      increaseScore(grade);
      cardRef.current.classList.toggle('flipped');
   };

   if (isLoading) return <Loading />

   return (
      <>
         <h1>{data.deckName}</h1>
         <div className='training-wrapper'>
            <ul className='training__score-list'>
               <li className='worst'>{scores[0]}</li>
               <li className='bad'>{scores[1]}</li>
               <li className='normal'>{scores[2]}</li>
               <li className='good'>{scores[3]}</li>
               <li className='best'>{scores[4]}</li>
            </ul>

            <button ref={cardRef} className='training__card' disabled={currentSide === 1}
               onClick={() => {
                  reverseCard();
                  cardRef.current.classList.toggle('flipped')
               }}>
               <div className='card__text'>{currentSide === 0 ? card.frontSide : card.backSide}</div>
            </button>

            <div className='training__rating'>
               {
                  currentSide === 0
                     ? <p>Нажатие на карточку перевернет ее.</p>
                     :
                     <>
                        <p>Оцените насколько хорошо вы знали содержимое.</p>
                        <ul className='training__rating__list'>
                           <li>
                              <button className='worst' disabled={isLoading1}
                                 onClick={() => onSubmit(1)}>
                                 1
                              </button>
                           </li>
                           <li>
                              <button className='bad' disabled={isLoading1}
                                 onClick={() => onSubmit(2)}>
                                 2
                              </button>
                           </li>
                           <li>
                              <button className='normal' disabled={isLoading1}
                                 onClick={() => onSubmit(3)}>
                                 3
                              </button>
                           </li>
                           <li>
                              <button className='good' disabled={isLoading1}
                                 onClick={() => onSubmit(4)}>
                                 4
                              </button>
                           </li>
                           <li>
                              <button className='best' disabled={isLoading1}
                                 onClick={() => onSubmit(5)}>
                                 5
                              </button>
                           </li>
                        </ul>
                     </>
               }
            </div>
         </div>
      </>
   )
}

export default WithAuth(Training);
