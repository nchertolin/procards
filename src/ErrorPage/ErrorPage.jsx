import React from 'react';
import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>
          Кажется что-то пошло не так! Запрашиваемая страница не существует.
          Возможно она устарела, была удалена, или был введен неверный адрес в
          адресной строке
        </p>
        <Link className={styles.button} to='/'>На главную</Link>
      </div>
    </div>
  )
}
