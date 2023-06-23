import React from 'react';
import {clickOutsideHandler, generateInviteLink, showConfirmAlert} from '../../utils';
import {useForm} from 'react-hook-form';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useDeleteDeck, useEditDeck, useEditDeckPassword} from '../../hooks/useEditorDecks';
import CopyLinkElement from "../UI/CopyLinkElement";
import {DECK_OPTIONS} from "../../validationOptions";

export default function EditDeckForm() {
    const {setEditFormOpened, selectedDeck} = useContext(FormsContext);
    const {register, formState: {errors,}, handleSubmit, watch} = useForm({
        defaultValues: {
            name: selectedDeck.deckName,
            isPrivate: selectedDeck.isPrivate.toString(),
            password: '',
            description: selectedDeck.description,
        }
    });
    const {isLoading, editDeck} = useEditDeck(setEditFormOpened);
    const {isLoading: isLoading2, editPassword} = useEditDeckPassword(setEditFormOpened);
    const {isLoading: isLoading1, deleteDeck} = useDeleteDeck(setEditFormOpened);

    const onSubmit = ({name, isPrivate, password, description}) => {
        editDeck({name, description, deckId: selectedDeck.deckId});
        if (password !== '' || isPrivate !== selectedDeck.isPrivate.toString()) {
            editPassword({
                password: isPrivate === 'true' ? 'pass' : password,
                isPrivate,
                deckId: selectedDeck.deckId
            });
        }
    };

    const onDelete = () => showConfirmAlert(
        'Вы действительно хотите удалить колоду?',
        () => deleteDeck(selectedDeck.deckId)
    );

    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper', setEditFormOpened);


    return (
        <div className='modal' onClick={closeModal}>
            <div className='modal__wrapper'>
                <h3>Редактировать колоду</h3>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <label>
                        <input type="text" className={errors?.name ? 'invalid' : ''}
                               {...register('name', DECK_OPTIONS.NAME)}
                               placeholder='Название колоды'
                        />
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
                        <>
                            <label>
                                <input type="text" className={errors?.password ? 'invalid' : ''}
                                       title='Оставьте поле пустым, если желаете сохранить текущий пароль'
                                       {...register('password', {
                                           ...DECK_OPTIONS.PASSWORD,
                                           disabled: watch('isPrivate') === 'true'
                                       })}
                                       placeholder='Новый пароль колоды'
                                />
                                {errors?.password && <p className='error'>{errors?.password.message}</p>}
                            </label>
                            <CopyLinkElement inviteUrl={generateInviteLink(selectedDeck.deckId)}/>
                        </>
                    }
                    <label>
                        <textarea className={errors?.description ? 'invalid' : ''}
                                  {...register('description', DECK_OPTIONS.DESCRIPTIONS)}
                                  placeholder='Описание'
                        />
                        {errors?.description && <p className='error'>{errors?.description.message}</p>}
                    </label>
                    <div className='modal__buttons'>
                        <button type="submit" className='modal_submit main__btn'
                                disabled={isLoading || isLoading2}>
                            Сохранить
                        </button>
                        <button type="button" className='modal_submit delete__btn'
                                onClick={onDelete}
                                disabled={isLoading1}>
                            Удалить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
