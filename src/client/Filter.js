import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayOfStrings } from "../utils/filtering";
import { setFilteredPAge } from "../app/tableReducer";

const Filter = ({ currentTablePage }) => {
  const [forFiltering, setForFiltering] = useState("");
  const { filteredPage } = useSelector((s) => s.table);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!filteredPage) {
      setForFiltering("");
    }
  }, [filteredPage]);

  return (
    <div className="flex search">
      <textarea
        name="filter"
        id=""
        cols="50"
        rows="5"
        placeholder="фильтрация по таблице"
        title="фильтрация по нескольким полям через: пробел (многократные тоже); запятую; вариации запятая-пробел/пробел-запятая"
        autoFocus
        className="fixed-field"
        value={forFiltering}
        onChange={(e) => {
          setForFiltering(e.target.value);
        }}></textarea>
      <button
        type="button"
        onClick={() =>
          dispatch(
            setFilteredPAge(
              arrayOfStrings(currentTablePage, forFiltering.split(/, +| +|,/))
            )
          )
        }>
        Найти
      </button>
    </div>
  );
};

export default React.memo(Filter);
