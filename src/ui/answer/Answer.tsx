import React from 'react';
import { Answer } from '../../store/store';
import './answer.css';

const AnswerComponent = ({ answer }: {answer: Answer}) => {
  return (
    <div className="answer-body" dangerouslySetInnerHTML={{'__html': answer.body}} />
  );
};

export default AnswerComponent;
