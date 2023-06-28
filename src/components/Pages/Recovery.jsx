import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import {useNewPassword, useRecovery} from '../../hooks/useAuth';
import {REQUIRED_FIELD, USER_OPTIONS} from "../../js/validationOptions";

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
                <p>Введите логин, связанный с вашей учетной записью и мы вышлем вам код для смены пароля на
                    электронную почту.</p>
                <label>
                    <input type="text" disabled={isLoginSent}
                           className={errors?.login ? 'invalid' : ''}
                           {...register('login', REQUIRED_FIELD)}
                           placeholder='Логин'/>
                    {errors?.login && <p className='error'>{errors?.login.message}</p>}
                </label>
                <label>
                    <input type="tel" disabled={isCodeSent} autoComplete='off'
                           className={errors?.code ? 'invalid' : ''}
                           {...register('code', {
                               ...REQUIRED_FIELD,
                               disabled: !isLoginSent,
                           })}
                           placeholder='Код из письма'/>
                    {errors?.code && <p className='error'>{errors?.code.message}</p>}
                </label>
                <label>
                    <input type="password"
                           className={errors?.password ? 'invalid' : ''}
                           {...register('password', {
                               ...USER_OPTIONS.PASSWORD,
                               disabled: !isCodeSent
                           })}
                           placeholder='Новый пароль'/>
                    {errors?.password && <p className='error'>{errors?.password.message}</p>}
                </label>
                <label>
                    <input type="password"
                           className={errors?.cpassword ? 'invalid' : ''}
                           {...register('cpassword', {
                               disabled: !isCodeSent,
                               validate: (value) => {
                                   return watch('password') === value || "Пароли не совпадают.";
                               }
                           })}
                           placeholder='Подтвердите новый пароль'/>
                    {errors?.cpassword && <p className='error'>{errors?.cpassword.message}</p>}
                </label>
                <button className='modal_submit main__btn' disabled={isLoading || isLoading1}>Отправить</button>
            </form>
        </div>
    )
}
