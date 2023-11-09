import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import {useContext} from 'react';
import {FormsContext} from '../providers/FormsProvider';
import AddDeckForm from './Forms/AddDeckForm';
import EditDeckForm from './Forms/EditDeckForm';
import EditCardForm from './Forms/EditCardForm';
import AddCardForm from './Forms/AddCardForm';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import AddCardSelectForm from "./Forms/AddCardSelectForm";


export default function Layout() {
    const {
        isAddFormOpened, isEditFormOpened,
        isEditCardFormOpened, isAddCardFormOpened,
        isSelectFormOpened
    } = useContext(FormsContext);

    return (
        <>
            <Header/>
            <main className='page-main'>
                <Outlet/>
                {isAddFormOpened && <AddDeckForm/>}
                {isEditFormOpened && <EditDeckForm/>}
                {isEditCardFormOpened && <EditCardForm/>}
                {isSelectFormOpened && <AddCardSelectForm/>}
                {isAddCardFormOpened && <AddCardForm/>}
            </main>
            <Footer/>
            <ScrollToTop/>
        </>
    )
}
