import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { arrayOfStrings, filterCopy } from "../utils/filtering";
import { setFilteredTable } from "../app/tableReducer";

const Filter = ({ currentTablePage }) => {
  const [forFiltering, setForFiltering] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex search">
      <textarea
        name="filter"
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
          if (filterCopy !== forFiltering) {
            if (!forFiltering) {
              dispatch(setFilteredTable(null));
            } else {
              dispatch(
                setFilteredTable(
                  arrayOfStrings(currentTablePage, forFiltering)
                )
              );
            }
          }

        }}>
        Найти
      </button>
    </div>
  );
};

export default React.memo(Filter);
