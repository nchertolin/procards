import React, {useState} from 'react';
import {clickOutsideHandler, getImagesList} from '../../utils';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useForm} from 'react-hook-form';
import {useCreateCard, useImage} from '../../hooks/useEditorDeck';
import {useParams} from 'react-router-dom';
import {AddImageButton, ResetImageButton} from "../UI/ImageInputs";
import TrainingCard from "../TrainingCard";
import {CARD_SIDE_TEXT_OPTIONS} from "../../validationOptions";


export default function AddCardForm() {
    const {deckId} = useParams();
    const {setAddCardFormOpened} = useContext(FormsContext);
    const {register, formState: {errors}, handleSubmit, watch, reset, getValues} = useForm();
    const {isLoading, createCard} = useCreateCard(setAddCardFormOpened);
    const {isLoading: isLoading1, addImage} = useImage();
    const [side, setSide] = useState(true);
    const imagesList = getImagesList(watch('frontImg'), watch('backImg'));

    const onSubmit = async (data) => {
        const cardId = await createCard({...data, deckId});
        if (cardId) {
            if (imagesList[0]) {
                const formData = new FormData();
                formData.append('file', getValues('frontImg')[0])
                addImage({cardId, formData, side: true});
            }
            if (imagesList[1]) {
                const formData = new FormData();
                formData.append('file', getValues('backImg')[0]);
                addImage({cardId, formData, side: false})
            }
        }
    };

    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper',
        setAddCardFormOpened);

    const onImageReset = isFront => isFront
        ? reset({frontImg: null, backImg: getValues('backImg'), frontSide: getValues('frontSide')})
        : reset({frontImg: getValues('frontImg'), backImg: null, backSide: getValues('backSide')});


    return (
        <div className='modal'
             onClick={closeModal}>
            <div className='modal__wrapper card__modal'>
                <div className='modal__card__form'>
                    <h3>Новая карточка</h3>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <label>
                            <textarea className={errors?.frontSide ? 'invalid' : ''}
                                      {...register('frontSide', CARD_SIDE_TEXT_OPTIONS)}
                                      placeholder='Лицевая сторона'
                            />
                            {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                        </label>
                        {imagesList[0]
                            ? <ResetImageButton onClick={() => onImageReset(true)}/>
                            : <label>
                                <AddImageButton/>
                                <input type="file" className='file'
                                       {...register('frontImg')}
                                       accept='image/*'
                                />
                            </label>}
                        <label>
                            <textarea className={errors?.backSide ? 'invalid' : ''}
                                      {...register('backSide', CARD_SIDE_TEXT_OPTIONS)}
                                      placeholder='Обратная сторона'
                            />
                            {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                        </label>
                        {imagesList[1]
                            ? <ResetImageButton onClick={() => onImageReset(false)}/>
                            : <label>
                                <AddImageButton/>
                                <input type="file" className='file'
                                       {...register('backImg')}
                                       accept='image/*'
                                />
                            </label>}
                        <button type='submit' className='modal_submit main__btn'
                                disabled={isLoading || isLoading1}>
                            Сохранить
                        </button>
                    </form>
                </div>
                <div className='modal__card__wrapper'>
                    <TrainingCard
                        card={{frontSide: watch('frontSide'), backSide: watch('backSide')}}
                        images={imagesList}
                        side={side}
                        setSide={setSide}
                    />
                    <p>Нажатие на карточку перевернет ее.</p>
                </div>
            </div>
        </div>
    )
}
