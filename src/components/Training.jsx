import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import Loading from './Loading/Loading';
import { WithAuth } from '../hoc/withAuth';

function Training() {
   const { deckId } = useParams();
   const { isLoading, data } = useDeck(deckId);
   const [curentIndex, setCurrentIndex] = useState(0);
   const [card, setCard] = useState(data.cards[curentIndex]);
   const [currentSide, setCurrentSide] = useState(0);

   const reverseCard = () => {
      if (currentSide === 0) {
         setCurrentSide(1);
      }
   };

   const nextCard = () => {
      if (curentIndex !== data.cards.length - 1) {
         setCurrentIndex(curentIndex + 1);
      } else {
         setCurrentIndex(0);
      }
      setCard(data.cards[curentIndex])
      setCurrentSide(0);
   }

   if (isLoading) return <Loading />

   return (
      <>
         <h1>{data.name}</h1>
         <div className='training-wrapper'>
            <ul className='training__score-list'>
               <li className='worst'>1</li>
               <li className='bad'>2</li>
               <li className='normal'>3</li>
               <li className='good'>4</li>
               <li className='best'>5</li>
            </ul>

            <button className='training__card' disabled={currentSide === 1}
               onClick={reverseCard}>
               <span>{currentSide === 0
                  ? card.frontSide
                  : card.backSide}</span>
            </button>

            <div className='training__rating'>
               {
                  currentSide === 0
                     ? <p>Нажатие на карточку перевернет ее.</p>
                     : <ul className='training__rating__list'>
                        <li><button className='worst' onClick={nextCard}>1</button></li>
                        <li><button className='bad' onClick={nextCard}>2</button></li>
                        <li><button className='normal' onClick={nextCard}>3</button></li>
                        <li><button className='good' onClick={nextCard}>4</button></li>
                        <li><button className='best' onClick={nextCard}>5</button></li>
                     </ul>
               }
            </div>
         </div>
      </>
   )
}

export default WithAuth(Training);
