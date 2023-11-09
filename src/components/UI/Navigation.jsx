import React from 'react';
import {useNavigate} from "react-router-dom";

export default function Navigation({parentText, text = ''}) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    return (
        <div className='head__text__block'>
            {
                text
                    ? <>
                        <h3 className='head__text head__text__parent' onClick={goBack}>{parentText}</h3>
                        <p>/</p>
                        <h3>{text}</h3>
                    </>
                    : <h3 className='head__text'>{parentText}</h3>
            }
        </div>
    );
}
