import React, {useState} from 'react';
import {clickOutsideHandler} from '../../util';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useForm} from 'react-hook-form';
import {useCreateCard, useImage} from '../../hooks/useEditorDeck';
import {useParams} from 'react-router-dom';

export default function AddCardForm() {
    const {deckId} = useParams();
    const {setAddCardFormOpened} = useContext(FormsContext);
    const {register, formState: {errors,}, handleSubmit, watch, reset, getValues} = useForm();
    const {isLoading, createCard} = useCreateCard(setAddCardFormOpened);
    const {isLoading: isLoading1, addImage} = useImage();
    const [side, setSide] = useState(true);
    const [hasFrontImage, setFrontImg] = useState(false);
    const [hasBackImage, setBackImg] = useState(false);

    const onSubmit = async (data) => {
        const cardId = await createCard({...data, deckId});
        if (cardId) {
            if (hasFrontImage && watch('frontImg')[0]) {
                const formData = new FormData();
                formData.append('file', watch('frontImg')[0])
                addImage({cardId, formData, side: true});
            }
            if (hasBackImage && watch('backImg')[0]) {
                const formData = new FormData();
                formData.append('file', watch('backImg')[0]);
                addImage({cardId, formData, side: false})
            }
        }
    };

    const flip = e => {
        e.stopPropagation();
        setSide(!side);
        e.target.parentElement.classList.toggle('flipped')
    };

    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper',
        setAddCardFormOpened);

    const resetImage = isFront => {
        if (isFront) {
            setFrontImg(false);
            reset({frontImg: undefined, frontSide: getValues('frontSide')});
        } else {
            setBackImg(false);
            reset({backImg: undefined, backSide: getValues('backSide')});
        }
    };


    return (
        <div className='modal'
             onClick={closeModal}>
            <div className='modal__wrapper card__modal'>
                <div className='modal__card__form'>
                    <h3>Новая карточка</h3>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <label>
                            <textarea placeholder='Лицевая сторона' className={errors?.frontSide ? 'invalid' : ''}
                                      {...register('frontSide', {
                                          required: 'Обязательноe поле.',
                                          pattern: {
                                              value: /^(?=^.{1,800}$)/,
                                              message: 'Максимум 800 символов.'
                                          }
                                      })} />
                            {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                        </label>
                        {hasFrontImage
                            ? <div className='file__wrapper'>
                                <input type="file" className='file' {...register('frontImg')} />
                                <button type='button' className='error' onClick={() => resetImage(true)}>
                                    Сбросить
                                </button>
                            </div>
                            : <button type='button' onClick={() => setFrontImg(true)} className='add__image__btn'>
                                Добавить изображение
                            </button>}
                        <label>
                            <textarea placeholder='Обратная сторона' className={errors?.backSide ? 'invalid' : ''}
                                      {...register('backSide',
                                          {
                                              required: 'Обязательноe поле.',
                                              pattern: {
                                                  value: /^(?=^.{1,800}$)/,
                                                  message: 'Максимум 800 символов.'
                                              }
                                          })} />
                            {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                        </label>
                        {hasBackImage
                            ? <div className='file__wrapper'>
                                <input type="file" className='file' {...register('backImg')} />
                                <button type='button' className='error' onClick={() => resetImage(false)}>
                                    Сбросить
                                </button>
                            </div>
                            : <button type='button' onClick={() => setBackImg(true)} className='add__image__btn'>
                                Добавить изображение
                            </button>}
                        <button type='submit' className='modal_submit main__btn'
                                disabled={isLoading || isLoading1}>
                            Сохранить
                        </button>
                    </form>
                </div>
                <div className='modal__card__wrapper'>
                    <button className='card training__card'
                            onClick={(e) => {
                                setSide(!side);
                                e.target.classList.toggle('flipped')
                            }}>
                        {watch(side ? 'frontImg' : 'backImg') && watch(side ? 'frontImg' : 'backImg')[0]
                            ? <img className='card__image'
                                   src={URL.createObjectURL(watch(side ? 'frontImg' : 'backImg')[0])}
                                   alt="" onClick={flip}
                            />
                            : <p className='card__text' onClick={flip}>{watch(side ? 'frontSide' : 'backSide')}</p>}
                    </button>
                    <p>Нажатие на карточку перевернет ее.</p>
                </div>
            </div>
        </div>
    )
}
