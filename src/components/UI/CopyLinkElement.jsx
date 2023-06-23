import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import LinkIcon from "@mui/icons-material/Link";
import {notifySuccess} from "../../utils";

const onCopy = () => notifySuccess('Ссылка на приглашение скопирована');

export default function CopyLinkElement({inviteUrl}) {

    return (
        <section className='copy-link' title='Ссылка приглашения участников'>
            <p className='copy-link__placeholder'>Скопировать ссылку для приглашения</p>
            <p className='copy-link__content'>{inviteUrl}</p>
            <div className='copy-link__icon__wrapper'>
                <CopyToClipboard text={inviteUrl} onCopy={onCopy}>
                    <button type='button'>
                        <LinkIcon/>
                    </button>
                </CopyToClipboard>
            </div>
        </section>
    );
}
