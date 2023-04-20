import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useSignIn } from '../hooks/useAuth';

export default function SignIn() {
   const { register, formState: { errors, }, handleSubmit } = useForm();
   const { isLoading, signIn } = useSignIn();

   return (
      <div className='signin'>
         <form onSubmit={handleSubmit(signIn)}>
            <h1>Вход</h1>
            <label>
               Логин или эл. почта
               <input type="text"
                  className={errors?.login ? 'invalid' : ''}
                  {...register('login', { required: 'Обязательноe поле.' })} />
               {errors?.login && <p className='error'>{errors?.login.message}</p>}
            </label>
            <label>
               Пароль
               <input type="password"
                  className={errors?.password ? 'invalid' : ''}
                  {...register('password', { required: 'Обязательноe поле.' })} />
               {errors?.password && <p className='error'>{errors?.password.message}</p>}
            </label>
            <div className='sign-in__forgot'>
               <Link to='forgot'>Забыли пароль?</Link>
            </div>
            <button type='submit' className='modal_submit main__btn' disabled={isLoading}>Войти</button>
            <div className='sign-in__signup'>
               <p>Нет аккаунта?</p>
               <Link to='/signup'>Зарегистрироваться</Link>
            </div>
         </form>
      </div>
   )
}
