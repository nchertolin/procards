import React from 'react';
import styles from './ErrorPage.module.scss';
import {Link} from 'react-router-dom';

export default function ErrorPage({
                                      code = 404,
                                      message = `Кажется что-то пошло не так! Запрашиваемая страница не существует. Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке`,
                                      link = '/',
                                      labelText = 'На главную'
                                  }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1>{code}</h1>
                <p>
                    {message}
                </p>
                <Link className={`${styles.button} main__btn`} to={link}>{labelText}</Link>
            </div>
        </div>
    )
}
