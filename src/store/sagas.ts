import { all, take, fork } from 'redux-saga/effects';

import { QueryParams } from '../hooks/useQueryParams';

import { loadQuestions } from './enteties/questions';
import { loadQuestion } from './enteties/question';
import { loadAnswers } from './enteties/answers';

import { action } from '../utils/utils';

const LOAD_RESULTS_PAGE = 'LOAD_RESULTS_PAGE';
const LOAD_QUESTION_PAGE = 'LOAD_QUESTION_PAGE';

export const loadResultsPage = ({ query, state, tag, author }: QueryParams) => action(LOAD_RESULTS_PAGE, { query, state, tag, author })

export const loadQuestionPage = ({ id }: { id: string }) => action(LOAD_QUESTION_PAGE, { id })

function* watchLoadResultsPage() {
  while(true) {
    const { payload } = yield take(LOAD_RESULTS_PAGE);
    yield fork(loadQuestions, payload);
  }
}
function* watchQuestionPage() {
  while(true) {
    const { payload } = yield take(LOAD_QUESTION_PAGE);
    yield fork(loadAnswers, payload);
    yield fork(loadQuestion, payload);
  }
}

export function* allWatchers () {
  yield all([
    fork(watchLoadResultsPage),
    fork(watchQuestionPage)
  ])
}