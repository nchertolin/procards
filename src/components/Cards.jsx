import React, {useContext, useState} from 'react';
import Card from './Card';
import Loading from './Loading/Loading';
import {useParams} from 'react-router-dom';
import {FormsContext} from '../providers/FormsProvider';
import {useEditorDeck} from '../hooks/useEditorDeck';
import {WithAuth} from '../hoc/withAuth';
import Pagination from './Pagination';
import {getPagesAmount} from '../util';
import Search from './Search';
import {useDebounce} from "use-debounce";
import HeadText from "./HeadText";
import AddCardIcon from '@mui/icons-material/AddCard';


function Cards() {
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
        <div className='card-list'>
            <HeadText parentText='Редактор колод' text={data?.deckName}/>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className='cards-list__wrapper'>
                <ul>
                    <li>
                        <button className='card' onClick={() => setAddCardFormOpened(true)}>
                            <AddCardIcon/>
                        </button>
                    </li>
                    {sliced.map(content =>
                        <Card
                            key={content.id}
                            content={content}
                            isCardsEditor={true}
                        />)}
                </ul>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data?.cards?.length, amountOnPage)}
            />
        </div>
    )
}

export default WithAuth(Cards);
