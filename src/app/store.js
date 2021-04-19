import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./PaginationReducer";
import tableReducer from "./tableReducer";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    pagination: paginationReducer
  },
});
