import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {FormsContext} from '../providers/FormsProvider';
import EditIcon from '@mui/icons-material/Edit';
import AddCardIcon from "@mui/icons-material/AddCard";

function AddCardButton({onClick}) {

    return (
        <li>
            <button className='card' onClick={onClick}>
                <AddCardIcon/>
            </button>
        </li>
    );
}

function Card({content}) {
    const {deckName, isOwner, deckId} = content;

    return (
        <li>
            <Link to={deckId} className={`card ${isOwner ? '' : 'other'}`}>
                <div className='card__content'>
                    <h3>{deckName}</h3>
                </div>
            </Link>
        </li>
    );
}

function DeckEditorCard({content}) {
    const {deckName, deckId} = content;
    const {setDeckSelected, setEditFormOpened} = useContext(FormsContext);

    const openEditDeckForm = () => {
        setDeckSelected(content);
        setEditFormOpened(true);
    };

    return (
        <li className='editor'>
            <button className='card-settings' onClick={openEditDeckForm}>
                <EditIcon/>
            </button>
            <Link to={deckId} className='card'>
                <div className='card__content'>
                    <h3>{deckName}</h3>
                </div>
            </Link>
        </li>
    );
}

function CardsEditorCard({content}) {
    const {setEditCardFormOpened, setCardSelected} = useContext(FormsContext);

    const openCardForm = () => {
        setCardSelected(content);
        setEditCardFormOpened(true)
    };

    return (
        <li>
            <button className='card'
                    onClick={openCardForm}>
                <div className='card__content'>
                    <h3 className='card-editor'>{content.frontSide}</h3>
                </div>
            </button>
        </li>
    );
}

function CardWithoutLink({deckName, isOwner}) {
    return (
        <li>
            <div className={`card ${isOwner ? '' : 'other'}`}>
                <div className='card__content'>
                    <h3>{deckName}</h3>
                </div>
            </div>
        </li>
    );
}

export {
    AddCardButton,
    Card,
    DeckEditorCard,
    CardsEditorCard,
    CardWithoutLink
}

