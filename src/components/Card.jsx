import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { FormsContext } from '../providers/FormsProvider';
import settingsIcon from '../assets/icons/settings-icon.svg';

export default function Card({ content, isDecksEditor, isCardsEditor }) {
   const { setCardFormOpened, setCardSelected, setDeckSelected,
      setEditFormOpened } = useContext(FormsContext);
   const [isSettingVisible, setSettingsVisible] = useState();
   const { name, isOwner, deckId } = content;

   const openCardForm = () => {
      setCardSelected(content);
      setCardFormOpened(true)
   };

   const openEditDeckForm = () => {
      setDeckSelected(content);
      setEditFormOpened(true);
   }

   if (isCardsEditor) {
      return (
         <li>
            <button className='card'
               onClick={openCardForm}>
               <div className='card-wrapper'>
                  <h3 className='card-editor'>{content.frontSide}</h3>
               </div>
            </button>
         </li>
      );
   }

   if (isDecksEditor) {
      return (
         <li className='editor'
            onMouseEnter={() => setSettingsVisible(true)}
            onMouseLeave={() => setSettingsVisible(false)}>
            {
               isSettingVisible &&
               <button className='card-settings' onClick={openEditDeckForm}>
                  <img src={settingsIcon} alt="" />
               </button>
            }
            <Link to={deckId} className='card'>
               <div className='card-wrapper'>
                  <h3>{name}</h3>
               </div>
            </Link>
         </li>
      );
   }

   return (
      <li>
         <Link to={deckId} className={`card ${isOwner ? 'other' : ''}`}>
            <div className='card-wrapper'>
               <h3>{name}</h3>
            </div>
         </Link>
      </li>
   );
}
