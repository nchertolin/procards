import React, {useState} from 'react';
import {Card} from '../Card';
import Loading from '../Loading/Loading';
import {useDecks} from '../../hooks/useDecks';
import {WithAuth} from '../../hoc/withAuth';
import Pagination from '../UI/Pagination';
import {getPagesAmount} from '../../utils';
import Search from '../UI/Search';
import {useDebounce} from "use-debounce";
import Navigation from "../UI/Navigation";

const AMOUNT_ON_PAGE = 20;

function Decks() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useDecks(debouncedSearchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(AMOUNT_ON_PAGE * page - AMOUNT_ON_PAGE, AMOUNT_ON_PAGE * page);

    if (isLoading || !data) return <Loading/>

    return (
        <div className={`cards-list__wrapper ${!data.length ? 'empty' : ''}`}>
            <Navigation parentText='Выберите колоду'/>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder='Поиск по колодам'
            />
            <ul className='cards-list'>
                {sliced.map(content => <Card key={content.deckId} content={content}/>)}
            </ul>
            <p className='empty__search__message'>Ничего не найдено.</p>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data.length)}
            />
        </div>
    )
}

export default WithAuth(Decks);
