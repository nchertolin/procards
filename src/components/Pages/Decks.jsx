import React, {useState} from 'react';
import {Card} from '../Card';
import Loading from '../Loading/Loading';
import {useDecks} from '../../hooks/useDecks';
import {WithAuth} from '../../hoc/withAuth';
import Pagination from '../UI/Pagination';
import {getPagesAmount} from '../../js/utils';
import Search from '../UI/Search';
import {useDebounce} from "use-debounce";
import Navigation from "../UI/Navigation";
import {AMOUNT_ON_PAGE} from "../../js/consts";

const amountOnPage = AMOUNT_ON_PAGE.DECKS;

function Decks() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useDecks(debouncedSearchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(amountOnPage * page - amountOnPage, amountOnPage * page);

    if (isLoading || !data) return <Loading/>

    return (
        <>
            <Navigation parentText='Выберите колоду'/>
            <div className={`cards-list__wrapper ${!data.length ? 'empty' : ''}`}>
                <Search
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder='Найти колоды'
                />
                <ul className='cards-list'>
                    {sliced.map(content => <Card key={content.deckId} content={content}/>)}
                </ul>
                <p className='empty__search__message'>Колоды не найдены.</p>
                <Pagination
                    page={page}
                    setPage={setPage}
                    amount={getPagesAmount(data.length)}
                />
            </div>
        </>
    )
}

export default WithAuth(Decks);
