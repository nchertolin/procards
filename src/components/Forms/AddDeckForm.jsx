import React, { useContext } from 'react'
import { clickOutsideHandler } from '../../util'
import { useForm } from 'react-hook-form'
import { FormsContext } from '../../providers/FormsProvider';
import { useCreateDeck } from '../../hooks/useEditorDecks';

export default function AddDeckForm() {
   const { setAddFormOpened } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch, reset } = useForm({
      defaultValues: { isPrivate: 'true' }
   });

   const { isLoading, createDeck } = useCreateDeck(reset, setAddFormOpened);

   return (
      <div className='new-deck-modal'
         onClick={(e) => clickOutsideHandler(e, '.new-deck-modal_wrapper', setAddFormOpened)}>
         <div className='new-deck-modal_wrapper'>
            <h3>Новая колода</h3>
            <form onSubmit={handleSubmit(createDeck)} autoComplete='off'>
               <label>
                  <input type="text" placeholder='Название колоды'
                     className={errors?.name ? 'invalid' : ''}
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
                     className={errors?.password ? 'invalid' : ''}
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
               <button type='submit' className='modal_submit' disabled={isLoading}>Добавить</button>
            </form>
         </div>
      </div>
   )
}
