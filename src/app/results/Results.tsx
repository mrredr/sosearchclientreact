import React, { useEffect, useState } from 'react';
import { isEmpty, prop } from 'ramda';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import QuestionsTable from '../../ui/questionsTable/Table';
import Loader from '../../ui/loader/Loader';
import useQueryParams  from '../../hooks/useQueryParams';
import { State } from '../../store/store';
import QuickViewTable from './quickview/QuickView';
import { loadResultsPage } from '../../store/sagas';

import './results.css';

const Results = () => {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const [searchQuery, setSearchQuery] = useState('');
  const loading = useSelector((state: State) => prop('loading', state));
  const questions = useSelector((state: State) => state.queryQuestions[searchQuery] || []);

  useEffect(() => {
    if (isEmpty(queryParams) || queryParams === null) return;
    const { query } = queryParams;
    if (query) {
      setSearchQuery(query);
      dispatch(loadResultsPage(queryParams));
    }
  }, [queryParams, dispatch]);

  if (loading || queryParams === null) {
    return <Loader />;
  }

  const isQueryAvailable = queryParams && queryParams.query;

  if ((queryParams !== null && isEmpty(queryParams)) || (!isQueryAvailable)) {
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
          <QuickViewTable params={queryParams} />
        </div>
      </>
    )
  );
};

export default Results;
