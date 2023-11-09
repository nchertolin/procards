import React from 'react';


function CardsViewedStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Карточек просмотрено</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function CardsCreatedStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Карточек создано</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function ScoreStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Рейтинг</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function HoursStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Часов за учебой</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function PeopleStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Количество участников</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function CardsCountStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <section>
                <p className='statistic__label__key'>Количество карточек</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

export {
    CardsViewedStatisticLabel,
    CardsCreatedStatisticLabel,
    ScoreStatisticLabel,
    HoursStatisticLabel,
    PeopleStatisticLabel,
    CardsCountStatisticLabel
}
