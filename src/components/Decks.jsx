import React, {useState} from 'react';
import Card from './Card';
import Loading from './Loading/Loading';
import {useDecks} from '../hooks/useDecks';
import {WithAuth} from '../hoc/withAuth';
import Pagination from './Pagination';
import {getPagesAmount} from '../util';
import Search from './Search';


function Decks() {
    const amountOnPage = 20;
    const [searchQuery, setSearchQuery] = useState('');
    const {isLoading, data} = useDecks(searchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(amountOnPage * page - amountOnPage, amountOnPage * page);

    if (isLoading || !data) return <Loading/>

    return (
        <div className='card-list'>
            <h1>Выберите колоду</h1>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className={`cards-list__wrapper ${!data.length ? 'empty' : ''}`}>
                <ul>
                    {sliced.map(content => <Card key={content.deckId} content={content}/>)}
                </ul>
                <p className='empty__search__message'>Ничего не найдено.</p>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data.length)}
            />
        </div>
    )
}

export default WithAuth(Decks);