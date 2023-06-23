import React, {useContext, useState} from 'react';
import {AddCardButton, DeckEditorCard} from '../Card';
import Loading from '../Loading/Loading';
import {FormsContext} from '../../providers/FormsProvider';
import {useEditorDecks} from '../../hooks/useEditorDecks';
import {WithAuth} from '../../hoc/withAuth';
import Pagination from '../UI/Pagination';
import {getPagesAmount} from '../../utils';
import Search from '../UI/Search';
import {useDebounce} from "use-debounce";
import Navigation from "../UI/Navigation";

const AMOUNT_ON_PAGE = 19;

function EditorDecks() {
    const {setAddFormOpened} = useContext(FormsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useEditorDecks(debouncedSearchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(AMOUNT_ON_PAGE * page - AMOUNT_ON_PAGE, AMOUNT_ON_PAGE * page);

    const openAddForm = () => setAddFormOpened(true);

    if (isLoading || !data) return <Loading/>

    return (
        <div className='cards-list__wrapper'>
            <Navigation parentText='Редактор колод'/>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder='Поиск по колодам'
            />
            <ul className='cards-list'>
                <AddCardButton onClick={openAddForm}/>
                {sliced.map(content => <DeckEditorCard key={content.deckId} content={content}/>)}
            </ul>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data.length, AMOUNT_ON_PAGE)}
            />
        </div>
    )
}

export default WithAuth(EditorDecks)
