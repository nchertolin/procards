import React, { useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import Loading from './Loading/Loading';
import { useDecks } from '../hooks/useDecks';
import { WithAuth } from '../hoc/withAuth';
import Pagination from './Pagination';
import { getPagesAmount } from '../util';



function Decks() {
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useDecks(searchQuery);
   const [page, setPage] = useState(1);

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>Выберите колоду</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
            <img src={searchIcon} alt="" />
         </div>
         <div className='cards-list__wrapper'>
            <ul>
               {data.slice(20 * page - 20, 20 * page).map(content => <Card key={v4()} content={content} />)}
            </ul>
         </div>
         <Pagination page={page} setPage={setPage} amount={getPagesAmount(data.length)} />
      </div>
   )
}
export default WithAuth(Decks);