export const getQuestions = (state, type, query) => state[`${type}Questions`][query];

export const getAnswers = (state, id) => state.questionAnswers[id]? state.questionAnswers[id].answers : undefined;

export const getQuestionTitle = (state, id) => state.questionAnswers[id]? state.questionAnswers[id].title : undefined;