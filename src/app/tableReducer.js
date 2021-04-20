import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  table: [],
  hasLoaded: false,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
      state.hasLoaded = true;
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

export const { setCurrentTablePage } = tableSlice.actions;

export default tableSlice.reducer;
