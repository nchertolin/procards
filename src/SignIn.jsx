import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const { register, formState: { errors, }, handleSubmit } = useForm({ mode: "onBlur" });
  return (
    <div className='signin'>
      <form onSubmit={handleSubmit()}>
        <h1>Вход</h1>
        <label>
          Электронная почта
          <input type="email"
            className={errors?.email ? 'invalid' : ''}
            {...register('email', { required: 'Обязательноe поле.' })} />
          {errors?.email && <p className='error'>{errors?.email.message}</p>}
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
        <button className='modal_submit'>Войти</button>
        <div className='sign-in__signup'>
          <p>Нет аккаунта?</p>
          <Link to='/signup'>Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  )
}
