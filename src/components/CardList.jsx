import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import { LearningDeckService } from '../services/learningDecksService';
import { useEffect } from 'react';
import Loading from './Loading/Loading';
import { useParams } from 'react-router-dom';
import { FormsContext } from '../providers/FormsProvider';
import { useEditorCards } from '../hooks/useEditorCards';


export default function CardList() {
   const { deckId } = useParams();
   const { setCardFormOpened } = useContext(FormsContext);
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useEditorCards(deckId, searchQuery);
   const [deckName, setDeckName] = useState();

   useEffect(() => {
      const getDeckName = async () => setDeckName((await LearningDeckService.getDeck(deckId)).name);
      getDeckName();
   }, [deckId]);

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>{deckName}</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
            <img src={searchIcon} alt="" />
         </div>
         <ul>
            <li>
               <button className='card' onClick={() => setCardFormOpened(true)}>
                  <h3>+</h3>
               </button>
            </li>
            {data.map(info =>
               <li key={v4()}><Card cardInfo={info} /></li>)}
         </ul>
      </div>
   )
}