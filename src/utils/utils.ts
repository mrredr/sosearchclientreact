import { isEmpty } from 'ramda';
import { Question, Answer } from '../store/store';

export const parseQueryParams = (queryString: string) => {
  if (isEmpty(queryString)) return {};
  const paramsEntries = new URLSearchParams(queryString);
  return Object.fromEntries(paramsEntries);
};

export function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const convertQuestionsApiResponseToStore = ({ items }): Question[] => (
  items.map((question: any) => ({
    id: question.question_id,
    title: decodeHtml(question.title),
    answerCount: question.answer_count,
    ownerName: question.owner.display_name,
    ownerId: question.owner.user_id,
    tags: question.tags,
  }))
);

export const convertAnswersApiResponseToStore = ({ items }): Answer[] => (
  items.map((answer: any) => ({
    id: answer.answer_id,
    body: decodeHtml(answer.body),
  }))
);

export const convertQuestionApiResponseToStore = (question) => {
  return question.items[0].title;
};

export function action(type: string, payload = {}) {
  return {type, payload}
}

export function createRequestTypesBase(base) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, callbackType) => {
		acc[callbackType] = `${base}_${callbackType}`
		return acc
	}, {})
}

export function createRequestTypes(base: string, types: string[]) {
  return types.reduce((acc: Record<string, Record<string, string>>, type: string) => {
    acc[type] = createRequestTypesBase(`${base}_${type}`);
    return acc;
  }, {});
}
