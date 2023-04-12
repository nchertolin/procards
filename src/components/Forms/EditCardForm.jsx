import React from 'react';
import { clickOutsideHandler } from '../../util';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useForm } from 'react-hook-form';
import { useCreateCard, useDeleteCard, useEditCard } from '../../hooks/useEditorDeck';

export default function EditCardForm() {
   const { setCardFormOpened, selectedCard, setCardSelected } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, reset } = useForm({
      defaultValues: {
         frontSide: selectedCard?.frontSide,
         backSide: selectedCard?.backSide
      }
   });
   const { isLoading, createCard } = useCreateCard(reset, setCardFormOpened);
   const { isLoading: isLoading1, editCard } = useEditCard(setCardFormOpened);
   const { isLoading: isLoading2, deleteCard } = useDeleteCard(setCardFormOpened);

   const onSubmit = (data) => {
      if (selectedCard) {
         createCard(data);
      } else {
         editCard(data);
      }
   };

   const onDelete = () => deleteCard(selectedCard.id);


   return (
      <div className='modal'
         onClick={e => clickOutsideHandler(e, '.modal__wrapper',
            setCardFormOpened, () => setCardSelected(null))
         }>
         <div className='modal__wrapper'>
            <div className=''>
               <h3>{selectedCard ? 'Редактировать карточку' : 'Новая карточка'}</h3>
               <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <label>
                     <textarea placeholder='Лицевая сторона'
                        className={errors?.frontSide ? 'invalid' : ''}
                        {...register('frontSide', { required: 'Обязательноe поле.' })} />
                     {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                  </label>
                  <label>
                     Прикрепите изображение к лицевой стороне если требуется
                     <input type="file" className='file'
                        {...register('image-1')} />
                  </label>
                  <label>
                     <textarea placeholder='Обратная сторона'
                        className={errors?.backSide ? 'invalid' : ''}
                        {...register('backSide', { required: 'Обязательноe поле.' })} />
                     {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                  </label>
                  <label>
                     Прикрепите изображение к обратной стороне если требуется
                     <input type="file" className='file'
                        {...register('image-2')} />
                  </label>
                  {selectedCard
                     ? <div className='modal__buttons'>
                        <button type='submit' className='modal_submit'
                           disabled={isLoading || isLoading1}>
                           Сохранить
                        </button>

                        <button type='button' className='modal_submit delete'
                           disabled={isLoading2}
                           onClick={onDelete}>
                           Удалить
                        </button>
                     </div>
                     : <button type='submit' className='modal_submit'
                        disabled={isLoading || isLoading1}>
                        Сохранить
                     </button>}
               </form>
            </div>
         </div>
      </div>
   )
}
