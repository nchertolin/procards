import React from 'react'
import {useForm} from 'react-hook-form';
import {useSignUp} from '../../hooks/useAuth';
import {USER_OPTIONS} from "../../validationOptions";

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
                           {...register('login', USER_OPTIONS.LOGIN)} />
                    {errors?.login && <p className='error'>{errors?.login.message}</p>}
                </label>
                <label>
                    <input type="email" placeholder='Эл. почта'
                           className={errors?.email ? 'invalid' : ''}
                           {...register('email', USER_OPTIONS.EMAIL)} />
                    {errors?.email && <p className='error'>{errors?.email.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Имя'
                           className={errors?.firstName ? 'invalid' : ''}
                           {...register('firstName', USER_OPTIONS.NAME)} />
                    {errors?.firstName && <p className='error'>{errors?.firstName.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Фамилия'
                           className={errors?.lastName ? 'invalid' : ''}
                           {...register('lastName', USER_OPTIONS.NAME)} />
                    {errors?.lastName && <p className='error'>{errors?.lastName.message}</p>}
                </label>
                <label>
                    <input type="text" placeholder='Населенный пункт'
                           className={errors?.location ? 'invalid' : ''}
                           {...register('location', USER_OPTIONS.LOCATION)} />
                    {errors?.location && <p className='error'>{errors?.location.message}</p>}
                </label>
                <label>
                    <input type="password" placeholder='Пароль'
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', USER_OPTIONS.PASSWORD)} />
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <label>
                    <input type="password" placeholder='Повторите пароль'
                           className={errors?.confirmPassword ? 'invalid' : ''}
                           {...register('confirmPassword', {
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
