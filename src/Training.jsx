import React, { useState } from 'react'

export default function Training({ info }) {
  const { title, content } = info;
  const [curentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(content[0]);
  const [currentSide, setCurrentSide] = useState(0);

  const reverseCard = () => {
    if (currentSide === 0) {
      setCurrentSide(1);
    }
  };

  const nextCard = () => {
    if (curentIndex !== content.length - 1) {
      setCurrentIndex(curentIndex + 1);
      setCurrentCard(content[curentIndex]);
    } else {
      setCurrentIndex(0);
      setCurrentCard(content[curentIndex]);
    }
    setCurrentSide(0);
  }

  return (
    <>
      <h1>{title}</h1>
      <div className='training-wrapper'>

        <ul className='training__score-list'>
          <li className='worst'>1</li>
          <li className='bad'>2</li>
          <li className='normal'>3</li>
          <li className='good'>4</li>
          <li className='best'>5</li>
        </ul>

        <button className='training__card' disabled={currentSide === 1}
          onClick={reverseCard}>
          <span>{currentSide === 0 ? currentCard.avers : currentCard.revers}</span>
        </button>

        <div className='training__rating'>
          {
            currentSide === 0
              ? <p>Нажатие на карточку перевернет ее.</p>
              :
              <ul className='training__rating__list'>
                <li><button className='worst' onClick={nextCard}>1</button></li>
                <li><button className='bad' onClick={nextCard}>2</button></li>
                <li><button className='normal' onClick={nextCard}>3</button></li>
                <li><button className='good' onClick={nextCard}>4</button></li>
                <li><button className='best' onClick={nextCard}>5</button></li>
              </ul>
          }
        </div>
      </div>
    </>
  )
}
