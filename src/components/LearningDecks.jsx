import React, { useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import Loading from './Loading/Loading';
import { useLearningDecks } from '../hooks/useLearningDecks';


export default function CardList() {
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useLearningDecks(searchQuery);

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>Выберите колоду</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
            <img src={searchIcon} alt="" />
         </div>
         <ul>
            {data.map(info => <li key={v4()}><Card cardInfo={info} /></li>)}
         </ul>
      </div>
   )
}