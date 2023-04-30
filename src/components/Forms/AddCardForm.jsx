import React, { useState } from 'react';
import { clickOutsideHandler } from '../../util';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useForm } from 'react-hook-form';
import { useCreateCard, useImage } from '../../hooks/useEditorDeck';
import { useParams } from 'react-router-dom';

export default function AddCardForm() {
   const { deckId } = useParams();
   const { setAddCardFormOpened } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, reset, watch } = useForm();
   const { isLoading, createCard } = useCreateCard(setAddCardFormOpened);
   const { isLoading: isLoading1, addImage } = useImage();
   const [side, setSide] = useState(true);
   const [hasFrontImage, setFrontImage] = useState(false);
   const [hasBackImage, setBackImage] = useState(false);

   const onSubmit = async (data) => {
      const cardId = await createCard({ ...data, deckId });
      if (cardId) {
         if (hasFrontImage) {
            const formData = new FormData();
            formData.append('file', watch('image-1')[0])
            addImage({ cardId, formData, side: true });
         }
         if (hasBackImage) {
            const formData = new FormData();
            formData.append('file', watch('image-2')[0]);
            addImage({ cardId, formData, side: false })
         }
      }
      reset();
   };

   return (
      <div className='modal'
         onClick={e => clickOutsideHandler(e, '.modal__wrapper',
            setAddCardFormOpened)
         }>
         <div className='modal__wrapper card__modal'>
            <div>
               <h3>Новая карточка</h3>
               <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <label>
                     <textarea placeholder='Лицевая сторона'
                        className={errors?.frontSide ? 'invalid' : ''}
                        {...register('frontSide', { 
                          required: 'Обязательноe поле.',
                          pattern: {
                            value: /^(?=^.{1,800}$)/,
                            message: 'Минимум 1 символ.'
                          },
                         })} />
                     {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                  </label>
                  {hasFrontImage
                     ? <input type="file" className='file'{...register('image-1')} />
                     : <button type='button' onClick={() => setFrontImage(true)} className='add__image__btn'>
                        Добавить изображение
                     </button>
                  }
                  <label>
                     <textarea placeholder='Обратная сторона'
                        className={errors?.backSide ? 'invalid' : ''}
                        {...register('backSide', { 
                          required: 'Обязательноe поле.',
                          pattern: {
                            value: /^(?=^.{1,800}$)/,
                            message: 'Минимум 1 символ.'
                          },
                        })} />
                     {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                  </label>
                  {hasBackImage
                     ? <input type="file" className='file'{...register('image-2')} />
                     : <button type='button' onClick={() => setBackImage(true)} className='add__image__btn'>
                        Добавить изображение
                     </button>
                  }
                  <button type='submit' className='modal_submit main__btn'
                     disabled={isLoading || isLoading1}>
                     Сохранить
                  </button>
               </form>
            </div>
            <div>
               <button className='card training__card'
                  onClick={(e) => {
                     setSide(!side);
                     e.target.classList.toggle('flipped')
                  }}>
                  <p className='card__text'>{watch(side ? 'frontSide' : 'backSide')}</p>
               </button>
            </div>
         </div>
      </div>
   )
}
