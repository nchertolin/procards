import React, {useContext, useState} from 'react';
import {AddCardButton, DeckEditorCard} from '../Card';
import Loading from '../Loading/Loading';
import {FormsContext} from '../../providers/FormsProvider';
import {useEditorDecks} from '../../hooks/useEditorDecks';
import {WithAuth} from '../../hoc/withAuth';
import Pagination from '../UI/Pagination';
import {getPagesAmount} from '../../js/utils';
import Search from '../UI/Search';
import {useDebounce} from "use-debounce";
import Navigation from "../UI/Navigation";
import {AMOUNT_ON_PAGE} from "../../js/consts";

const amountOnPage = AMOUNT_ON_PAGE.DECKS_EDITOR;

function DecksEditor() {
    const {setAddFormOpened} = useContext(FormsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useEditorDecks(debouncedSearchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(amountOnPage * page - amountOnPage, amountOnPage * page);

    const openAddForm = () => setAddFormOpened(true);

    if (isLoading || !data) return <Loading/>

    return (
        <>
            {/*<Navigation parentText='Редактор колод'/>*/}
            <div className='cards-list__wrapper'>
                <Search
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder='Найти колоды'
                />
                <ul className='cards-list'>
                    <AddCardButton onClick={openAddForm}/>
                    {sliced.map(content => <DeckEditorCard key={content.deckId} content={content}/>)}
                </ul>
                <Pagination
                    page={page}
                    setPage={setPage}
                    amount={getPagesAmount(data.length, amountOnPage)}
                />
            </div>
        </>
    )
}

export default WithAuth(DecksEditor)
