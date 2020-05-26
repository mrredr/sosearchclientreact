import React from 'react';
import { Answer } from '../../store/store';
import './answer.css';

const AnswerComponent = ({ answer }: {answer: Answer}) => {
  return (
    <div className="answer">
      <div className="answer-title">{answer.title}</div>
      <div className="answer-body">{answer.body}</div>
    </div>
  );
};

export default AnswerComponent;
