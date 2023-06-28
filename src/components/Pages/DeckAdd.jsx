import React from 'react';
import {useParams} from "react-router-dom";
import {useAddDeck} from "../../hooks/useDeck";
import {useForm} from "react-hook-form";
import {WithAuth} from "../../hoc/withAuth";
import {REQUIRED_FIELD} from "../../js/validationOptions";
import Navigation from "../UI/Navigation";

function DeckAdd() {
    const {deckId} = useParams();
    const {register, formState: {errors,}, handleSubmit} = useForm();
    const {isLoading, addDeck} = useAddDeck();

    const onSubmit = data => addDeck({...data, deckId});

    return (
        <div className='add__deck__wrapper'>
            <Navigation parentText='Добавить колоду'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Введите предоставленный вам пароль колоды</h2>
                <label>
                    <input type="password" disabled={isLoading} autoFocus
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', REQUIRED_FIELD)}
                           placeholder='Пароль'/>
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <button className='modal_submit main__btn' disabled={isLoading}>Добавить</button>
            </form>
        </div>
    );
}

export default WithAuth(DeckAdd);
