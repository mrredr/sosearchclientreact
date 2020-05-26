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

export const convertQuestionsApiToStore = (questions: any): Question[] => (
  questions.map((question: any) => ({
    id: question.question_id,
    title: decodeHtml(question.title),
    answerCount: question.answer_count,
    ownerName: question.owner.display_name,
    ownerId: question.owner.user_id,
    tags: question.tags,
  }))
);

export const convertAnswersApiToStore = (answers: any): Answer[] => (
  answers.map((answer: any) => ({
    id: answer.answer_id,
    title: decodeHtml(answer.title),
    body: decodeHtml(answer.body),
  }))
);
