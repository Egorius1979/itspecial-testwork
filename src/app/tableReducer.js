import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  table: [],
  hasLoaded: false,
  toggleName: "",
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
      state.hasLoaded = true;
    },
    sort: (state, action) => {
      state.table = action.sortedTable;
      state.toggleName = action.currentSortedColumn || state.toggleName;
    },
  },
});

export function getTable() {
  return (dispatch, getState) => {
    const { perPage } = getState().pagination;
    console.log(perPage);
    let childArray = [];
    axios(
      `http://www.filltext.com/?rows=100&id={number|1000}
      &firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}
      &adress={addressObject}&description={lorem|32}`
    )
      .then((res) => res.data.map((it, index) => ({ "№": index + 1, ...it })))
      .then((res) =>
        res.reduce((acc, rec, index) => {
          childArray = [...childArray, rec];
          if ((index + 1) % perPage === 0 || index === res.length - 1) {
            acc = [...acc, childArray];
            childArray = [];
            return acc;
          }
          return acc;
        }, [])
      )
      .then((res) => dispatch({ type: "table/setTable", payload: res }))
      .catch(
        (err) =>
          `Упс, что-то пошло не так. ${err} Тебе явно не помешает обновить страницу!`
      );
  };
}

export function titleSorting(column) {
  // console.log(column);
  return (dispatch, getState) => {
    const { table, toggleName } = getState().table;
    let forSort = [...table];
    // console.log(toggleName)
    if (toggleName === column) {
      console.log("revers");
      forSort.reverse();
      return dispatch({
        type: "table/sort",
        sortedTable: forSort,
      });
    }
    if (/^\d|\(/.test(forSort[0][column])) {
      if (/^\(/.test(forSort[0][column])) {
        console.log("first");
        forSort = forSort
          .map((it) => ({
            ...it,
            [column]: it[column].replace(/[()-]/g, ""),
          }))
          .sort((a, b) => a[column] - b[column])
          .map((it) => ({
            ...it,
            [column]: `(${it[column].slice(0, 3)})${it[column].slice(
              3,
              6
            )}-${it[column].slice(6)}`,
          }));
      } else {
        console.log("first");
        forSort.sort((a, b) => a[column] - b[column]);
      }
      // console.log("число,", forSort[0][column]);
      return dispatch({
        type: "table/sort",
        sortedTable: forSort,
        currentSortedColumn: column,
      });
    } else {
      console.log("first");
      forSort.sort((a, b) => a[column].localeCompare(b[column]));
      // console.log("строка,", forSort[0][column]);
      return dispatch({
        type: "table/sort",
        sortedTable: forSort,
        currentSortedColumn: column,
      });
    }
  };
}

export function subTitleSorting(title, subTitle) {
  // console.log(title, subTitle);
  return (dispatch, getState) => {
    const { table, toggleName } = getState().table;
    let forSort = [...table];
    if (toggleName === subTitle) {
      console.log("revers");
      forSort.reverse();
      return dispatch({
        type: "table/sort",
        sortedTable: forSort,
        currentSortedColumn: subTitle,
      });
    }
    if (/^\d+$/.test(forSort[0][title][subTitle])) {
      console.log("first");
      forSort.sort((a, b) => a[title][subTitle] - b[title][subTitle]);
    } else {
      console.log("first");
      forSort.sort((a, b) =>
        a[title][subTitle].localeCompare(b[title][subTitle])
      );
    }
    return dispatch({
      type: "table/sort",
      sortedTable: forSort,
      currentSortedColumn: subTitle,
    });
  };
}

export default tableSlice.reducer;
