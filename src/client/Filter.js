import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { arrayOfStrings } from "../utils/filtering";
import { setFilteredTable, setSelectedPerson } from "../app/tableReducer";

const Filter = ({ currentTablePage }) => {
  const [forFiltering, setForFiltering] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex search">
      <textarea
        name="filter"
        // cols="50"
        // rows="5"
        placeholder="фильтр по таблице"
        title="фильтрация по нескольким полям через: пробел (многократные тоже); запятую; вариации запятая-пробел/пробел-запятая"
        autoFocus
        className="fixed-field"
        value={forFiltering}
        onChange={(e) => {
          setForFiltering(e.target.value);
        }}></textarea>
      <button
        type="button"
        onClick={() => {
          if (!forFiltering) {
            dispatch(setFilteredTable(null));
            dispatch(setSelectedPerson(null));
          } else {
            dispatch(
              setFilteredTable(
                arrayOfStrings(currentTablePage, forFiltering.split(/, +| +|,/))
              )
            );
            dispatch(setSelectedPerson(null));
          }
        }}>
        Найти
      </button>
    </div>
  );
};

export default React.memo(Filter);
