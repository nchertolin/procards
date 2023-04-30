import React from 'react'
import styles from './Loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner}>
                <div className={`${styles.ldio} loading`}>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
