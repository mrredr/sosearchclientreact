import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import Search from './app/search/Search';
import Results from './app/results/Results';
import Question from './app/question/Question';
import ErrorBoundary from './ErrorBoundary';
import { Context } from './store/connect';
import { reducer, initialState } from './store/store.ts';

const AppContent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/question/:questionId">
          <Question />
        </Route>
        <Route path="/blank">
          <div />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

const App = () => {
  const defaultStoreValue = useReducer(reducer, initialState);
  return (
    <div className="app">
      <Context.Provider value={defaultStoreValue}>
        <main className="app-main">
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </main>
      </Context.Provider>
    </div>
  );
};

export default App;
