import React from 'react';
import { clickOutsideHandler } from '../../util';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useDeleteDeck, useEditDeck, useEditDeckPassword } from '../../hooks/useEditorDecks';

export default function EditDeckForm() {
   const { setEditFormOpened, selectedDeck } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({
      defaultValues: {
         name: selectedDeck.name,
         isPrivate: selectedDeck.isPrivate.toString(),
         password: '',
         description: selectedDeck.description,
      }
   });
   const { isLoading, editDeck } = useEditDeck(setEditFormOpened);
   const { isLoading: isLoading2, editPassword } = useEditDeckPassword(setEditFormOpened);
   const { isLoading: isLoading1, deleteDeck } = useDeleteDeck(setEditFormOpened);

   const onSubmit = ({ name, isPrivate, password, description }) => {
      if (watch('password') !== '' || watch('isPrivate') !== selectedDeck.isPrivate.toString()) {
         editPassword({ password: watch('isPrivate') === 'true' ? 'valid' : password, isPrivate });
      }
      editDeck({ name, description });
   };

   const onDelete = () => deleteDeck(selectedDeck.deckId);

   return (
      <div className='modal'
         onClick={e => clickOutsideHandler(e, '.modal__wrapper', setEditFormOpened)}>
         <div className='modal__wrapper'>
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
               {
                  watch('isPrivate') === 'false' &&
                  <label>
                     <input type="password" placeholder='Новый пароль колоды'
                        className={errors?.password ? 'invalid' : ''}
                        {...register('password', {
                           required: 'Обязательноe поле.',
                           disabled: watch('isPrivate') === 'true'
                        })} />
                     <i>Оставить пустым если хотите использовать текущий пароль</i>
                     {errors?.password && <p className='error'>{errors?.password.message}</p>}
                  </label>
               }
               <textarea {...register('description')} placeholder='Описание' />
               <div className='modal__buttons'>
                  <button type="submit" className='modal_submit'
                     disabled={isLoading || isLoading2}>
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
