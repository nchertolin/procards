import React from 'react';
import {useParams} from "react-router-dom";
import {useAddDeck} from "../hooks/useDeck";
import {useForm} from "react-hook-form";

function DeckAdd() {
    const {deckId} = useParams();
    const {register, formState: {errors,}, handleSubmit} = useForm();
    const {isLoading, addDeck} = useAddDeck();

    const onSubmit = data => addDeck({...data, deckId});

    return (
        <div className='add__deck__wrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Добавить колоду</h1>
                <h2>Введите предоставленный вам пароль колоды</h2>
                <label>
                    Пароль
                    <input type="password" disabled={isLoading}
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', {required: 'Обязательное поле.'})} />
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <button className='modal_submit main__btn' disabled={isLoading}>Добавить</button>
            </form>
        </div>
    );
}

export default DeckAdd;