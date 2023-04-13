import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNewPassword, useRecovery } from '../hooks/useAuth';

export default function Recovery() {
   const [isEmailSended, setEmailSended] = useState(false);
   const [isCodeSended, setCodeSended] = useState(false);
   const { register, formState: { errors, }, handleSubmit, watch } = useForm();
   const { isLoading, recovery } = useRecovery();
   const { isLoading1, setNewPassword } = useNewPassword();

   const onSubmit = data => {
      if (isCodeSended) {
         delete data.сpassword;
         setNewPassword(data);
         return;
      }

      if (isEmailSended) {
         recovery({ data, isEmailSended });
         setCodeSended(true);
      } else {
         recovery({ data, isEmailSended });
         setEmailSended(true);
      }

   }

   return (
      <div className='signin'>
         <form onSubmit={handleSubmit(onSubmit)}>
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
               <input type="tel" disabled={isCodeSended} autoComplete='off'
                  className={errors?.code ? 'invalid' : ''}
                  {...register('code', {
                     required: 'Обязательноe поле.',
                     disabled: !isEmailSended,
                  })} />
               {errors?.code && <p className='error'>{errors?.code.message}</p>}
            </label>
            <label>
               Новый пароль
               <input type="password"
                  className={errors?.password ? 'invalid' : ''}
                  {...register('password', {
                     required: 'Обязательноe поле.',
                     disabled: !isCodeSended
                  })} />
               {errors?.password && <p className='error'>{errors?.password.message}</p>}
            </label>
            <label>
               Подтвердите новый пароль
               <input type="password"
                  className={errors?.сpassword ? 'invalid' : ''}
                  {...register('сpassword', {
                     required: 'Обязательноe поле.',
                     disabled: !isCodeSended,
                     validate: (value) => {
                        return watch('password') === value || "Пароли не совпадают.";
                     }
                  })} />
               {errors?.сpassword && <p className='error'>{errors?.сpassword.message}</p>}
            </label>
            <button className='modal_submit' disabled={isLoading || isLoading1}>Отправить</button>
         </form>
      </div>
   )
}
