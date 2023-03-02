import './index.scss';
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/index';
import { token, testUser } from './testData';
import { isAuth } from './util.js';
import Layout from './Layout';
import Loading from './Loading/Loading';
import { v4 } from 'uuid';

const Main = lazy(() => import('./Main'));
const Content = lazy(() => import('./Content'));
const ErrorPage = lazy(() => import('./ErrorPage/ErrorPage'));
const Account = lazy(() => import('./Account'));
const AccountEdit = lazy(() => import('./AccountEdit'));
const DeckInfo = lazy(() => import('./DeckInfo'));
const Training = lazy(() => import('./Training'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));

function App() {
  localStorage.setItem('token', token);
  const [user, setUser] = useState(testUser)
  const [decks, setDecks] = useState(testUser.decks);

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path='/signin' element={
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            } />
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

              {isAuth &&
                <>
                  <Route path='editor' element={
                    <Suspense fallback={<Loading />}>
                      <Content title='Редактор колод' decks={decks} />
                    </Suspense>
                  } />

                  {decks.map(info =>
                    <Route key={v4()} path={`editor/${info.to}`} element={
                      <Suspense fallback={<Loading />}>
                        <Content title={info.title}
                          decks={info.content} />
                      </Suspense>
                    }
                    />)}

                  <Route path='learn' element={
                    <Suspense fallback={<Loading />}>
                      <Content title='Выберите колоду' decks={decks} />
                    </Suspense>
                  } />

                  {decks.map(info =>
                    <Route key={v4()} path={`learn/${info.to}`} element={
                      <Suspense fallback={<Loading />}>
                        <DeckInfo info={info} />
                      </Suspense>
                    }
                    />)}

                  {decks.map(info =>
                    <Route key={v4()} path={`learn/${info.to}/training`} element={
                      <Suspense fallback={<Loading />}>
                        <Training info={info} />
                      </Suspense>
                    }
                    />)}

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
                </>
              }

              <Route path='*' element={
                <Suspense fallback={<Loading />}>
                  <ErrorPage />
                </Suspense>
              } />

            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div >
  );
}

export default App;
