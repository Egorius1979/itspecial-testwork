import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  table: [],
  hasLoaded: false,
  filteredTable: null,
  selectedPerson: null,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
      state.hasLoaded = true;
    },
    setFilteredPAge: (state, action) => {
      state.filteredTable = action.payload;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
  },
});

export function getTable() {
  return (dispatch) => {
    axios(
      `http://www.filltext.com/?rows=100&id={number|1000}
      &firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}
      &adress={addressObject}&description={lorem|32}`
    )
      .then((res) => res.data.map((it, index) => ({ "№": index + 1, ...it })))
      .then((res) => dispatch({ type: "table/setTable", payload: res }))
      .catch(
        (err) =>
          `Упс, что-то пошло не так. ${err} Тебе явно не помешает обновить страницу!`
      );
  };
}

export function setFilteredTable(value) {
  return (dispatch, getState) => {
    const { currentPage } = getState().pagination;
    if (value) {
      if (value.length < currentPage) {
        dispatch({ type: "table/setFilteredPAge", payload: value });
        dispatch({ type: "pagination/setCurrentPage", payload: 1 });
      } else {
        dispatch({ type: "table/setFilteredPAge", payload: value });
      }
    } else {
      dispatch({ type: "table/setFilteredPAge", payload: value });
    }
  };
}

export const { setSelectedPerson } = tableSlice.actions;

export default tableSlice.reducer;
