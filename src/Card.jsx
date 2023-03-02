import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { clickOutsideHandler } from './util';

export default function Card({ cardInfo }) {
  const isCardsEditor = window.location.pathname.split('/')[2]
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { title, isOther, to } = cardInfo;
  return (
    isCardsEditor
      ? <>
        <button to={to} className='card other'
          onClick={() => setEditModalOpen(true)}>
          <div className='card-wrapper'>
            <h3 className='card-editor'>{cardInfo.avers}</h3>
          </div>
        </button>
        {
          isEditModalOpen &&
          <div className='new-deck-modal'
            onClick={(e) => clickOutsideHandler(e, '.new-deck-modal_wrapper', setEditModalOpen)}>
            <div className='new-deck-modal_wrapper'>
              <h3>Редактировать карточку</h3>
              <form>
                <textarea placeholder='Лицевая сторона'></textarea>
                <textarea placeholder='Обратная сторона'></textarea>
                <div className='modal_buttons'>
                  <button className='modal_submit'>Сохранить</button>
                  <button className='modal_submit delete'>Удалить</button>
                </div>
              </form>
            </div>
          </div>
        }
      </>
      : <Link to={to} className={`card ${isOther ? 'other' : ''}`}>
        <div className='card-wrapper'>
          <h3>{title}</h3>
        </div>
      </Link>
  )
}
