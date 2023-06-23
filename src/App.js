import './index.scss';
import {lazy, Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading/Loading';
import {setSavedTheme} from './utils';

const Main = lazy(() => import('./components/Pages/Main'));
const Cards = lazy(() => import('./components/Pages/CardsEditor'));
const Decks = lazy(() => import('./components/Pages/Decks'));
const EditorDecks = lazy(() => import('./components/Pages/EditorDecks'));
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
        <Router>
            <Routes>

                <Route path='/signin'>
                    <Route index element={
                        <Suspense fallback={<Loading/>}>
                            <SignIn/>
                        </Suspense>
                    }/>

                    <Route path='forgot' element={
                        <Suspense fallback={<Loading/>}>
                            <Recovery/>
                        </Suspense>
                    }/>
                </Route>

                <Route path='/signup' element={
                    <Suspense fallback={<Loading/>}>
                        <SignUp/>
                    </Suspense>
                }/>

                <Route path='/' element={<Layout/>}>

                    <Route index element={
                        <Suspense fallback={<Loading/>}>
                            <Main/>
                        </Suspense>
                    }/>

                    <Route path='editor' element={
                        <Suspense fallback={<Loading/>}>
                            <EditorDecks/>
                        </Suspense>
                    }/>

                    <Route path='editor/:deckId' element={
                        <Suspense fallback={<Loading/>}>
                            <Cards/>
                        </Suspense>
                    }
                    />

                    <Route path='learn' element={
                        <Suspense fallback={<Loading/>}>
                            <Decks/>
                        </Suspense>
                    }/>

                    <Route path='learn/add/:deckId' element={
                        <Suspense fallback={<Loading/>}>
                            <DeckAdd/>
                        </Suspense>
                    }/>

                    <Route path='learn/:deckId' element={
                        <Suspense fallback={<Loading/>}>
                            <DeckInfo/>
                        </Suspense>
                    }/>

                    <Route path='learn/:deckId/training' element={
                        <Suspense fallback={<Loading/>}>
                            <Training/>
                        </Suspense>
                    }/>

                    <Route path='account' element={
                        <Suspense fallback={<Loading/>}>
                            <Account/>
                        </Suspense>
                    }/>

                    <Route path='account/edit' element={
                        <Suspense fallback={<Loading/>}>
                            <AccountEdit/>
                        </Suspense>
                    }/>

                    <Route path='user/:userId' element={
                        <Suspense fallback={<Loading/>}>
                            <User/>
                        </Suspense>
                    }/>

                    <Route path='*' element={
                        <Suspense fallback={<Loading/>}>
                            <ErrorPage/>
                        </Suspense>
                    }/>

                </Route>

            </Routes>
        </Router>
    );
}
