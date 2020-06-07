import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Question } from '../../store/store';
import { addQuestionTitle } from '../../store/enteties/question';

import "./row.css";

export type ClickableLinks = {
  title?: boolean;
  answers?: boolean;
  author?: boolean;
  tags?: boolean;
};
const clickableLinksDefaults = { title: true, answers: true, tags: true, author: true };

const Row = ({
  question,
  clickableLinks,
}: {
  question: Question;
  clickableLinks?: ClickableLinks;
}) => {
  const dispatch = useDispatch();
  const {
    title,
    answers,
    tags,
    author,
  } = { ...clickableLinksDefaults, ...clickableLinks };

  const history = useHistory();

  const handleTitleClick = (id: string, value: string) => {
    if (!title) return;
    dispatch(addQuestionTitle(id, value));
    history.push(`/question/${id}`);
  };
  const handleAnswersClick = (id: string, value: string) => {
    if (!answers) return;
    dispatch(addQuestionTitle(id, value));
    history.push(`/question/${id}`);
  };
  const handleTagClick = (value: string) => {
    if (!tags) return;
    const urlParams = new URLSearchParams(history.location.search);
    urlParams.set("tag", value);
    urlParams.set("state", "tag");
    history.push(`/results?${urlParams.toString()}`);
  };
  const handleAuthorClick = (value: string) => {
    if (!author) return;
    const urlParams = new URLSearchParams(history.location.search);
    urlParams.set("author", value);
    urlParams.set("state", "author");
    history.push(`/results?${urlParams.toString()}`);
  };

  return (
    <>
      <div className="cell">
        <span
          className={`${title? 'cell-link':''}`}
          onClick={handleTitleClick.bind(null, question.id, question.title)}
        >
          {question.title}
        </span>
      </div>
      <div className="subRow">
        <div
          className={`cell cell-count ${answers? 'cell-link':''}`}
          onClick={handleAnswersClick.bind(null, question.id, question.title)}
        >
          answers: {question.answerCount}
        </div>
        <div
          className={`cell cell-author ${author? 'cell-link':''}`}
          onClick={handleAuthorClick.bind(null, question.ownerId)}
        >
          author: {question.ownerName}
        </div>
      </div>
      <div className="cell cell-tags">
        {question.tags.map((tag) => (
          <div
            key={tag}
            className={`tag ${tags? 'cell-link':''}`}
            onClick={handleTagClick.bind(null, tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </>
  );
};

export default Row;
