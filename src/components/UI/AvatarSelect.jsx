import React from 'react';
import {AVATARS_AMOUNT} from "../../js/consts";

function AvatarRadio({number, isChecked}) {
    return (
        <div className='avatar-radio__wrapper'>
            <label className='avatar'>
                <img src={`/assets/avatars/avatar-${number}.svg`} alt=""/>
                <input className='hidden' name='avatar' type='radio'
                       value={number} defaultChecked={isChecked}/>
            </label>
        </div>
    );
}


export default function AvatarsSelect({avatar, setAvatar}) {
    const numbers = Array.from({length: AVATARS_AMOUNT}, (_, index) => index + 1);
    const onChange = (e) => setAvatar(e.target.value);

    return (
        <div className='avatars-select__wrapper'>
            <p>Аватар</p>
            <div className='account__wrapper__avatar'>
                <img className='avatar' src={`/assets/avatars/avatar-${avatar}.svg`} alt=""/>
                <div className='avatars-select__list' onChange={onChange}>
                    {numbers.map(number =>
                        <AvatarRadio
                            key={number}
                            number={number}
                            isChecked={avatar === number}
                        />)}
                </div>
            </div>
        </div>
    );
}




