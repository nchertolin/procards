import React from 'react';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useNavigate} from "react-router-dom";

export default function HeadText({parentText, text = ''}) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    return (
        <div className='head__text__block'>
            {
                text
                    ? <>
                        <h3 className='head__text head__text__parent' onClick={goBack}>{parentText}</h3>
                        <NavigateNextIcon/>
                        <h3>{text}</h3>
                    </>
                    : <h3 className='head__text'>{parentText}</h3>
            }
        </div>
    );
}
