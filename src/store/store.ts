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
  title: string;
  body: string;
};
export type Query = string;

export const ADD_QUERY_QUESTIONS = 'addQueryQuestoins';
export const ADD_TAG_QUESTIONS = 'addTagQuestoins';
export const ADD_AUTHOR_QUESTIONS = 'addAuthorQuestoins';
export const ADD_QUESTION_ANSWERS = 'addQuestionAnswers';
export const ADD_QUESTION_TITLE = 'addQuestionTitle';
export const LOADING = 'loading';
export const NOT_LOADING = 'notLoading';

export type State = {
  questionsByQuery: Record<Query, Question[]>;
  questionsByAuthor: Record<string, Question[]>;
  questionsByTag: Record<string, Question[]>;
  questions: Record<Question['id'], Pick<Question, 'title' | 'answers'>>;
  loading: boolean;
};

export const initialState: State = {
  questionsByQuery: {},
  questionsByAuthor: {},
  questionsByTag: {},
  questions: {},
  loading: false,
};

export const reducer = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case ADD_QUERY_QUESTIONS:
      // payload: { query: string; items: Question[]; }
      return {
        ...state,
        questionsByQuery: {
          ...state.questionsByQuery,
          [payload.query]: [...state.questionsByQuery[payload.query] || [], ...payload.items],
        },
      };
    case ADD_TAG_QUESTIONS:
      // payload: { tag: string; items: Question[]; }
      return {
        ...state,
        questionsByTag: {
          ...state.questionsByTag,
          [payload.tag]: [...state.questionsByTag[payload.tag] || [], ...payload.items],
        },
      };
    case ADD_AUTHOR_QUESTIONS:
      // payload: { author: string; items: Question[]; }
      return {
        ...state,
        questionsByAuthor: {
          ...state.questionsByAuthor,
          [payload.author]: [...state.questionsByAuthor[payload.author] || [], ...payload.items],
        },
      };
    case ADD_QUESTION_ANSWERS:
      // payload: { id: Question['id'], items: Answer[] }
      return {
        ...state,
        questions: {
          ...state.questions,
          [payload.id]: {
            ...state.questions[payload.id],
            answers: payload.items,
          },
        },
      };
    case ADD_QUESTION_TITLE:
      // payload: { id: string; title: string }
      return {
        ...state,
        questions: {
          ...state.questions,
          [payload.id]: {
            ...state.questions[payload.id],
            title: payload.title,
          },
        },
      };
    case LOADING:
      return { ...state, loading: true };
    case NOT_LOADING:
      return { ...state, loading: false };
    default: throw new Error('Unexpected action');
  };
};
