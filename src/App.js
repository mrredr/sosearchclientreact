import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history';

import './App.css';
import Search from './app/search/Search';
import Results from './app/results/Results';
import Question from './app/question/Question';
import ErrorBoundary from './ErrorBoundary';
import Animate from './ui/animateMount/AnimateMount';
import { reducer } from './store/store.ts';
import { allWatchers } from './store/sagas';

export const history = createBrowserHistory();

const AppContent = () => {
  return (
    <Router history={history}>
      <Animate>
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/question/:questionId">
            <Question />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </Animate>
    </Router>
  );
};

const App = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(allWatchers);

  return (
    <div className="app">
      <Provider store={store}>
        <main className="app-main">
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </main>
      </Provider>
    </div>
  );
};

export default App;
