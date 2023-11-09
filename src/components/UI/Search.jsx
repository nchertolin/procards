import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({setPage, searchQuery, setSearchQuery, placeholder}) {
    const search = (e) => {
        setSearchQuery(e.target.value);
        setPage(1)
    };


    return (
        <div className='search'>
            <input type="text" placeholder={placeholder} value={searchQuery} onChange={search}/>
            <SearchIcon/>
        </div>
    )
}
