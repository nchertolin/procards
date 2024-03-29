import React from 'react';

export default function TrainingCard({card, images, side, setSide}) {
    const index = side ? 0 : 1;
    const text = side ? card?.frontSide : card?.backSide;
    const flip = () => setSide(!side);

    return (
        <button className={`card training__card ${side ? '' : 'flipped'}`} onClick={flip}>
            {
                images[index]
                    ? <img className='card__image' src={images[index]} alt={text}/>
                    : <p className='card__text'>{text}</p>
            }
            <div className='training__card__shadow'></div>
        </button>
    )
}
