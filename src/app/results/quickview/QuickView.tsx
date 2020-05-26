import React from 'react';
import { useSelector } from '../../../store/connect';
import QuestionsTable from '../../../ui/questionsTable/Table';
import { QueryParams } from '../../../hooks/useQueryParams';
import { State } from '../../../store/store';
import { QuickViewState } from '../Results';
import '../results.css';
import { isEmpty } from 'ramda';

const QuickViewTagTable = ({ tag }: { tag: string; }) => {
  const tagQuestions = useSelector((state: State) => state.questionsByTag[tag]);
  return <QuestionsTable list={tagQuestions} titleFor={`тега ${tag}`} />;
};

const QuickViewAuthorTable = ({ author }: { author: string; }) => {
  const authorQuestions = useSelector((state: State) => state.questionsByAuthor[author]);
  const authorName = authorQuestions && !isEmpty(authorQuestions) ? authorQuestions[0].ownerName : `id:${author}`;
  return <QuestionsTable list={authorQuestions} titleFor={`пользователя ${authorName}`} />;
};

const QuickViewTable = ({ quickViewState = '', params }: { quickViewState: QuickViewState, params: QueryParams | null }) => {
  if (!params) return null;
  if (quickViewState === 'tag') {
    return <QuickViewTagTable tag={params.tag as string} />;
  }
  if (quickViewState === 'author') {
    return <QuickViewAuthorTable author={params.author as string} />;
  }
  return null;
};

export default QuickViewTable;
