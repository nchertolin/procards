import React, {useState} from 'react';
import {clickOutsideHandler} from '../../util';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useForm} from 'react-hook-form';
import {useDeleteCard, useEditCard, useImage, useImageDelete} from '../../hooks/useEditorDeck';
import {useImages} from '../../hooks/useCard';
import {useParams} from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function EditCardForm() {
    const {deckId} = useParams();
    const {setEditCardFormOpened, selectedCard, setCardSelected} = useContext(FormsContext);
    const {register, formState: {errors,}, handleSubmit, watch} = useForm({
        defaultValues: {
            frontSide: selectedCard?.frontSide,
            backSide: selectedCard?.backSide
        }
    });
    const {isLoading, editCard} = useEditCard(setEditCardFormOpened);
    const {isLoading: isLoading1, deleteCard} = useDeleteCard(setEditCardFormOpened);
    const {isLoading: isLoading2, addImage} = useImage();
    const {isLoading: isLoading3, deleteImage} = useImageDelete();
    const {isLoading: isLoading4, images} = useImages(deckId, selectedCard);
    const [side, setSide] = useState(true);
    const [hasFrontImg, setFrontImg] = useState(false);
    const [hasBackImg, setBackImg] = useState(false);

    const onSubmit = (data) => {
        editCard({...data, cardId: selectedCard.id});
        if (hasFrontImg) {
            const formData = new FormData();
            formData.append('file', watch('frontImg')[0])
            addImage({cardId: selectedCard.id, formData, side: true});
        }
        if (hasBackImg) {
            const formData = new FormData();
            formData.append('file', watch('backImg')[0]);
            addImage({cardId: selectedCard.id, formData, side: false})
        }
    }

    const onDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы действительно хотите удалить изображение?')) {
            deleteCard(selectedCard.id);
        }
    };

    const onImageDelete = isFront => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы действительно хотите удалить изображение?')) {
            deleteImage({cardId: selectedCard.id, side: isFront});
        }
    };

    const flip = e => {
        e.stopPropagation();
        setSide(!side);
        e.target.parentElement.classList.toggle('flipped')
    };

    if (isLoading4) return <Loading/>

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
                                      {...register('frontSide', {required: 'Обязательное поле.'})} />
                            {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                        </label>
                        {
                            selectedCard.hasFrontImage
                                ? <button type='button' className='add__image__btn' disabled={isLoading3}
                                          onClick={() => onImageDelete(true)}>
                                    Удалить изображение
                                </button>
                                : <>
                                    {
                                        hasFrontImg
                                            ? <input type="file" className='file' {...register('frontImg')} />
                                            : <button type='button' onClick={() => setFrontImg(true)}
                                                      className='add__image__btn'>
                                                Добавить изображение
                                            </button>
                                    }
                                </>
                        }
                        <label>
                            <textarea placeholder='Обратная сторона'
                                      className={errors?.backSide ? 'invalid' : ''}
                                      {...register('backSide', {required: 'Обязательное поле.'})} />
                            {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                        </label>
                        {
                            selectedCard.hasBackImage
                                ? <button type='button' className='add__image__btn' disabled={isLoading3}
                                          onClick={() => onImageDelete(false)}>
                                    Удалить изображение
                                </button>
                                : <>
                                    {
                                        hasBackImg
                                            ? <input type="file" className='file' {...register('backImg')} />
                                            : <button type='button' className='add__image__btn'
                                                      onClick={() => setBackImg(true)}>
                                                Добавить изображение
                                            </button>
                                    }
                                </>
                        }
                        <div className='modal__buttons'>
                            <button type='submit' className='modal_submit main__btn'
                                    disabled={isLoading || isLoading2}>
                                Сохранить
                            </button>

                            <button type='button' className='modal_submit delete__btn'
                                    disabled={isLoading1} onClick={onDelete}>
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
                            images[side ? 0 : 1]
                                ? <img className='card__image' src={images[side ? 0 : 1]} onClick={flip}
                                       alt={watch(side ? 'frontSide' : 'backSide')}/>
                                : <p className='card__text' onClick={flip}>{watch(side ? 'frontSide' : 'backSide')}</p>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
