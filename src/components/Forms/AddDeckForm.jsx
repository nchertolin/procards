import React, {useContext} from 'react'
import {clickOutsideHandler} from '../../js/utils'
import {useForm} from 'react-hook-form'
import {FormsContext} from '../../providers/FormsProvider';
import {useCreateDeck, useEditDeckPassword} from '../../hooks/useEditorDecks';
import {DECK_OPTIONS} from "../../js/validationOptions";

export default function AddDeckForm() {
    const {setAddFormOpened} = useContext(FormsContext);
    const {register, formState: {errors,}, handleSubmit, watch, reset} = useForm({
        defaultValues: {isPrivate: 'true'}
    });

    const {isLoading, createDeck} = useCreateDeck(reset, setAddFormOpened);
    const {isLoading: isLoading1, editPassword} = useEditDeckPassword(reset, setAddFormOpened);

    const onSubmit = async data => {
        const deckId = await createDeck(data);
        if (deckId && data.isPrivate === 'false') {
            editPassword({...data, deckId});
        }
    };
    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper', setAddFormOpened);


    return (
        <div className='modal'
             onClick={closeModal}>
            <div className='modal__wrapper'>
                <h3>Новая колода</h3>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <label>
                        <input type="text" placeholder='Название колоды'
                               className={errors?.name ? 'invalid' : ''}
                               {...register('name', DECK_OPTIONS.NAME)} />
                        {errors?.name && <p className='error'>{errors?.name.message}</p>}
                    </label>
                    <div className='privacy'>
                        <label>
                            <input type="radio" value='false' {...register('isPrivate')} />
                            Публичная
                        </label>
                        <label>
                            <input type="radio" value='true' {...register('isPrivate')} />
                            Приватная
                        </label>
                    </div>
                    {
                        watch('isPrivate') === 'false' &&
                        <label>
                            <input type="text" placeholder='Пароль колоды'
                                   className={errors?.password ? 'invalid' : ''}
                                   {...register('password', {
                                       ...DECK_OPTIONS.PASSWORD,
                                       disabled: watch('isPrivate') === 'true'
                                   })} />
                            {errors?.password && <p className='error'>{errors?.password.message}</p>}
                        </label>
                    }
                    <label>
                  <textarea className={errors?.description ? 'invalid' : ''} placeholder='Описание'
                            {...register('description', DECK_OPTIONS.DESCRIPTIONS)} />
                        {errors?.description && <p className='error'>{errors?.description.message}</p>}
                    </label>
                    <button type='submit' className='modal_submit main__btn'
                            disabled={isLoading || isLoading1}>Добавить
                    </button>
                </form>
            </div>
        </div>
    )
}
