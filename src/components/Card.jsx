import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { FormsContext } from '../providers/FormsProvider';

export default function Card({ content, isDecksEditor, isCardsEditor }) {
    const { setEditCardFormOpened, setCardSelected, setDeckSelected,
        setEditFormOpened } = useContext(FormsContext);
    const [isSettingVisible, setSettingsVisible] = useState();
    const { deckName, isOwner, deckId } = content;

    const openCardForm = () => {
        setCardSelected(content);
        setEditCardFormOpened(true)
    };

    const openEditDeckForm = () => {
        setDeckSelected(content);
        setEditFormOpened(true);
    }

    if (isCardsEditor) {
        return (
            <li>
                <button className='card'
                    onClick={openCardForm}>
                    <div className='card-wrapper'>
                        <h3 className='card-editor'>{content.frontSide}</h3>
                    </div>
                </button>
            </li>
        );
    }

    if (isDecksEditor) {
        return (
            <li className='editor'
                onMouseEnter={() => setSettingsVisible(true)}
                onMouseLeave={() => setSettingsVisible(false)}>
                {
                    isSettingVisible &&
                    <button className='card-settings' onClick={openEditDeckForm}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.44776 15L5.14925 12.6C4.98756 12.5375 4.8352 12.4625 4.69216 12.375C4.54913 12.2875 4.4092 12.1938 4.27239 12.0938L2.05224 13.0312L0 9.46875L1.92164 8.00625C1.9092 7.91875 1.90298 7.83438 1.90298 7.75313V7.24688C1.90298 7.16563 1.9092 7.08125 1.92164 6.99375L0 5.53125L2.05224 1.96875L4.27239 2.90625C4.4092 2.80625 4.55224 2.7125 4.70149 2.625C4.85075 2.5375 5 2.4625 5.14925 2.4L5.44776 0H9.55224L9.85075 2.4C10.0124 2.4625 10.1648 2.5375 10.3078 2.625C10.4509 2.7125 10.5908 2.80625 10.7276 2.90625L12.9478 1.96875L15 5.53125L13.0784 6.99375C13.0908 7.08125 13.097 7.16563 13.097 7.24688V7.75313C13.097 7.83438 13.0846 7.91875 13.0597 8.00625L14.9813 9.46875L12.9291 13.0312L10.7276 12.0938C10.5908 12.1938 10.4478 12.2875 10.2985 12.375C10.1493 12.4625 10 12.5375 9.85075 12.6L9.55224 15H5.44776ZM7.53731 10.125C8.25871 10.125 8.87438 9.86875 9.38433 9.35625C9.89428 8.84375 10.1493 8.225 10.1493 7.5C10.1493 6.775 9.89428 6.15625 9.38433 5.64375C8.87438 5.13125 8.25871 4.875 7.53731 4.875C6.80348 4.875 6.1847 5.13125 5.68097 5.64375C5.17724 6.15625 4.92537 6.775 4.92537 7.5C4.92537 8.225 5.17724 8.84375 5.68097 9.35625C6.1847 9.86875 6.80348 10.125 7.53731 10.125ZM7.53731 8.625C7.22637 8.625 6.96206 8.51563 6.7444 8.29688C6.52674 8.07812 6.41791 7.8125 6.41791 7.5C6.41791 7.1875 6.52674 6.92188 6.7444 6.70312C6.96206 6.48437 7.22637 6.375 7.53731 6.375C7.84826 6.375 8.11256 6.48437 8.33022 6.70312C8.54789 6.92188 8.65672 7.1875 8.65672 7.5C8.65672 7.8125 8.54789 8.07812 8.33022 8.29688C8.11256 8.51563 7.84826 8.625 7.53731 8.625ZM6.75373 13.5H8.22761L8.48881 11.5125C8.87438 11.4125 9.23196 11.2656 9.56157 11.0719C9.89117 10.8781 10.1928 10.6437 10.4664 10.3687L12.3134 11.1375L13.041 9.8625L11.4366 8.64375C11.4988 8.46875 11.5423 8.28438 11.5672 8.09063C11.592 7.89688 11.6045 7.7 11.6045 7.5C11.6045 7.3 11.592 7.10313 11.5672 6.90938C11.5423 6.71563 11.4988 6.53125 11.4366 6.35625L13.041 5.1375L12.3134 3.8625L10.4664 4.65C10.1928 4.3625 9.89117 4.12188 9.56157 3.92813C9.23196 3.73438 8.87438 3.5875 8.48881 3.4875L8.24627 1.5H6.77239L6.51119 3.4875C6.12562 3.5875 5.76803 3.73438 5.43843 3.92813C5.10883 4.12188 4.80721 4.35625 4.53358 4.63125L2.68657 3.8625L1.95896 5.1375L3.56343 6.3375C3.50124 6.525 3.45771 6.7125 3.43284 6.9C3.40796 7.0875 3.39552 7.2875 3.39552 7.5C3.39552 7.7 3.40796 7.89375 3.43284 8.08125C3.45771 8.26875 3.50124 8.45625 3.56343 8.64375L1.95896 9.8625L2.68657 11.1375L4.53358 10.35C4.80721 10.6375 5.10883 10.8781 5.43843 11.0719C5.76803 11.2656 6.12562 11.4125 6.51119 11.5125L6.75373 13.5Z" />
                        </svg>

                    </button>
                }
                <Link to={deckId} className='card'>
                    <div className='card-wrapper'>
                        <h3>{deckName}</h3>
                    </div>
                </Link>
            </li>
        );
    }

    return (
        <li>
            <Link to={deckId} className={`card ${isOwner ? '' : 'other'}`}>
                <div className='card-wrapper'>
                    <h3>{deckName}</h3>
                </div>
            </Link>
        </li>
    );
}
