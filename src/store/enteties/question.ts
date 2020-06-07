import { call, select } from 'redux-saga/effects';
import { callApi, fetchEntity } from '../api';
import { getQuestionTitle } from '../selectors';
import { convertQuestionApiResponseToStore, action, createRequestTypesBase } from '../../utils/utils';

export function* loadQuestion({ id }) {
  const questionTitle = yield select(getQuestionTitle, id);
  console.log(id, questionTitle);
  if (!questionTitle) {
    yield call(fetchQuestion, { id });
  }
}

export const QUESTION = createRequestTypesBase('QUESTION');

const question = {
  request: ({ id }) => action(QUESTION['REQUEST'], { id }),
  success: ({ id }, response) => action(QUESTION['SUCCESS'], { id, response }),
  failure: ({ id }, error) => action(QUESTION['FAILURE'], { id, error }),
};

const callApiWrapper = ({ id }) => {
  const url = `/questions/${id}?&site=stackoverflow&order=desc&sort=activity&filter=default`;
  return callApi(url);
};

export const fetchQuestion = fetchEntity.bind(null, question, callApiWrapper, convertQuestionApiResponseToStore);

export const addQuestionTitle = (id: string, response: string) => action('QUESTION_SUCCESS', { id, response });
