import React from 'react';
import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';

import QuestionsTable from '../../../ui/questionsTable/Table';
import { QueryParams } from '../../../hooks/useQueryParams';
import { State } from '../../../store/store';
import '../results.css';

const QuickViewTagTable = ({ tag }: { tag: string; }) => {
  const tagQuestions = useSelector((state: State) => state.tagQuestions[tag]);
  return <QuestionsTable list={tagQuestions} titleFor={`тега ${tag}`} clickableLinks={{author: false, tags: false}} />;
};

const QuickViewAuthorTable = ({ author }: { author: string; }) => {
  const authorQuestions = useSelector((state: State) => state.authorQuestions[author]);
  const authorName = authorQuestions && !isEmpty(authorQuestions) ? authorQuestions[0].ownerName : `id:${author}`;
  return <QuestionsTable list={authorQuestions} titleFor={`пользователя ${authorName}`} />;
};

const QuickViewTable = ({ params }: { params: QueryParams | null }) => {
  if (!params) return null;
  if (params.state === 'tag' && params.tag) {
    return <QuickViewTagTable tag={params.tag as string} />;
  }
  if (params.state === 'author' && params.author) {
    return <QuickViewAuthorTable author={params.author as string} />;
  }
  return null;
};

export default QuickViewTable;
