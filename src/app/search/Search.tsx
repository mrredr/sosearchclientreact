import React, { useState, useEffect } from 'react';
import { trim, isEmpty, prop } from 'ramda';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { State } from '../../store/store';
import Loader from '../../ui/loader/Loader';
import useQueryParams from '../../hooks/useQueryParams';

import './search.css';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const loading = useSelector((state: State) => prop('loading', state));
  const queryParams = useQueryParams();

  const history = useHistory();
  useEffect(() => {
    setSearchValue(queryParams ? queryParams.query || '' : '');
  }, [queryParams]);

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent browser reloading on form event

    const trimmedValue = trim(searchValue);
    if (!isEmpty(trimmedValue)) {
      history.push(`/results?query=${trimmedValue}`);
    } else {
      // TODO:: Highlight input with red light
    }
  };

  const handleChange = (e: any) => {
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
