import React, {useContext, useState} from 'react';
import Card from './Card';
import Loading from './Loading/Loading';
import {FormsContext} from '../providers/FormsProvider';
import {useEditorDecks} from '../hooks/useEditorDecks';
import {WithAuth} from '../hoc/withAuth';
import Pagination from './Pagination';
import {getPagesAmount} from '../util';
import Search from './Search';


function EditorDecks() {
    const amountOnPage = 19;
    const {setAddFormOpened} = useContext(FormsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const {isLoading, data} = useEditorDecks(searchQuery);
    const [page, setPage] = useState(1);
    const sliced = data?.slice(amountOnPage * page - amountOnPage, amountOnPage * page);

    const openAddForm = () => setAddFormOpened(true);

    if (isLoading || !data) return <Loading/>

    return (
        <div className='card-list'>
            <h1>Редактор колод</h1>
            <Search
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className='cards-list__wrapper'>
                <ul>
                    <li>
                        <button className='card' onClick={openAddForm}>
                            <h3>+</h3>
                        </button>
                    </li>
                    {sliced.map(content => <Card key={content.deckId} content={content} isDecksEditor={true}/>)}
                </ul>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                amount={getPagesAmount(data.length, amountOnPage)}
            />
        </div>
    )
}

export default WithAuth(EditorDecks)