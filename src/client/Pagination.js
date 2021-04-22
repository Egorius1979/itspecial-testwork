import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../app/PaginationReducer";
import { scrollTo } from "../utils/scroll";

const Pagination = ({ ready }) => {
  const { currentPage, perPage } = useSelector((s) => s.pagination);
  const totalAmount = useSelector((s) => s.table.table.length);
  const filteredTableTotalAmount = useSelector(
    (s) => s.table.filteredTable?.length
  );
  const pagesCount =
    filteredTableTotalAmount !== null &&
    typeof filteredTableTotalAmount !== "undefined"
      ? Math.ceil(filteredTableTotalAmount / perPage)
      : Math.ceil(totalAmount / perPage);
  const pages = new Array(pagesCount).fill(null).map((it, index) => index + 1);
  const dispatch = useDispatch();

  return (
    ready &&
    pages.length > 1 && (
      <div className="pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          className="pagination-btn"
          onClick={() => {
            dispatch(setCurrentPage(1));
            scrollTo();
          }}>
          {"<<"}
        </button>
        {pages.map((page, index) => (
          <button
            type="button"
            disabled={currentPage === page}
            className="pagination-btn"
            key={index}
            onClick={() => {
              dispatch(setCurrentPage(page));
              scrollTo();
            }}>
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage === pagesCount}
          className="pagination-btn"
          onClick={() => {
            dispatch(setCurrentPage(pagesCount));
            // dispatch(setfilteredTable(null));
            scrollTo();
          }}>
          {">>"}
        </button>
      </div>
    )
  );
};

export default React.memo(Pagination);
