import './index.scss';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading/Loading';
import Recovery from './components/Recovery';

const Main = lazy(() => import('./components/Main'));
const Cards = lazy(() => import('./components/Cards'));
const Decks = lazy(() => import('./components/Decks'));
const EditorDecks = lazy(() => import('./components/EditorDecks'));
const ErrorPage = lazy(() => import('./components/ErrorPage/ErrorPage'));
const Account = lazy(() => import('./components/Account'));
const AccountEdit = lazy(() => import('./components/AccountEdit'));
const DeckInfo = lazy(() => import('./components/DeckInfo'));
const Training = lazy(() => import('./components/Training'));
const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./components/SignUp'));

export default function App() {
   return (
      <Router>
         <Routes>

            <Route path='/signin'>
               <Route index element={
                  <Suspense fallback={<Loading />}>
                     <SignIn />
                  </Suspense>
               } />

               <Route path='forgot' element={
                  <Suspense fallback={<Loading />}>
                     <Recovery />
                  </Suspense>
               } />
            </Route>

            <Route path='/signup' element={
               <Suspense fallback={<Loading />}>
                  <SignUp />
               </Suspense>
            } />

            <Route path='/' element={<Layout />}>

               <Route index element={
                  <Suspense fallback={<Loading />}>
                     <Main />
                  </Suspense>
               } />

               <Route path='editor' element={
                  <Suspense fallback={<Loading />}>
                     <EditorDecks />
                  </Suspense>
               } />

               <Route path='editor/:deckId' element={
                  <Suspense fallback={<Loading />}>
                     <Cards />
                  </Suspense>
               }
               />

               <Route path='learn' element={
                  <Suspense fallback={<Loading />}>
                     <Decks />
                  </Suspense>
               } />

               <Route path='learn/:deckId' element={
                  <Suspense fallback={<Loading />}>
                     <DeckInfo />
                  </Suspense>
               } />

               <Route path='learn/:deckId/training' element={
                  <Suspense fallback={<Loading />}>
                     <Training />
                  </Suspense>
               } />

               <Route path='account' element={
                  <Suspense fallback={<Loading />}>
                     <Account />
                  </Suspense>
               } />

               <Route path='account/edit' element={
                  <Suspense fallback={<Loading />}>
                     <AccountEdit />
                  </Suspense>
               } />

               <Route path='*' element={
                  <Suspense fallback={<Loading />}>
                     <ErrorPage />
                  </Suspense>
               } />

            </Route>
         </Routes>
      </Router>
   );
}
