import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer';
import { useContext } from 'react';
import { FormsContext } from '../providers/FormsProvider';
import AddDeckForm from './Forms/AddDeckForm';
import EditDeckForm from './Forms/EditDeckForm';
import EditCardForm from './Forms/EditCardForm';

export default function Layout() {
   const { isAddFormOpened, isEditFormOpened, isCardFormOpened } =
      useContext(FormsContext);

   return (
      <>
         <Header />
         <main className='page-main'>
            <Outlet />
            {isAddFormOpened && <AddDeckForm />}
            {isEditFormOpened && <EditDeckForm />}
            {isCardFormOpened && <EditCardForm />}
         </main>
         <Footer />
      </>
   )
}
