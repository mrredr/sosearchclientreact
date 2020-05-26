import {
  LOADING,
  NOT_LOADING,
  ADD_QUERY_QUESTIONS,
  ADD_TAG_QUESTIONS,
  ADD_AUTHOR_QUESTIONS,
  ADD_QUESTION_ANSWERS,
  ADD_QUESTION_TITLE,
  State,
} from "../store/store";
import { convertQuestionsApiToStore, convertAnswersApiToStore, decodeHtml } from '../utils/utils';

export type ContextType = [State, (arg: { type: string; payload?: any }) => void];

const API_URL = 'https://api.stackexchange.com/2.2'
const SE_KEY = 'rIuzq2*mzfdBZY9LaQhCxQ((';

  //TODO:: split loading by request
export const loadQuestionsByQuery = ([state, dispatch]: ContextType, query: string): Promise<void> => {
  const QUESTIONS_URL = `${API_URL}/search?order=desc&sort=activity&intitle=${encodeURIComponent(query)}&site=stackoverflow&key=${SE_KEY}`;

  if (state.questionsByQuery[query]) {
    return Promise.resolve();
  }

  dispatch({ type: LOADING });
  return fetch(QUESTIONS_URL)
    .then((response) => {
      dispatch({ type: NOT_LOADING });
      return response.json();
    })
    .then((response) => {
      return dispatch({
        type: ADD_QUERY_QUESTIONS,
        payload: { query, items: convertQuestionsApiToStore(response.items) },
      });
    })
    .catch((e) => {
      dispatch({ type: NOT_LOADING });
      console.error(`Ошибка загруки вопросов ${e}`);
    });
};

export const loadQuestionsByAuthor = ([state, dispatch]: ContextType, author: number): Promise<void> => {
  const QUESTIONS_URL = `${API_URL}/users/${author}/questions?site=stackoverflow&order=desc&sort=activity&key=${SE_KEY}`;

  if (state.questionsByAuthor[author]) {
    return Promise.resolve();
  }

  dispatch({ type: LOADING });
  return fetch(QUESTIONS_URL)
    .then((response) => {
      dispatch({ type: NOT_LOADING });
      return response.json();
    })
    .then((response) => {
      return dispatch({
        type: ADD_AUTHOR_QUESTIONS,
        payload: { author, items: convertQuestionsApiToStore(response.items) },
      });
    })
    .catch((e) => {
      dispatch({ type: NOT_LOADING });
      console.error(`Ошибка загруки вопросов ${e}`);
    });
};

export const loadQuestionsByTag = ([state, dispatch]: ContextType, tag: string): Promise<void> => {
  const QUESTIONS_URL = `${API_URL}/tags/${encodeURIComponent(tag)}/faq?site=stackoverflow&filter=default&key=${SE_KEY}`;

  if (state.questionsByTag[tag]) {
    return Promise.resolve();
  }

  dispatch({ type: LOADING });
  return fetch(QUESTIONS_URL)
    .then((response) => {
      dispatch({ type: NOT_LOADING });
      return response.json();
    })
    .then((response) => {
      return dispatch({
        type: ADD_TAG_QUESTIONS,
        payload: { tag, items: convertQuestionsApiToStore(response.items) },
      });
    })
    .catch((e) => {
      dispatch({ type: NOT_LOADING });
      console.error(`Ошибка загруки вопросов ${e}`);
    });
};

export const loadQuestion = async ([state, dispatch]: ContextType, id: string) => {
  const QUESTION_URL = `${API_URL}/questions/${id}?key=${SE_KEY}&site=stackoverflow&order=desc&sort=activity&filter=default`;

  if (state.questions[id] && state.questions[id].title) {
    loadQuestion([state, dispatch], id);
  }

  dispatch({ type: LOADING });
  return fetch(QUESTION_URL)
    .then((response) => {
      dispatch({ type: NOT_LOADING });
      return response.json();
    })
    .then((response) => {
      return dispatch({
        type: ADD_QUESTION_TITLE,
        payload: { id, title: decodeHtml(response.items[0].title) },
      });
    })
    .catch((e) => {
      dispatch({ type: NOT_LOADING });
      console.error(`Ошибка загруки вопросов ${e}`);
    });
};

export const loadQuestionAnswers = async ([state, dispatch]: ContextType, id: string) => {
  const ANSWERS_URL = `${API_URL}/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!azbR7tRM54eH(m&key=${SE_KEY}`;

  if (state.questions[id] && state.questions[id].answers) {
    return Promise.resolve();
  }

  dispatch({ type: LOADING });
  return fetch(ANSWERS_URL)
    .then((response) => {
      dispatch({ type: NOT_LOADING });
      return response.json();
    })
    .then((response) => {
      return dispatch({
        type: ADD_QUESTION_ANSWERS,
        payload: { id, items: convertAnswersApiToStore(response.items) },
      });
    })
    .catch((e) => {
      dispatch({ type: NOT_LOADING });
      console.error(`Ошибка загруки вопросов ${e}`);
    });
};

export const addQuestionTitle = ([, dispatch]: ContextType, id: string, title: string) => {
  dispatch({ type: ADD_QUESTION_TITLE, payload: { id, title } });
};
