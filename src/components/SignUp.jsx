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
                    <input type="text" placeholder='Логин'
                           className={errors?.login ? 'invalid' : ''}
                           {...register('login', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 30,
                                   message: 'Максимальная длина 30 символов.'
                               }
                           })} />
                    {errors?.login && <p className='error'>{errors?.login.message}</p>}
                </label>
                <label>
                    <input type="email" placeholder='Эл. почта'
                           className={errors?.email ? 'invalid' : ''}
                           {...register('email', {
                               required: 'Обязательноe поле.',
                               pattern: {
                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                   message: 'Некорректный адрес эл. почты.'
                               }
                           })} />
                    {errors?.email && <p className='error'>{errors?.email.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Имя'
                           className={errors?.firstName ? 'invalid' : ''}
                           {...register('firstName', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длина 30 символов.'
                               }
                           })} />
                    {errors?.firstName && <p className='error'>{errors?.firstName.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Фамилия'
                           className={errors?.lastName ? 'invalid' : ''}
                           {...register('lastName', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длина 30 символов.'
                               }
                           })} />
                    {errors?.lastName && <p className='error'>{errors?.lastName.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Населенный пункт'
                           className={errors?.location ? 'invalid' : ''}
                           {...register('location', {
                               required: 'Обязательноe поле.',
                               maxLength: {
                                   value: 50,
                                   message: 'Максимальная длина 30 символов.'
                               }
                           })} />
                    {errors?.location && <p className='error'>{errors?.location.message}</p>}
                </label>
                <label>
                    <input type="password" placeholder='Пароль'
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', {
                               required: 'Обязательноe поле.',
                               pattern: {
                                   value: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                   message: 'Минимум 8 символов, 1 цифра, заглавная и строчная буквы.'
                               }
                           })} />
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <label>
                    <input type="password" placeholder='Повторите пароль'
                           className={errors?.confirmPassword ? 'invalid' : ''}
                           {...register('confirmPassword', {
                               required: 'Обязательноe поле.',
                               validate: value => {
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
