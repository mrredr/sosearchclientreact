import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { prop, isEmpty } from 'ramda';

import { useAction, useSelector } from '../../store/connect';
import { loadQuestionAnswers as loadQuestionAnswersAction, loadQuestion as loadQuestionAction } from '../../store/actions';
import { State, Answer } from '../../store/store';
import AnswerComponent from '../../ui/answer/Answer';
import Loader from '../../ui/loader/Loader';

const Question = () => {
  const loading = useSelector(prop('loading'));
  const { questionId } = useParams();
  const loadQuestionAnswers = useAction(loadQuestionAnswersAction);
  const loadQuestoin = useAction(loadQuestionAction);
  const question = useSelector((state: State) => state.questions[questionId] || {});

  useEffect(() => {
    loadQuestionAnswers(questionId);
    loadQuestoin(questionId);
  }, [questionId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Link to="/">Искать заново</Link>
      <h2>{question.title}</h2>

      {question.answers && question.answers.map((answer: Answer) => (
        <div key={answer.id}>
          <AnswerComponent answer={answer} />
        </div>
      ))}
    </div>
  );
};

export default Question;
