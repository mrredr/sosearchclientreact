import React, { useEffect, useState } from 'react';
import { isEmpty, prop } from 'ramda';
import { Link } from 'react-router-dom';

import { useSelector, useAction } from '../../store/connect';
import QuestionsTable from '../../ui/questionsTable/Table';
import Loader from '../../ui/loader/Loader';
import useQueryParams  from '../../hooks/useQueryParams';
import {
  loadQuestionsByQuery as loadQuestionsByQueryAction,
  loadQuestionsByAuthor as loadQuestionsByAuthorAction,
  loadQuestionsByTag as loadQuestionsByTagAction,
} from '../../store/actions';
import { State } from '../../store/store';
import QuickViewTable from './quickview/QuickView';

import './results.css';

export type QuickViewState = 'tag' | 'author' | '';


const Results = () => {
  const [quickViewState, setQuickViewState] = useState<QuickViewState>('');
  const queryParams = useQueryParams();
  const [searchQuery, setSearchQuery] = useState('');
  const loading = useSelector(prop('loading'));
  const questions = useSelector((state: State) => state.questionsByQuery[searchQuery] || []);
  const loadQuestionsByQuery = useAction(loadQuestionsByQueryAction);
  const loadQuestionsByAuthor = useAction(loadQuestionsByAuthorAction);
  const loadQuestionsByTag = useAction(loadQuestionsByTagAction);


  useEffect(() => {
    if (isEmpty(queryParams) || queryParams === null) return;
    const {
      query,
      state,
      tag,
      author,
    } = queryParams;
    if (query) {
      setSearchQuery(query);
      loadQuestionsByQuery(query);
    }
    if (!state || isEmpty(state) || (state !== 'author' && state !== 'tag')) {
      setQuickViewState('');
      return;
    }
    if (state && state === 'tag' && tag && !isEmpty(tag)) {
      setQuickViewState('tag');
      loadQuestionsByTag(tag);
      return;
    }
    if (state && state === 'author' && author && !isEmpty(author)) {
      setQuickViewState('author');
      loadQuestionsByAuthor(author);
      return;
    }
    setQuickViewState('');
  }, [queryParams]);

  if (loading || queryParams === null) {
    return <Loader />;
  }

  const isQueryAvailable = queryParams && queryParams.query;

  if ((queryParams !== null && isEmpty(queryParams)) || (quickViewState === '' && !isQueryAvailable)) {
    return (
      <h2>
        Неверные параметры страницы. <Link to="/">Искать заново</Link>
      </h2>
    );
  }

  return (
    questions && (
      <>
        <Link to="/">Искать заново</Link>
        <div className="tables">
          {isQueryAvailable && <QuestionsTable list={questions} titleFor={searchQuery} />}
          <QuickViewTable quickViewState={quickViewState} params={queryParams} />
        </div>
      </>
    )
  );
};

export default Results;
