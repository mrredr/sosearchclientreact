import { call, select } from 'redux-saga/effects';
import { callApi, fetchEntity } from '../api';
import { getAnswers } from '../selectors';
import { convertAnswersApiResponseToStore, action, createRequestTypesBase } from '../../utils/utils';

export function* loadAnswers({ id }) {
  const answers = yield select(getAnswers, id);
  if (!answers)
    yield call(fetchAnswers, { id });
}

export const ANSWERS = createRequestTypesBase('ANSWERS');

const answers = {
  request: ({ id }) => action(ANSWERS['REQUEST'], { id }),
  success: ({ id }, response) => action(ANSWERS['SUCCESS'], { id, response }),
  failure: ({ id }, error) => action(ANSWERS['FAILURE'], { id, error }),
};

const callApiWrapper = ({ id }) => {
  const url = `/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!azbR7tRM54eH(m`;
  return callApi(url);
};

export const fetchAnswers = fetchEntity.bind(null, answers, callApiWrapper, convertAnswersApiResponseToStore);