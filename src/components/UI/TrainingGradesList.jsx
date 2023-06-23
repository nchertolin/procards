import React from 'react';

export default function TrainingGradesList({side, onClick, isDisabled}) {
    const grades = [1, 2, 3, 4, 5];

    if (side) return <p>Нажатие на карточку перевернет ее.</p>

    return (
        <div className='training__rating'>
            <p>Оцените, насколько хорошо вы знали ответ.</p>
            <div className='training__rating__list'>
                {
                    grades.map(grade =>
                        <button key={grade} className='pagination__button'
                                onClick={() => onClick(grade)}
                                disabled={isDisabled}>
                            {grade}
                        </button>)
                }
            </div>
        </div>
    );
}
