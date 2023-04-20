import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import Loading from './Loading/Loading';
import { FormsContext } from '../providers/FormsProvider';
import { useEditorDecks } from '../hooks/useEditorDecks';
import { WithAuth } from '../hoc/withAuth';
import Pagination from './Pagination';
import { getPagesAmount } from '../util';


function EditorDecks() {
   const { setAddFormOpened } = useContext(FormsContext);
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useEditorDecks(searchQuery);
   const [page, setPage] = useState(1);

   const openAddForm = () => setAddFormOpened(true);

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>Редактор колод</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
               }} />
            <img src={searchIcon} alt="" />
         </div>
         <div className='cards-list__wrapper'>
            <ul>
               <li>
                  <button className='card' onClick={openAddForm}>
                     <h3>+</h3>
                  </button>
               </li>
               {data.slice(19 * page - 19, 19 * page).map(content => <Card key={v4()} content={content} isDecksEditor={true} />)}
            </ul>
         </div>
         <Pagination page={page} setPage={setPage} amount={getPagesAmount(data.length, 19)} />
      </div>
   )
}

export default WithAuth(EditorDecks)