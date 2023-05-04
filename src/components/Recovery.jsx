import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import {useNewPassword, useRecovery} from '../hooks/useAuth';

export default function Recovery() {
    const [isLoginSent, setLoginSent] = useState(false);
    const [isCodeSent, setCodeSent] = useState(false);
    const {register, formState: {errors,}, handleSubmit, watch} = useForm();
    const {isLoading, recovery} = useRecovery(isLoginSent, setCodeSent);
    const {isLoading1, setNewPassword} = useNewPassword();

    const onSubmit = async data => {
        if (isCodeSent) {
            delete data.cpassword;
            await setNewPassword(data);
            return;
        }

        if (isLoginSent) {
            await recovery({data, isLoginSent});
        } else {
            await recovery({data, isLoginSent});
            setLoginSent(true);
        }

    }

    return (
        <div className='signin'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Восстановление доступа</h1>
                <h2>Введите логин, связанный с вашей учетной записью и мы вышлем вам код для смены пароля на
                    электронную почту.</h2>
                <label>
                    Логин
                    <input type="text" disabled={isLoginSent}
                           className={errors?.login ? 'invalid' : ''}
                           {...register('login', {required: 'Обязательноe поле.'})} />
                    {errors?.login && <p className='error'>{errors?.login.message}</p>}
                </label>
                <label>
                    Код из письма
                    <input type="tel" disabled={isCodeSent} autoComplete='off'
                           className={errors?.code ? 'invalid' : ''}
                           {...register('code', {
                               required: 'Обязательноe поле.',
                               disabled: !isLoginSent,
                           })} />
                    {errors?.code && <p className='error'>{errors?.code.message}</p>}
                </label>
                <label>
                    Новый пароль
                    <input type="password"
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', {
                               required: 'Обязательноe поле.',
                               pattern: {
                                   value: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-ZА-Я])(?=.*[a-zа-я]).*$/,
                                   message: 'Минимум 8 символов, максимум 40. Одна цифра, заглавная и строчная буквы.'
                               },
                               disabled: !isCodeSent
                           })} />
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <label>
                    Подтвердите новый пароль
                    <input type="password"
                           className={errors?.cpassword ? 'invalid' : ''}
                           {...register('cpassword', {
                               required: 'Обязательноe поле.',
                               disabled: !isCodeSent,
                               validate: (value) => {
                                   return watch('password') === value || "Пароли не совпадают.";
                               }
                           })} />
                    {errors?.cpassword && <p className='error'>{errors?.cpassword.message}</p>}
                </label>
                <button className='modal_submit main__btn' disabled={isLoading || isLoading1}>Отправить</button>
            </form>
        </div>
    )
}
