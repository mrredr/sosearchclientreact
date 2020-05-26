import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parseQueryParams } from '../utils/utils';

export type QueryParams = { query?: string; tag?: string; author?: string; state?: string };

export default function useQueryParams() {
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchString = location.search;
    const queryParamsObject = parseQueryParams(searchString);
    setQueryParams(queryParamsObject);
  }, [location.search]);

  return queryParams;
}
