import { all, call, put, takeEvery, takeLatest, take, fork, select, PutEffect, CallEffect } from 'redux-saga/effects';
import { callApi, fetchEntity } from '../api';
import { convertQuestionsApiResponseToStore, action, createRequestTypes } from '../../utils/utils';
import { getQuestions } from '../selectors';

export function* loadQuestions({ query, state, tag, author }) {
  if (state === 'tag' && tag) {
    yield loadQuestionsBy('tag', tag);
  }
  if (state === 'author' && author) {
    yield loadQuestionsBy('author', author);
  }

  yield loadQuestionsBy('query', query);
}

function* loadQuestionsBy(type, query) {
  const questions = yield select(getQuestions, type, query);
  if (!questions)
    yield call(fetchQuestions, { type, query });
}

const QUESTIONS = createRequestTypes('QUESTIONS', ['QUERY', 'TAG', 'AUTHOR']);

const questions = {
  request: ({ type, query }) => action(QUESTIONS[type.toUpperCase()]['REQUEST'], { query }),
  success: ({ type, query }, response) => action(QUESTIONS[type.toUpperCase()]['SUCCESS'], { type, query, response }),
  failure: ({ type, query }, error) => action(QUESTIONS[type.toUpperCase()]['FAILURE'], { query, error }),
};

const getUrlByTypeAndQuery = (type, query) => {
  let url = '';
  switch(type) {
    case 'query':
      url = `/search?order=desc&sort=activity&intitle=${encodeURIComponent(query)}&site=stackoverflow`;
      break;
    case 'tag':
      url = `/tags/${encodeURIComponent(query)}/faq?site=stackoverflow&filter=default`;
      break;
    case 'author':
      url = `/users/${query}/questions?site=stackoverflow&order=desc&sort=activity`;
      break;
  }
  return url;
};

const callApiWrapper = ({ type, query }) => {
  const url = getUrlByTypeAndQuery(type, query);
  return callApi(url);
};

export const fetchQuestions = fetchEntity.bind(null, questions, callApiWrapper, convertQuestionsApiResponseToStore);