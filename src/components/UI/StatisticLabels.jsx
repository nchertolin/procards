import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


function CardsViewedStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <DashboardIcon fontSize='large'/>
            <section>
                <p>Карточек просмотрено</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>

        </div>
    );
}

function CardsCreatedStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <DashboardCustomizeIcon fontSize='large'/>
            <section>
                <p>Карточек создано</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function ScoreStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <TrendingUpIcon fontSize='large'/>
            <section>
                <p>Рейтинг</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function HoursStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <AccessTimeFilledIcon fontSize='large'/>
            <section>
                <p>Часов за учебой</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function PeopleStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <PeopleIcon fontSize={"large"}/>
            <section>
                <p>Количество участников</p>
                <h4 className='statistic__label__value'>{data}</h4>
            </section>
        </div>
    );
}

function CardsCountStatisticLabel({data}) {
    return (
        <div className='statistic__label'>
            <DashboardIcon fontSize='large'/>
            <section>
                <p>Количество карточек</p>
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
