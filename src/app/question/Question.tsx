import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { prop } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';

import { State, Answer } from '../../store/store';
import AnswerComponent from '../../ui/answer/Answer';
import Loader from '../../ui/loader/Loader';
import { loadQuestionPage } from '../../store/sagas';
import './question.css';

const Question = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => prop('loading', state));
  const { questionId } = useParams();
  const question = useSelector((state: State) => state.questionAnswers[questionId] || {});

  useEffect(() => {
    dispatch(loadQuestionPage({ id: questionId }));
  }, [questionId, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Link to="/">Искать заново</Link>
      <h2>{question.title}</h2>

      {question.answers && question.answers.map((answer: Answer) => (
        <div key={answer.id} className="answer">
          <AnswerComponent answer={answer} />
        </div>
      ))}
    </div>
  );
};

export default Question;
