import React, { useState, useEffect } from "react";

export const Directions = {
  default: "default",
  positive: "positive",
  negative: "negative",
} as const;

const DirectionSymbol = {
  [Directions.default]: "",
  [Directions.positive]: "/\\",
  [Directions.negative]: "\\/",
};

export const SortButton = ({ text, type, onClick, activeSortKey }) => {
  const [direction, setDirection] = useState<keyof typeof Directions>(
    Directions.default
  );

  useEffect(() => {
    if (activeSortKey !== type) {
      setDirection(Directions.default);
    }
  }, [activeSortKey]);

  const handleClick = () => {
    const newDirection = {
      [Directions.default]: Directions.positive,
      [Directions.positive]: Directions.negative,
      [Directions.negative]: Directions.positive,
    }[direction];
    setDirection(newDirection);
    onClick({ type, direction: newDirection });
  };

  return (
    <input
      type="button"
      className={`${activeSortKey === type ? "active" : ""}`}
      onClick={handleClick}
      value={`${text} ${DirectionSymbol[direction]}`}
    />
  );
};
