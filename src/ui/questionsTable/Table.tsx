import React from 'react';
import { isEmpty } from 'ramda';
import Row from '../questionRow/QuestionRow';
import { Question } from '../../store/store';

import './table.css';

const Table = ({ list = [], titleFor }: { list: Question[], titleFor: string }) => {
  if (isEmpty(list)) {
    return (
      <div className="tableWrapper">
        <h2>
          Нет вопросов для {titleFor}
        </h2>
      </div>
    );
  }

  return (
    <div className="tableWrapper">
      <h2>
        Результаты поиска для {titleFor}
      </h2>
      <div className="table">
        {list.map((item) => (
          <div className="row" key={item.id}>
            <Row question={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
