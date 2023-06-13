import React, {useContext, useState} from 'react';
import Card from './Card';
import Loading from './Loading/Loading';
import {FormsContext} from '../providers/FormsProvider';
import {useEditorDecks} from '../hooks/useEditorDecks';
import {WithAuth} from '../hoc/withAuth';
import Pagination from './Pagination';
import {getPagesAmount} from '../util';
import Search from './Search';
import {useDebounce} from "use-debounce";
import HeadText from "./HeadText";
import AddCardIcon from "@mui/icons-material/AddCard";

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
        <div className='card-list'>
            <HeadText parentText='Редактор колод'/>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className='cards-list__wrapper'>
                <ul>
                    <li>
                        <button className='card' onClick={openAddForm}>
                            <AddCardIcon/>
                        </button>
                    </li>
                    {sliced.map(content =>
                        <Card
                            key={content.deckId}
                            content={content}
                            isDecksEditor={true}
                        />)}
                </ul>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data.length, AMOUNT_ON_PAGE)}
            />
        </div>
    )
}

export default WithAuth(EditorDecks)
