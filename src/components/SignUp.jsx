import React from 'react'
import {useForm} from 'react-hook-form';
import {useSignUp} from '../hooks/useAuth';

export default function SignUp() {
    const {register, watch, formState: {errors,}, handleSubmit} = useForm();
    const {isLoading, signUp} = useSignUp();
    return (
        <div className='signin'>
            <form onSubmit={handleSubmit(signUp)}>
                <h1>Регистрация</h1>
                <label>
                    Логин
                    <input type="text"
                           className={errors?.login ? 'invalid' : ''}
                           {...register('login', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 30,
                                   message: 'Максимальная длинна 30 символов'
                               }
                           })} />
                    {errors?.login && <p className='error'>{errors?.login.message}</p>}
                </label>
                <label>
                    Электронная почта
                    <input type="email"
                           className={errors?.email ? 'invalid' : ''}
                           {...register('email', {required: 'Обязательноe поле.'})} />
                    {errors?.email && <p className='error'>{errors?.email.message}</p>}
                </label>
                <label>
                    Имя
                    <input type="text"
                           className={errors?.firstName ? 'invalid' : ''}
                           {...register('firstName', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длинна 30 символов'
                               }
                           })} />
                    {errors?.firstName && <p className='error'>{errors?.firstName.message}</p>}
                </label>
                <label>
                    Фамилия
                    <input type="text"
                           className={errors?.lastName ? 'invalid' : ''}
                           {...register('lastName', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длинна 30 символов'
                               }
                           })} />
                    {errors?.lastName && <p className='error'>{errors?.lastName.message}</p>}
                </label>
                <label>
                    Населенный пункт
                    <input type="text"
                           className={errors?.location ? 'invalid' : ''}
                           {...register('location', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длинна 30 символов'
                               }
                           })} />
                    {errors?.location && <p className='error'>{errors?.location.message}</p>}
                </label>
                <label>
                    Пароль
                    <input type="password"
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', {
                               required: 'Обязательноe поле.',
                               pattern: {
                                   value: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                   message: 'Минимум 8 символов, 1 цифра, заглавная и строчная буквы,'
                               }
                           })} />
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <label>
                    Подтвердите пароль
                    <input type="password"
                           className={errors?.confirmPassword ? 'invalid' : ''}
                           {...register('confirmPassword', {
                               required: 'Обязательноe поле.',
                               validate: (value) => {
                                   return watch('password') === value || "Пароли не совпадают.";
                               }
                           })} />
                    {errors?.confirmPassword && <p className='error'>{errors?.confirmPassword.message}</p>}
                </label>
                <button type='submit ' className='modal_submit main__btn' disabled={isLoading}>Зарегистрироваться
                </button>
            </form>
        </div>
    )
}
