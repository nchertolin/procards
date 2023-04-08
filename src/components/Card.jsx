import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FormsContext } from '../providers/FormsProvider';

export default function Card({ cardInfo }) {
   const { setCardFormOpened, setCardSelected } = useContext(FormsContext);
   const isCardsEditor = window.location.pathname.split('/')[2]
   const { name, isOwner, deckId } = cardInfo;

   const openCardForm = () => {
      setCardSelected(cardInfo);
      setCardFormOpened(true)
   };

   if (isCardsEditor) {
      return (
         <button className='card other'
            onClick={openCardForm}>
            <div className='card-wrapper'>
               <h3 className='card-editor'>{cardInfo.frontSide}</h3>
            </div>
         </button>
      );
   }

   return (
      <Link to={deckId} className={`card ${isOwner ? 'other' : ''}`}>
         <div className='card-wrapper'>
            <h3>{name}</h3>
         </div>
      </Link>
   );
}
