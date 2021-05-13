import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  table: [],
  tableLayout: {},
  hasLoaded: false,
  filteredTable: null,
  selectedPerson: null,
  error: "",
  stringArrayforFilter: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
      state.hasLoaded = true;
    },
    setTableLayout: (state, action) => {
      state.tableLayout = action.payload;
    },
    setFilteredPAge: (state, action) => {
      state.filteredTable = action.payload;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setError: (state, action) => {
      state.error = action.err;
    },
    setStringArrayforFilter: (state, action) => {
      state.stringArrayforFilter = action.payload;
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
      .then((res) => {
        const header = res[0];
        let title = [];
        let subTitle = [];
        let subTitleIndex = null;

        for (let key in header) {
          if (typeof header[key] === "object") {
            subTitle = Object.keys(header[key]);
            subTitleIndex = title.length;
          }
          title = [...title, key];
        }
        const cols = title.length + subTitle.length - 1;
        const tableLayout = { cols, title, subTitle, subTitleIndex };

        dispatch({ type: "table/setTableLayout", payload: tableLayout });
        dispatch({ type: "table/setTable", payload: res });

        let strFromTableRow = "";
        let result = [];

        res.map((it) => {
          strFromTableRow = "";
          getProp(it);
          function getProp(o) {
            for (let prop in o) {
              if (typeof o[prop] === "object") {
                getProp(o[prop]);
              } else {
                strFromTableRow = `${strFromTableRow} ${o[prop]}`;
              }
            }
          }
          strFromTableRow = strFromTableRow.toLowerCase();
          return (result = [...result, strFromTableRow]);
        });
        dispatch({ type: "table/setStringArrayforFilter", payload: result });
      })
      .catch((err) =>
        dispatch({
          type: "table/setError",
          err: `Упс, что-то пошло не так. ${err}. Тебе явно не помешает обновить страницу!`,
        })
      );
  };
}

export function setFilteredTable(value) {
  return (dispatch, getState) => {
    const { currentPage, perPage } = getState().pagination;
    if (value && Math.ceil(value.length / perPage) < currentPage) {
      dispatch({ type: "table/setFilteredPAge", payload: value });
      dispatch({ type: "pagination/setCurrentPage", payload: 1 });
    } else {
      dispatch({ type: "table/setFilteredPAge", payload: value });
    }
  };
}

export const { setSelectedPerson } = tableSlice.actions;

export default tableSlice.reducer;
