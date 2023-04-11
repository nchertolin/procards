import React from 'react';
import { useForm } from 'react-hook-form';
import { WithAuth } from '../hoc/withAuth';
import { useUser } from '../hooks/useUser';
import Loading from './Loading/Loading';

function AccountEdit() {
   const { isLoading, data: user } = useUser();
   const {
      register,
      formState: { errors, },
      handleSubmit } = useForm({
         defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            email: user.email,
            location: user.location,
         }
      });
   const {
      register: register2,
      watch,
      formState: { errors: errors2, },
      handleSubmit: handleSubmit2 } = useForm();

   const editUser = async () => {

   }

   if (isLoading) return <Loading />

   return (
      <div className='account__wrapper'>
         <form autoComplete='off' onSubmit={handleSubmit()}>
            <div id='account-edit-name-wrapper'>
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
            </div>
            <label>
               Логин
               <input type="text" autoComplete='on'
                  className={errors?.login ? 'invalid' : ''}
                  {...register('login', { required: 'Обязательноe поле.' })} />
               {errors?.login && <p className='error'>{errors?.login.message}</p>}
            </label>
            <label>
               Электронная почта
               <input type="email" autoComplete='on'
                  className={errors?.email ? 'invalid' : ''}
                  {...register('email', { required: 'Обязательноe поле.' })} />
               {errors?.email && <p className='error'>{errors?.email.message}</p>}
            </label>
            <label>
               Населенный пункт
               <input type="text"
                  className={errors?.location ? 'invalid' : ''}
                  {...register('location', { required: 'Обязательноe поле.' })} />
               {errors?.location && <p className='error'>{errors?.location.message}</p>}
            </label>
            <button className='submit'>Сохранить</button>
         </form>
         <form onSubmit={handleSubmit2()}>
            <label>
               Старый пароль
               <input type="password"
                  className={errors2?.oldPassword ? 'invalid' : ''}
                  {...register2('oldPassword', { required: 'Обязательноe поле.' })} />
               {errors2?.oldPassword && <p className='error'>{errors2?.oldPassword.message}</p>}
            </label>
            <label>
               Новый пароль
               <input type="password"
                  className={errors2?.password ? 'invalid' : ''}
                  {...register2('password', { required: 'Обязательноe поле.' })} />
               {errors2?.password && <p className='error'>{errors2?.password.message}</p>}
            </label>
            <label>
               Повторите новый пароль
               <input type="password"
                  className={errors2?.confirmPassword ? 'invalid' : ''}
                  {...register2('confirmPassword', {
                     required: 'Обязательноe поле.',
                     validate: (value) => watch('password') === value || "Пароли не совпадают."
                  })}
               />
               {errors2?.confirmPassword && <p className='error'>{errors2?.confirmPassword.message}</p>}
            </label>
            <button className='submit'>Сохранить</button>
         </form>
      </div>
   )
}
export default WithAuth(AccountEdit)