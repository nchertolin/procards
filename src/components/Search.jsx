import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({setPage, searchQuery, setSearchQuery}) {
    const search = (e) => {
        setSearchQuery(e.target.value);
        setPage(1)
    };


    return (
        <div className='card-list_search'>
            <input type="text" placeholder='Поиск' value={searchQuery} onChange={search}/>
            <SearchIcon/>
        </div>
    )
}
