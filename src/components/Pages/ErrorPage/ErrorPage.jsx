import React from 'react';
import styles from './ErrorPage.module.scss';
import {Link} from 'react-router-dom';
import Vector404 from "./Vector404";
import Vector401 from "./Vector401";


export default function ErrorPage({
                                      code = 404,
                                      message = `Запрашиваемая страница не существует. Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке`,
                                      link = '/',
                                      labelText = 'На главную'
                                  }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {code === 404 ? <Vector404/> : <Vector401/>}
                <div>
                    <p>{message}</p>
                    <Link className={`${styles.button} main__btn`} to={link}>{labelText}</Link>
                </div>
            </div>
        </div>
    )
}
