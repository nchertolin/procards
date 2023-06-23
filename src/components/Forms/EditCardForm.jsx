import React, {useState} from 'react';
import {clickOutsideHandler, getImagesList, showConfirmAlert} from '../../utils';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useForm} from 'react-hook-form';
import {useDeleteCard, useEditCard, useImage, useImageDelete} from '../../hooks/useEditorDeck';
import {useImages} from '../../hooks/useCard';
import {useParams} from 'react-router-dom';
import Loading from '../Loading/Loading';
import {AddImageButton, ResetImageButton} from "../UI/ImageInputs";
import {CARD_SIDE_TEXT_OPTIONS} from "../../validationOptions";
import TrainingCard from "../TrainingCard";

export default function EditCardForm() {
    const {deckId} = useParams();
    const {setEditCardFormOpened, selectedCard, setCardSelected} = useContext(FormsContext);
    const toggleText = side => side
        ? selectedCard.hasFrontImage = !selectedCard.hasFrontImage
        : selectedCard.hasBackImage = !selectedCard.hasBackImage;

    const {isLoading, editCard} = useEditCard(setEditCardFormOpened);
    const {isLoading: isLoading1, deleteCard} = useDeleteCard(setEditCardFormOpened);
    const {isLoading: isLoading2, addImage} = useImage();
    const {isLoading: isLoading3, deleteImage} = useImageDelete(toggleText);
    const {isLoading: isLoading4, images} = useImages(deckId, selectedCard);
    const [side, setSide] = useState(true);
    const {register, formState: {errors}, handleSubmit, watch, reset, getValues} = useForm({
        defaultValues: {frontSide: selectedCard?.frontSide, backSide: selectedCard?.backSide}
    });

    const imagesList = getImagesList(
        images[0] ? images[0] : watch('frontImg'),
        images[1] ? images[1] : watch('backImg')
    );

    const closeModal = e => clickOutsideHandler(
        e,
        '.modal__wrapper',
        setEditCardFormOpened,
        () => setCardSelected(null)
    );

    const onSubmit = async (data) => {
        await editCard({...data, cardId: selectedCard.id});
        if (imagesList[0]) {
            const formData = new FormData();
            formData.append('file', data.frontImg[0])
            addImage({cardId: selectedCard.id, formData, side: true});
        }
        if (imagesList[1]) {
            const formData = new FormData();
            formData.append('file', data.backImg[0]);
            addImage({cardId: selectedCard.id, formData, side: false})
        }
    }

    const onDelete = () => showConfirmAlert(
        'Вы действительно хотите удалить карточку?',
        () => deleteCard(selectedCard.id)
    );

    const onImageDelete = (isFront) => showConfirmAlert(
        'Вы действительно хотите удалить изображение?',
        () => deleteImage({cardId: selectedCard.id, side: isFront})
    );


    const onImageReset = (isFront) => isFront
        ? reset({frontImg: null, backImg: getValues('backImg'), frontSide: getValues('frontSide')})
        : reset({frontImg: getValues('frontImg'), backImg: null, backSide: getValues('backSide')});


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
                                      {...register('frontSide', CARD_SIDE_TEXT_OPTIONS)} />
                            {errors?.frontSide && <p className='error'>{errors?.frontSide.message}</p>}
                        </label>
                        {
                            selectedCard.hasFrontImage
                                ? <ResetImageButton onClick={() => onImageDelete(true)}/>
                                : imagesList[0]
                                    ? <ResetImageButton onClick={() => onImageReset(true)}/>
                                    : <label>
                                        <AddImageButton/>
                                        <input type="file" className='file' accept='image/*'
                                               {...register('frontImg')}
                                        />
                                    </label>
                        }
                        <label>
                            <textarea placeholder='Обратная сторона'
                                      className={errors?.backSide ? 'invalid' : ''}
                                      {...register('backSide', CARD_SIDE_TEXT_OPTIONS)} />
                            {errors?.backSide && <p className='error'>{errors?.backSide.message}</p>}
                        </label>
                        {
                            selectedCard.hasBackImage
                                ? <ResetImageButton onClick={() => onImageDelete(false)}/>
                                : imagesList[1]
                                    ? <ResetImageButton onClick={() => onImageReset(false)}/>
                                    : <label>
                                        <AddImageButton/>
                                        <input type="file" className='file' accept='image/*'
                                               {...register('backImg')}
                                        />
                                    </label>
                        }
                        <div className='modal__buttons'>
                            <button type='submit' className='modal_submit main__btn'
                                    disabled={isLoading || isLoading2 || isLoading3}>
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
                    <TrainingCard
                        images={imagesList}
                        side={side}
                        setSide={setSide}
                        card={{frontSide: watch('frontSide'), backSide: watch('backSide')}}
                    />
                    <p>Нажатие на карточку перевернет ее.</p>
                </div>
            </div>
        </div>
    )
}

