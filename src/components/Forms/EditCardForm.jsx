import React, { useState } from 'react';
import { clickOutsideHandler, stopPropagation } from '../../util';
import { useContext } from 'react';
import { FormsContext } from '../../providers/FormsProvider';
import { useForm } from 'react-hook-form';
import { useDeleteCard, useEditCard, useImage, useImageDelete } from '../../hooks/useEditorDeck';
import { useImages } from '../../hooks/useCard';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function EditCardForm() {
   const { deckId } = useParams();
   const { setEditCardFormOpened, selectedCard, setCardSelected } = useContext(FormsContext);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm({
      defaultValues: {
         frontSide: selectedCard?.frontSide,
         backSide: selectedCard?.backSide
      }
   });
   const { isLoading, editCard } = useEditCard(setEditCardFormOpened);
   const { isLoading: isLoading1, deleteCard } = useDeleteCard(setEditCardFormOpened);
   const { isLoading: isLoading2, addImage } = useImage();
   const { isLoading: isLoading3, deleteImage } = useImageDelete();
   const { isLoading: isLoading4, images } = useImages(deckId, selectedCard);
   const [side, setSide] = useState(true);
   const [hasFrontImage, setFrontImage] = useState(false);
   const [hasBackImage, setBackImage] = useState(false);

   const onSubmit = (data) => {
      editCard({ ...data, cardId: selectedCard.id });
      if (hasFrontImage) {
         const formData = new FormData();
         formData.append('file', watch('image-1')[0])
         addImage({ cardId: selectedCard.id, formData, side: true });
      }
      if (hasBackImage) {
         const formData = new FormData();
         formData.append('file', watch('image-2')[0]);
         addImage({ cardId: selectedCard.id, formData, side: false })
      }
   }

   const onDelete = () => deleteCard(selectedCard.id);
   const onImageDelete = (isFront) => {
      deleteImage({ cardId: selectedCard.id, side: isFront });
   }

   const flip = (e) => {
      setSide(!side);
      e.target.parentElement.classList.toggle('flipped')
   };

   if (isLoading4) return <Loading />

   return (
      <div className='modal'
         onClick={e => clickOutsideHandler(e, '.modal__wrapper',
            setEditCardFormOpened, () => setCardSelected(null))
         }>
         <div className='modal__wrapper card__modal'>
            <div>
               <h3>Редактировать карточку</h3>
               <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <label>
                     <textarea placeholder='Лицевая сторона'
                        className={errors?.frontSide ? 'invalid' : ''}
                        {...register('frontSide', { required: 'Обязательноe поле.' })} />
                     {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                  </label>
                  {selectedCard.hasFrontImage
                     ? <button type='button' className='add__image__btn' disabled={isLoading3}
                        onClick={() => onImageDelete(true)}>
                        Удалить изображение
                     </button>
                     : <>
                        {hasFrontImage
                           ? <input type="file" className='file'{...register('image-1')} />
                           : <button type='button' onClick={() => setFrontImage(true)} className='add__image__btn'>
                              Добавить изображение
                           </button>
                        }
                     </>
                  }
                  <label>
                     <textarea placeholder='Обратная сторона'
                        className={errors?.backSide ? 'invalid' : ''}
                        {...register('backSide', { required: 'Обязательноe поле.' })} />
                     {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                  </label>
                  {selectedCard.hasBackImage
                     ? <button type='button' className='add__image__btn' disabled={isLoading3}
                        onClick={() => onImageDelete(false)}>
                        Удалить изображение
                     </button>
                     : <>
                        {hasBackImage
                           ? <input type="file" className='file'{...register('image-2')} />
                           : <button type='button' onClick={() => setBackImage(true)} className='add__image__btn'>
                              Добавить изображение
                           </button>
                        }
                     </>
                  }
                  <div className='modal__buttons'>
                     <button type='submit' className='modal_submit'
                        disabled={isLoading || isLoading2}>
                        Сохранить
                     </button>

                     <button type='button' className='modal_submit delete'
                        disabled={isLoading1}
                        onClick={onDelete}>
                        Удалить
                     </button>
                  </div>
               </form>
            </div>
            <div>
               <button className='card training__card'
                  onClick={(e) => {
                     setSide(!side);
                     e.target.classList.toggle('flipped')
                  }}>
                  {
                     side ?
                        images[0]
                           ? <img className='card__image' src={images[0]} alt={watch('frontSide')}
                              onClick={flip} />
                           : <p className='card__text' onClick={stopPropagation}>{watch('frontSide')}</p>
                        : images[1]
                           ? <img className='card__image' src={images[1]} alt={watch('backSide')}
                              onClick={flip} />
                           : <p className='card__text' onClick={stopPropagation}>{watch('backSide')}</p>
                  }
               </button>
            </div>
         </div>
      </div>
   )
}
