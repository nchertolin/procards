import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const { register, watch, formState: { errors, }, handleSubmit } = useForm({ mode: "onBlur" });
  return (
    <div className='signin'>
      <form onSubmit={handleSubmit()}>
        <h1>Регистрация</h1>
        <label>
          Электронная почта
          <input type="email"
            className={errors?.email ? 'invalid' : ''}
            {...register('email', { required: 'Обязательноe поле.' })} />
          {errors?.email && <p className='error'>{errors?.email.message}</p>}
        </label>
        <label>
          Имя
          <input type="text"
            className={errors?.firstName ? 'invalid' : ''}
            {...register('firstName', { required: 'Обязательноe поле.' })} />
          {errors?.firstName && <p className='error'>{errors?.firstName.message}</p>}
        </label>
        <label>
          Фамилия
          <input type="text"
            className={errors?.lastName ? 'invalid' : ''}
            {...register('lastName', { required: 'Обязательноe поле.' })} />
          {errors?.lastName && <p className='error'>{errors?.lastName.message}</p>}
        </label>
        <label>
          Пароль
          <input type="password"
            className={errors?.password ? 'invalid' : ''}
            {...register('password', { required: 'Обязательноe поле.' })} />
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
        <button className='modal_submit'>Зарегистрироваться</button>
      </form>
    </div>
  )
}
