import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/authService';

export default function Recovery() {
  const [isEmailSended, setEmailSended] = useState();
  const [isCodeSended, setCodeSended] = useState();
  const { register, formState: { errors, }, handleSubmit } = useForm();

  const recovery = (data) => {
    if (isCodeSended) {
      AuthService.setNewPassword(data);
    } else if (isEmailSended) {
      AuthService.passwordRecovery(data, isEmailSended);
      setCodeSended(true);
    } else {
      AuthService.passwordRecovery(data, isEmailSended);
      setEmailSended(true);
    }
  }

  return (
    <div className='signin'>
      <form onSubmit={handleSubmit(recovery)}>
        <h1>Восстановление доступа</h1>
        <h2>Введите адрес электронной почты, связанный с вашей учетной записью и мы вышлем вам код для смены пароля.</h2>
        <label>
          Электронная почта
          <input type="email" disabled={isEmailSended}
            className={errors?.email ? 'invalid' : ''}
            {...register('email', {
              required: 'Обязательноe поле.'
            })} />
          {errors?.email && <p className='error'>{errors?.email.message}</p>}
        </label>
        <label>
          Код из письма
          <input type="tel" disabled={isCodeSended}
            className={errors?.code ? 'invalid' : ''}
            {...register('code', {
              required: 'Обязательноe поле.',
              disabled: !isEmailSended,
            })} />
          {errors?.code && <p className='error'>{errors?.code.message}</p>}
        </label>
        <label>
          Новый пароль
          <input type="text"
            className={errors?.password ? 'invalid' : ''}
            {...register('password', {
              required: 'Обязательноe поле.',
              disabled: !isCodeSended
            })} />
          {errors?.password && <p className='error'>{errors?.password.message}</p>}
        </label>
        <button className='modal_submit'>Отправить</button>
      </form>
    </div>
  )
}
