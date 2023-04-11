import React from 'react';
import { clickOutsideHandler } from '../../util';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useDeleteDeck, useEditDeck } from '../../hooks/useEditorDecks';

export default function EditDeckForm() {
   const { setEditFormOpened, selectedDeck } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({
      defaultValues: {
         name: selectedDeck.name,
         isPrivate: selectedDeck.isPrivate.toString(),
         password: selectedDeck.password,
         description: selectedDeck.description,
      }
   });
   const { isLoading, editDeck } = useEditDeck(setEditFormOpened);
   const { isLoading: isLoading1, deleteDeck } = useDeleteDeck(setEditFormOpened);

   //TODO compapare edit password with edit deck info
   const onSubmit = data => editDeck({
      deckId: selectedDeck.deckId,
      isPrivate: data.isPrivate === 'true',
      ...data,
   });

   const onDelete = () => deleteDeck(selectedDeck.deckId);

   return (
      <div className='new-deck-modal'
         onClick={e => clickOutsideHandler(e, '.new-deck-modal_wrapper', setEditFormOpened)}>
         <div className='new-deck-modal_wrapper'>
            <h3>Редактировать колоду</h3>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
               <label>
                  <input type="text" placeholder='Название колоды'
                     className={errors?.name ? 'invalid' : ''}
                     {...register('name', { required: 'Обязательноe поле.' })} />
                  {errors?.name && <p className='error'>{errors?.name.message}</p>}
               </label>
               <div className='privacy'>
                  <label>
                     <input type="radio" value='false'
                        {...register('isPrivate')} />
                     Публичная
                  </label>
                  <label>
                     <input type="radio" value='true'
                        {...register('isPrivate')} />
                     Приватная
                  </label>
               </div>
               <label>
                  <input type="text" placeholder='Пароль колоды'
                     className={errors?.password ? 'invalid' : ''}
                     {...register('password', {
                        required: 'Обязательноe поле.',
                        disabled: watch('isPrivate') === 'true'
                     })} />
                  {errors?.password && <p className='error'>{errors?.password.message}</p>}
               </label>
               <textarea {...register('description')} placeholder='Описание' />
               <div className='modal_buttons'>
                  <button type="submit" className='modal_submit'
                     disabled={isLoading}>
                     Сохранить
                  </button>
                  <button type="button" className='modal_submit delete'
                     onClick={onDelete}
                     disabled={isLoading1}>
                     Удалить
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
