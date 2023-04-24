import React from 'react';
import {Link} from "react-router-dom";

function TrainingEmpty({deckId}) {
    return (
        <div className='training-empty'>
            <h2>Колода пуста.</h2>
            <Link to={`/editor/${deckId}`} className='main__btn'>Добавить карточки</Link>
        </div>
    );
}

export default TrainingEmpty;