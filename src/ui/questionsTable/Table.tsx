import React, { useState, useEffect } from "react";
import { isEmpty } from "ramda";
import Row from "../questionRow/QuestionRow";
import { Question } from "../../store/store";
import { ClickableLinks } from "../questionRow/QuestionRow";
import { SortKeys, SortPanel } from './sortpanel/SortPanel';
import { Directions } from './sortpanel/SortButton';

import "./table.css";

const Table = ({
  list = [],
  titleFor,
  clickableLinks,
}: {
  list: Question[];
  titleFor: string;
  clickableLinks?: ClickableLinks;
}) => {
  const [soretedList, setSortedList] = useState<Question[]>([]);
  useEffect(() => {
    setSortedList([...list]);
  }, [list]);

  if (isEmpty(list)) {
    return (
      <div className="tableWrapper">
        <h2>Нет вопросов для {titleFor}</h2>
      </div>
    );
  }

  const handleSort = ({ type, direction}) => {
    if (type === SortKeys.default) {
      setSortedList([...list]);
      return;
    }
    const [c, d] = direction === Directions.positive ? [1, -1] : [-1, 1];
    setSortedList([...list].sort((a, b) => (a[type] > b[type] ? c : d)));
  };

  return (
    <div className="tableWrapper">
      <h2>Результаты поиска для {titleFor}</h2>
      <div className="table">
        <SortPanel onChange={handleSort} />
        {soretedList.map((item) => (
          <div className="row" key={item.id}>
            <Row question={item} clickableLinks={clickableLinks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
