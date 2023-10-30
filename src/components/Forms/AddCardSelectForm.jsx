import React, {useContext} from 'react';
import {FormsContext} from "../../providers/FormsProvider";
import {clickOutsideHandler} from "../../js/utils";

export default function AddCardSelectForm() {
    const {setAddCardFormOpened, setSelectFormOpened} = useContext(FormsContext);
    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper',
        setSelectFormOpened);

    return (
        <div className='modal' onClick={closeModal}>
            <div className='modal__wrapper'>
                <h3>Выберите способ добавления карточек</h3>
                <div className='modal__buttons'>
                    <button className='modal_submit main__btn' onClick={() => setAddCardFormOpened(true)}>
                        Новая карточка
                    </button>
                    <button className='modal_submit delete__btn' onClick={() => setAddCardFormOpened(true)}>
                        Из существующих
                    </button>
                </div>
            </div>
        </div>
    );
}
