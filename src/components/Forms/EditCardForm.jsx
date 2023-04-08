import React from 'react';
import { clickOutsideHandler } from '../../util';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useForm } from 'react-hook-form';

export default function EditCardForm() {
   const { setCardFormOpened, selectedCard, setCardSelected } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit } = useForm({
      defaultValues: {
         frontSide: selectedCard?.frontSide,
         backSide: selectedCard?.backSide
      }
   });

   const sendData = async () => {

   };


   return (
      <div className='new-deck-modal'
         onClick={e => clickOutsideHandler(e, '.new-deck-modal_wrapper',
            setCardFormOpened, () => setCardSelected({}))
         }>
         <div className='new-deck-modal_wrapper'>
            <h3>{selectedCard ? 'Редактировать карточку' : 'Создать карточку'}</h3>
            <form onSubmit={handleSubmit(sendData)}>
               <label>
                  <textarea placeholder='Лицевая сторона'
                     {...register('frontSide', { required: 'Обязательноe поле.' })} />
                  {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
               </label>
               <label>
                  <textarea placeholder='Обратная сторона'
                     {...register('backSide', { required: 'Обязательноe поле.' })} />
                  {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
               </label>
               <div className='modal_buttons'>
                  <button type='submit' className='modal_submit'>Сохранить</button>
                  <button type='button' className='modal_submit delete'>Удалить</button>
               </div>
            </form>
         </div>
      </div>
   )
}
