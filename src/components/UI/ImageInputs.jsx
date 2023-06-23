import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

function AddImageButton() {
    return (
        <div className='add__image__btn'>
            <AddPhotoAlternateIcon/>
            <p>Добавить картинку</p>
        </div>
    );
}

function ResetImageButton({onClick}) {
    return (
        <button type='button' className='add__image__btn' onClick={onClick}>
            <DeleteIcon/>
            <p>Удалить картинку</p>
        </button>
    );
}


export {
    AddImageButton,
    ResetImageButton,
}
