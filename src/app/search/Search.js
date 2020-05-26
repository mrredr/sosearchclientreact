import React, { useState, useEffect } from 'react';
import { trim, isEmpty, prop } from 'ramda';
import { useHistory } from 'react-router-dom';
import './search.css';
import { useAction, useSelector } from '../../store/connect';
import { loadQuestionsByQuery as loadResultsAction} from '../../store/actions.ts';
import Loader from '../../ui/loader/Loader';
import useQueryParams from '../../hooks/useQueryParams';


function Search() {
  const [searchValue, setSearchValue] = useState('');
  const loadResults = useAction(loadResultsAction);
  const loading = useSelector(prop('loading'));
  const queryParams = useQueryParams();

  const history = useHistory();
  useEffect(() => {
    setSearchValue(queryParams && queryParams.query || '');
  }, [queryParams]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent browser reloading on form event

    const trimmedValue = trim(searchValue);
    if (!isEmpty(trimmedValue)) {
      loadResults(trimmedValue).then(() => {
        history.push(`/results?query=${trimmedValue}`);
      });
    } else {
      // TODO:: Highlight input with red light
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    history.push(`/?query=${trim(value)}`);
    setSearchValue(value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form className="search" onSubmit={handleSubmit} autoComplete="on">
      <input
        type="text"
        className="search-input"
        onChange={handleChange}
        value={searchValue}
      />
      <input
        type="submit"
        className="search-button"
        value="Поиск"
      />
    </form>
  );
}

export default Search;
