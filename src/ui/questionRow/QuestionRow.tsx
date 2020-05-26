import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAction } from '../../store/connect';
import { Question } from '../../store/store';
import { addQuestionTitle as addQuestionTitleAction } from '../../store/actions';

import './row.css';

const Row = ({ question }: { question: Question; }) => {
  const addQuestionTitle = useAction(addQuestionTitleAction);
  const history = useHistory();
  const handleTitleClick = (id: string, title: string) => {
    addQuestionTitle(id, title)
    history.push(`/question/${id}`);
  };
  const handleTagClick = (tag: string) => {
    const urlParams = new URLSearchParams(history.location.search);
    urlParams.set('tag', tag);
    urlParams.set('state', 'tag');
    history.push(`/results?${urlParams.toString()}`);
  };
  const handleAuthorClick = (author: string) => {
    const urlParams = new URLSearchParams(history.location.search);
    urlParams.set('author', author);
    urlParams.set('state', 'author');
    history.push(`/results?${urlParams.toString()}`);
  };

  return (
    <>
      <div className="cell cell-title">
        <span className="cell-link" onClick={handleTitleClick.bind(null, question.id, question.title)}>{question.title}</span>
      </div>
      <div className="subRow">
        <div className="cell cell-count cell-link" onClick={handleTitleClick.bind(null, question.id, question.title)}>answers: {question.answerCount}</div>
        <div className="cell cell-name cell-link" onClick={handleAuthorClick.bind(null, question.ownerId)}>author: {question.ownerName}</div>
      </div>
      <div className="cell cell-tags">
        {question.tags.map((tag) => (
          <div className="tag cell-link" onClick={handleTagClick.bind(null, tag)}>{tag}</div>
        ))}
      </div>
    </>
  );
};

export default Row;
