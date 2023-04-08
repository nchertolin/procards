import React, { useContext } from 'react'
import { clickOutsideHandler } from '../../util'
import { useForm } from 'react-hook-form'
import { EditorDeckService } from '../../services/editorDecksService';
import { FormsContext } from '../../providers/FormsProvider';

export default function AddDeckForm() {
   const { setAddFormOpened } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({
      defaultValues: {
         isPrivate: 'true'
      }
   });

   const createDeck = async (data) => await EditorDeckService.createDeck(data);

   return (
      <div className='new-deck-modal'
         onClick={(e) => clickOutsideHandler(e, '.new-deck-modal_wrapper', setAddFormOpened)}>
         <div className='new-deck-modal_wrapper'>
            <h3>Новая колода</h3>
            <form onSubmit={handleSubmit(createDeck)}>
               <label>
                  <input type="text" placeholder='Название колоды'
                     {...register('name', { required: 'Обязательноe поле.' })} />
                  {errors?.name && <p className='error'>{errors?.name.message}</p>}
               </label>
               <div className='privacy'>
                  <label>
                     <input type="radio" name="privacy" value='false'
                        {...register('isPrivate')} />
                     Публичная
                  </label>
                  <label>
                     <input type="radio" name="privacy" value='true'
                        {...register('isPrivate')} />
                     Приватная
                  </label>
               </div>
               <label>
                  <input type="text" placeholder='Пароль колоды'
                     {...register('password', {
                        required: 'Обязательноe поле.',
                        disabled: watch('isPrivate') === 'true'
                     })} />
                  {errors?.password && <p className='error'>{errors?.password.message}</p>}
               </label>
               <label>
                  <textarea placeholder='Описание'
                     {...register('description')} />
               </label>
               <button className='modal_submit'>Добавить</button>
            </form>
         </div>
      </div>
   )
}
