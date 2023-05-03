import React, {useState} from 'react';
import {clickOutsideHandler} from '../../util';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useForm} from 'react-hook-form';
import {useDeleteCard, useEditCard, useImage, useImageDelete} from '../../hooks/useEditorDeck';
import {useImages} from '../../hooks/useCard';
import {useParams} from 'react-router-dom';
import Loading from '../Loading/Loading';
import {confirmAlert} from "react-confirm-alert";

export default function EditCardForm() {
    const {deckId} = useParams();
    const {setEditCardFormOpened, selectedCard, setCardSelected} = useContext(FormsContext);
    const {register, formState: {errors}, handleSubmit, watch, reset, getValues} = useForm({
        defaultValues: {
            frontSide: selectedCard?.frontSide,
            backSide: selectedCard?.backSide
        }
    });
    const toggleText = side => side
        ? selectedCard.hasFrontImage = !selectedCard.hasFrontImage
        : selectedCard.hasBackImage = !selectedCard.hasBackImage;

    const {isLoading, editCard} = useEditCard(setEditCardFormOpened);
    const {isLoading: isLoading1, deleteCard} = useDeleteCard(setEditCardFormOpened);
    const {isLoading: isLoading2, addImage} = useImage();
    const {isLoading: isLoading3, deleteImage} = useImageDelete(toggleText);
    const {isLoading: isLoading4, images} = useImages(deckId, selectedCard);
    const [side, setSide] = useState(true);
    const [hasFrontImg, setFrontImg] = useState(false);
    const [hasBackImg, setBackImg] = useState(false);

    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper',
        setEditCardFormOpened, () => setCardSelected(null));

    const onSubmit = async data => {
        await editCard({...data, cardId: selectedCard.id});
        if (hasFrontImg && watch('frontImg')[0]) {
            const formData = new FormData();
            formData.append('file', watch('frontImg')[0])
            addImage({cardId: selectedCard.id, formData, side: true});
        }
        if (hasBackImg && watch('backImg')[0]) {
            const formData = new FormData();
            formData.append('file', watch('backImg')[0]);
            addImage({cardId: selectedCard.id, formData, side: false})
        }
    }

    const onDelete = () => confirmAlert({
        title: 'Подтвердите удаление',
        message: 'Вы действительно хотите удалить карточку?',
        buttons: [
            {label: 'Да', onClick: () => deleteCard(selectedCard.id)},
            {label: 'Отмена'}
        ]
    });

    const onImageDelete = isFront => confirmAlert({
        title: 'Подтвердите удаление',
        message: 'Вы действительно хотите удалить изображение?',
        buttons: [
            {label: 'Да', onClick: () => deleteImage({cardId: selectedCard.id, side: isFront})},
            {label: 'Отмена'}
        ]
    });

    const flip = e => {
        e.stopPropagation();
        setSide(!side);
        e.target.parentElement.classList.toggle('flipped')
    };

    const resetImage = isFront => {
        if (isFront) {
            setFrontImg(false);
            reset({frontImg: undefined, frontSide: getValues('frontSide')});
        } else {
            setBackImg(false);
            reset({backImg: undefined, backSide: getValues('backSide')});
        }
    };


    if (isLoading4) return <div className='modal'><Loading/></div>

    return (
        <div className='modal'
             onClick={closeModal}>
            <div className='modal__wrapper card__modal'>
                <div className='modal__card__form'>
                    <h3>Редактировать карточку</h3>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <label>
                            <textarea placeholder='Лицевая сторона'
                                      className={errors?.frontSide ? 'invalid' : ''}
                                      {...register('frontSide', {
                                          required: 'Обязательное поле.',
                                          pattern: {
                                              value: /^(?=^.{1,800}$)/,
                                              message: 'Максимум 800 символов.'
                                          }
                                      })} />
                            {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                        </label>
                        {selectedCard.hasFrontImage
                            ? <button type='button' className='add__image__btn error' disabled={isLoading3}
                                      onClick={() => onImageDelete(true)}>
                                Удалить изображение
                            </button>
                            : <>
                                {
                                    hasFrontImg
                                        ? <div className='file__wrapper'>
                                            <input type="file" className='file' {...register('frontImg')} />
                                            <button type='button' className='error' onClick={() => resetImage(true)}>
                                                Сбросить
                                            </button>
                                        </div>
                                        : <button type='button' onClick={() => setFrontImg(true)}
                                                  className='add__image__btn'>
                                            Добавить изображение
                                        </button>
                                }
                            </>}
                        <label>
                            <textarea placeholder='Обратная сторона'
                                      className={errors?.backSide ? 'invalid' : ''}
                                      {...register('backSide', {
                                          required: 'Обязательное поле.',
                                          pattern: {
                                              value: /^(?=^.{1,800}$)/,
                                              message: 'Максимум 800 символов.'
                                          }
                                      })} />
                            {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                        </label>
                        {selectedCard.hasBackImage
                            ? <button type='button' className='add__image__btn error' disabled={isLoading3}
                                      onClick={() => onImageDelete(false)}>
                                Удалить изображение
                            </button>
                            : <>
                                {hasBackImg
                                    ? <div className='file__wrapper'>
                                        <input type="file" className='file' {...register('backImg')} />
                                        <button type='button' className='error' onClick={() => resetImage(false)}>
                                            Сбросить
                                        </button>
                                    </div>
                                    : <button type='button' className='add__image__btn'
                                              onClick={() => setBackImg(true)}>
                                        Добавить изображение
                                    </button>}
                            </>}
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
                <div className='modal__card__wrapper'>
                    <button className='card training__card'
                            onClick={(e) => {
                                setSide(!side);
                                e.target.classList.toggle('flipped')
                            }}>
                        {images[side ? 0 : 1]
                            ? <img className='card__image' src={images[side ? 0 : 1]} onClick={flip}
                                   alt={watch(side ? 'frontSide' : 'backSide')}/>
                            : watch(side ? 'frontImg' : 'backImg') && watch(side ? 'frontImg' : 'backImg')[0]
                                ? <img className='card__image'
                                       src={URL.createObjectURL(watch(side ? 'frontImg' : 'backImg')[0])}
                                       alt="" onClick={flip}/>
                                : <p className='card__text' onClick={flip}>{watch(side ? 'frontSide' : 'backSide')}</p>}
                    </button>
                    <p>Нажатие на карточку перевернет ее.</p>
                </div>
            </div>
        </div>
    )
}
