import React, {useContext, useState} from 'react';
import {AddCardButton, CardsEditorCard} from '../Card';
import Loading from '../Loading/Loading';
import {useParams} from 'react-router-dom';
import {FormsContext} from '../../providers/FormsProvider';
import {useEditorDeck} from '../../hooks/useEditorDeck';
import {WithAuth} from '../../hoc/withAuth';
import Pagination from '../UI/Pagination';
import {getPagesAmount} from '../../utils';
import Search from '../UI/Search';
import {useDebounce} from "use-debounce";
import Navigation from "../UI/Navigation";


function CardsEditor() {
    const amountOnPage = 19;
    const {deckId} = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const {isLoading, data} = useEditorDeck(deckId, debouncedSearchQuery);
    const {setAddCardFormOpened} = useContext(FormsContext);
    const [page, setPage] = useState(1);
    const sliced = data?.cards?.slice(amountOnPage * page - amountOnPage, amountOnPage * page);

    if (isLoading || !data) return <Loading/>

    return (
        <div className='cards-list__wrapper'>
            <Navigation parentText='Редактор колод' text={data?.deckName}/>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder='Поиск по карточкам'
            />
            <ul className='cards-list'>
                <AddCardButton onClick={() => setAddCardFormOpened(true)}/>
                {sliced.map(content => <CardsEditorCard key={content.id} content={content}/>)}
            </ul>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data?.cards?.length, amountOnPage)}
            />
        </div>
    )
}

export default WithAuth(CardsEditor);
