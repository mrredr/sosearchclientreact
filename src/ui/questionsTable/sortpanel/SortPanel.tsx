import React, { useState, useEffect } from "react";
import { SortButton } from './SortButton';
import "./sortpanel.css";

export const SortKeys = {
  default: "default",
  answerCount: "answerCount",
  ownerName: "ownerName",
  title: "title",
} as const;
type SortKeysType = keyof typeof SortKeys;

export const SortPanel = ({ onChange }) => {
  const [sortKey, setSortKey] = useState<SortKeysType>(SortKeys.default);

  const handleSort = ({ type, direction }) => {
    setSortKey(type);
    onChange({ type, direction });
  };

  const handleReset = () => {
    setSortKey(SortKeys.default);
    onChange({ type: SortKeys.default });
  };

  return (
    <p>
      Сортировать по
      <SortButton
        text="названию"
        type={SortKeys.title}
        onClick={handleSort}
        activeSortKey={sortKey}
      />
      <SortButton
        text="кол-ву ответов"
        type={SortKeys.answerCount}
        onClick={handleSort}
        activeSortKey={sortKey}
      />
      <SortButton
        text="автору"
        type={SortKeys.ownerName}
        onClick={handleSort}
        activeSortKey={sortKey}
      />
      {sortKey !== SortKeys.default && (
        <input
          type="button"
          onClick={handleReset}
          value="Сбросить"
        />
      )}
    </p>
  );
};
