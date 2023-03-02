import React, { useState } from 'react';
import { v4 } from 'uuid';
import Card from './Card';
import serachIcon from './assets/icons/search-icon.svg';
import { clickOutsideHandler } from './util';
import settingsIcon from './assets/icons/settings-icon.svg';

export default function CardList({ data }) {
  const pathName = window.location.pathname;
  const isEditor = pathName === '/editor' && !pathName.split('/')[2];
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSettingVisible, setSettingsVisible] = useState(false);

  return (
    <div className='card-list'>
      <div className='card-list_search'>
        <input type="text" placeholder='Поиск колоды' />
        <img src={serachIcon} alt="" />
      </div>
      <ul>
        {
          isEditor &&
          <li>
            <button className='card'
              onClick={() => setAddModalOpen(true)}>
              <h3>+</h3>
            </button>
          </li>}
        {
          data.map(cardInfo =>
            <li key={v4()} className={isEditor ? 'editor' : ''}
              onMouseEnter={() => setSettingsVisible(true)}
              onMouseLeave={() => setSettingsVisible(false)}>
              {
                isEditor && isSettingVisible &&
                <button className='card-settings'
                  onClick={() => setEditModalOpen(true)}>
                  <img src={settingsIcon} alt="" />
                </button>
              }
              <Card cardInfo={cardInfo} />
            </li>)
        }
      </ul>
      {
        isAddModalOpen &&
        <div className='new-deck-modal'
          onClick={(e) => clickOutsideHandler(e, '.new-deck-modal_wrapper', setAddModalOpen)}>
          <div className='new-deck-modal_wrapper'>
            <h3>Новая колода</h3>
            <form>
              <input type="text" placeholder='Название колоды' />
              <div className='privacy'>
                <label>
                  <input type="radio" name="privacy" value='0' />
                  Публичная
                </label>
                <label>
                  <input type="radio" name="privacy" value='1' />
                  Приватная
                </label>
              </div>
              <input type="text" placeholder='Пароль колоды' />
              <textarea placeholder='Описание'></textarea>
              <button className='modal_submit'>Добавить</button>
            </form>
          </div>
        </div>
      }
      {
        isEditModalOpen &&
        <div className='new-deck-modal'
          onClick={(e) => clickOutsideHandler(e, '.new-deck-modal_wrapper', setEditModalOpen)}>
          <div className='new-deck-modal_wrapper'>
            <h3>Редактировать колоду</h3>
            <form>
              <input type="text" placeholder='Название колоды' />
              <div className='privacy'>
                <label>
                  <input type="radio" name="privacy" value='0' />
                  Публичная
                </label>
                <label>
                  <input type="radio" name="privacy" value='1' />
                  Приватная
                </label>
              </div>
              <input type="text" placeholder='Пароль колоды' />
              <textarea placeholder='Описание'></textarea>
              <div className='modal_buttons'>
                <button className='modal_submit'>Сохранить</button>
                <button className='modal_submit delete'>Удалить</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div >
  )
}
