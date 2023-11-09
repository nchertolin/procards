import './index.scss';
import {lazy, Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading/Loading';
import {setSavedTheme} from './js/utils';

const Main = lazy(() => import('./components/Pages/Main'));
const CardsEditor = lazy(() => import('./components/Pages/CardsEditor'));
const Decks = lazy(() => import('./components/Pages/Decks'));
const DecksEditor = lazy(() => import('./components/Pages/DecksEditor'));
const ErrorPage = lazy(() => import('./components/Pages/ErrorPage/ErrorPage'));
const Account = lazy(() => import('./components/Pages/Account'));
const AccountEdit = lazy(() => import('./components/Pages/AccountEdit'));
const User = lazy(() => import('./components/Pages/User'));
const DeckInfo = lazy(() => import('./components/Pages/DeckInfo'));
const DeckAdd = lazy(() => import('./components/Pages/DeckAdd'));
const Training = lazy(() => import('./components/Pages/Training'));
const SignIn = lazy(() => import('./components/Pages/SignIn'));
const SignUp = lazy(() => import('./components/Pages/SignUp'));
const Recovery = lazy(() => import('./components/Pages/Recovery'));

export default function App() {
    useEffect(setSavedTheme, []);

    return (
        <Suspense fallback={<Loading/>}>
            <Router>
                <Routes>
                    <Route path='/signin'>
                        <Route index element={<SignIn/>}/>
                        <Route path='forgot' element={<Recovery/>}/>
                    </Route>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Main/>}/>
                        <Route path='learn' element={<Decks/>}/>
                        <Route path='learn/add/:deckId' element={<DeckAdd/>}/>
                        <Route path='learn/:deckId' element={<DeckInfo/>}/>
                        <Route path='learn/:deckId/training' element={<Training/>}/>
                        <Route path='editor' element={<DecksEditor/>}/>
                        <Route path='editor/:deckId' element={<CardsEditor/>}/>
                        <Route path='account' element={<Account/>}/>
                        <Route path='account/edit' element={<AccountEdit/>}/>
                        <Route path='user/:userId' element={<User/>}/>
                        <Route path='*' element={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    );
}
