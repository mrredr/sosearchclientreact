export type Question = {
  id: string;
  title: string;
  answerCount: number;
  ownerName: string;
  ownerId: string;
  tags: string[];
  answers?: Answer[];
};

export type Answer = {
  id: string;
  body: string;
};
export type Query = string;

export const ADD_QUESTION_ANSWERS = 'addQuestionAnswers';
export const ADD_QUESTION_TITLE = 'addQuestionTitle';
export const LOADING = 'loading';
export const NOT_LOADING = 'notLoading';

export type State = {
  queryQuestions: Record<Query, Question[]>;
  authorQuestions: Record<string, Question[]>;
  tagQuestions: Record<string, Question[]>;
  questionAnswers: Record<Question['id'], Pick<Question, 'title' | 'answers'>>;
  loading: boolean | string;
};

export const initialState: State = {
  queryQuestions: {},
  authorQuestions: {},
  tagQuestions: {},
  questionAnswers: {},
  loading: false,
};

export const reducer = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case 'QUESTIONS_QUERY_SUCCESS':
    case 'QUESTIONS_TAG_SUCCESS':
    case 'QUESTIONS_AUTHOR_SUCCESS':
      // payload: { query: tag | query | author, response: Question[] }
      const qustionsKey = `${payload.type}Questions`;
      return {
        ...state,
        [qustionsKey]: {
          ...state[qustionsKey],
          [payload.query]: [...state[qustionsKey][payload.query] || [], ...payload.response],
        }
      };

    case 'ANSWERS_SUCCESS':
      // payload: { id: Question['id'], response: Answer[] }
      return {
        ...state,
        questionAnswers: {
          ...state.questionAnswers,
          [payload.id]: {
            ...state.questionAnswers[payload.id],
            answers: payload.response,
          },
        },
      };
    case 'QUESTION_SUCCESS':
      // payload: { id: string; response: string }
      console.log('')
      return {
        ...state,
        questionAnswers: {
          ...state.questionAnswers,
          [payload.id]: {
            ...state.questionAnswers[payload.id],
            title: payload.response,
          },
        },
      };
    case LOADING:
      return { ...state, loading: true };
    case NOT_LOADING:
      return { ...state, loading: false };
    default: return state;
  };
};
