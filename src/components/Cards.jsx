import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import Loading from './Loading/Loading';
import { useParams } from 'react-router-dom';
import { FormsContext } from '../providers/FormsProvider';
import { useEditorDeck } from '../hooks/useEditorDeck';
import { WithAuth } from '../hoc/withAuth';
import Pagination from './Pagination';
import { getPagesAmount } from '../util';


function Cards() {
   const { deckId } = useParams();
   const { setAddCardFormOpened } = useContext(FormsContext);
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useEditorDeck(deckId, searchQuery);
   const [page, setPage] = useState(1);

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>{data.deckName}</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1)
               }} />
            <img src={searchIcon} alt="" />
         </div>
         <div className='cards-list__wrapper'>
            <ul>
               <li>
                  <button className='card' onClick={() => setAddCardFormOpened(true)}>
                     <h3>+</h3>
                  </button>
               </li>
               {data.cards.slice(19 * page - 19, 19 * page).map(content => <Card key={v4()} content={content} isCardsEditor={true} />)}
            </ul>
         </div>
         <Pagination page={page} setPage={setPage} amount={getPagesAmount(data.cards.length, 19)} />
      </div>
   )
}

export default WithAuth(Cards);
