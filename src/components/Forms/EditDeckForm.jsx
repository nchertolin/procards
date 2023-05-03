import React from 'react';
import {clickOutsideHandler, notifySuccess, ORIGIN} from '../../util';
import {useForm} from 'react-hook-form';
import {useContext} from 'react';
import {FormsContext} from '../../providers/FormsProvider';
import {useDeleteDeck, useEditDeck, useEditDeckPassword} from '../../hooks/useEditorDecks';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {confirmAlert} from 'react-confirm-alert';

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
    const inviteUrl = `${ORIGIN}/learn/add/${selectedDeck.deckId}`
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

    const onDelete = () => confirmAlert({
        title: 'Подтвердите удаление',
        message: 'Вы действительно хотите удалить колоду?',
        buttons: [
            {label: 'Да', onClick: () => deleteDeck(selectedDeck.deckId)},
            {label: 'Отмена'}
        ]
    });

    const onCopy = () => notifySuccess('Ссылка на приглашение скопирована');

    const closeModal = e => clickOutsideHandler(e, '.modal__wrapper', setEditFormOpened);

    return (
        <div className='modal'
             onClick={closeModal}>
            <div className='modal__wrapper'>
                <h3>Редактировать колоду</h3>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <label>
                        <input type="text" placeholder='Название колоды'
                               className={errors?.name ? 'invalid' : ''}
                               {...register('name', {
                                   required: 'Обязательное поле.',
                                   maxLength: {
                                       value: 40,
                                       message: 'Максимальная длина 40 символов'
                                   }
                               })} />
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
                            <input type="text"
                                   placeholder='Новый пароль колоды'
                                   className={errors?.password ? 'invalid' : ''}
                                   {...register('password', {
                                       required: {
                                           value: selectedDeck.isPrivate.toString() !== watch('isPrivate'),
                                           message: 'Обязательное поле.'
                                       },
                                       pattern: {
                                           value: /^(?=^.{2,100}$)/,
                                           message: 'Минимум 2 символа.'
                                       },
                                       disabled: watch('isPrivate') === 'true'
                                   })} />
                            <i>Оставьте поле пустым, если желаете сохранить текущий пароль</i>
                            {errors?.password && <p className='error'>{errors?.password.message}</p>}
                        </label>
                    }
                    <label>
                        <textarea className={errors?.description ? 'invalid' : ''} placeholder='Описание'
                                  {...register('description', {
                                      required: 'Обязательное поле.',
                                      maxLength: {
                                          value: 300,
                                          message: 'Максимальная длина 300 символов'
                                      }
                                  })}  />
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
                    {watch('isPrivate') === 'false' &&
                        <CopyToClipboard text={inviteUrl} onCopy={onCopy}>
                            <button type='button' className='modal_submit main__btn' disabled={isLoading1}>
                                Скопировать ссылку для приглашения участников
                            </button>
                        </CopyToClipboard>}
                </form>
            </div>
        </div>
    )
}
