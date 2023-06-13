import React, {useState} from 'react';
import Card from './Card';
import Loading from './Loading/Loading';
import {useDecks} from '../hooks/useDecks';
import {WithAuth} from '../hoc/withAuth';
import Pagination from './Pagination';
import {getPagesAmount} from '../util';
import Search from './Search';
import {useDebounce} from "use-debounce";
import HeadText from "./HeadText";

const AMOUNT_ON_PAGE = 20;

function Decks() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useDecks(debouncedSearchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(AMOUNT_ON_PAGE * page - AMOUNT_ON_PAGE, AMOUNT_ON_PAGE * page);

    if (isLoading || !data) return <Loading/>

    return (
        <div className='card-list'>
            <HeadText parentText='Выберите колоду'/>

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
