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
  }, [filteredPage])


  return (
    <>
      <textarea
        name="filter"
        id=""
        cols="50"
        rows="5"
        placeholder="фильтрация по нескольким полям строго через одинарный пробел"
        autoFocus
        value={forFiltering}
        onChange={(e) => {
          setForFiltering(e.target.value);
        }}></textarea>
      <button
        type="button"
        onClick={() =>
          dispatch(
            setFilteredPAge(
              arrayOfStrings(currentTablePage, forFiltering.split(" "))
            )
          )
        }>
        Нажми
      </button>
      {/* {JSON.stringify(filteredPage)} */}
    </>
  );
};

export default React.memo(Filter);
