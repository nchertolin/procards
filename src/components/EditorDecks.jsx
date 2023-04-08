import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import searchIcon from '../assets/icons/search-icon.svg';
import settingsIcon from '../assets/icons/settings-icon.svg';
import { useEffect } from 'react';
import Loading from './Loading/Loading';
import { FormsContext } from '../providers/FormsProvider';
import { useEditorDecks } from '../hooks/useEditorDecks';


export default function CardList() {
   const { setAddFormOpened, setEditFormOpened, setDeckSelected } = useContext(FormsContext);
   const [isSettingVisible, setSettingsVisible] = useState();
   const [searchQuery, setSearchQuery] = useState('');
   const { isLoading, data } = useEditorDecks(searchQuery);

   const openAddForm = () => setAddFormOpened(true);
   const openEditForm = deck => {
      setDeckSelected(deck);
      setEditFormOpened(true);
   }

   if (isLoading) return <Loading />

   return (
      <div className='card-list'>
         <h1>Редактор колод</h1>
         <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
            <img src={searchIcon} alt="" />
         </div>
         <ul>
            <li>
               <button className='card' onClick={openAddForm}>
                  <h3>+</h3>
               </button>
            </li>
            {data.map(info =>
               <li key={v4()} className='editor'
                  onMouseEnter={() => setSettingsVisible(true)}
                  onMouseLeave={() => setSettingsVisible(false)}>
                  {
                     isSettingVisible &&
                     <button className='card-settings' onClick={() => openEditForm(info)}>
                        <img src={settingsIcon} alt="" />
                     </button>
                  }
                  <Card cardInfo={info} />
               </li>)}
         </ul>
      </div>
   )
}