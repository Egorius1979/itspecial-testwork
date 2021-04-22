import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayOfStrings } from "../utils/filtering";
import { setFilteredTable } from "../app/tableReducer";
import { setCurrentPage } from "../app/PaginationReducer";

const Filter = ({ currentTablePage }) => {
  const [forFiltering, setForFiltering] = useState("");
  // const { filteredTable } = useSelector((s) => s.table);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!filteredTable) {
  //     setForFiltering("");
  //   }
  // }, [filteredTable]);

  return (
    <div className="flex search">
      <textarea
        name="filter"
        cols="50"
        rows="5"
        placeholder="фильтр по таблице"
        title="фильтрация по нескольким полям через: пробел (многократные тоже); запятую; вариации запятая-пробел/пробел-запятая"
        autoFocus
        className="fixed-field "
        value={forFiltering}
        onChange={(e) => {
          setForFiltering(e.target.value);
        }}></textarea>
      <button
        type="button"
        onClick={() => {
          if (!forFiltering) {
            dispatch(setFilteredTable(null))
            // dispatch(setCurrentPage(1))
          } else {
            dispatch(
              setFilteredTable(
                arrayOfStrings(currentTablePage, forFiltering.split(/, +| +|,/))
              )
            );
            // dispatch(setCurrentPage(1))
          }

        }}>
        Найти
      </button>
    </div>
  );
};

export default React.memo(Filter);
