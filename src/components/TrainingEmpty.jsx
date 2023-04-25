import React from 'react';
import {Link} from "react-router-dom";

function TrainingEmpty() {
    return (
        <div className='training-empty'>
            <h2>Колода пуста.</h2>
            <p>Если это ваша колода, добавить в нее карточки вы сможете в <Link to='/editor'>редакторе колод</Link></p>
        </div>
    );
}

export default TrainingEmpty;