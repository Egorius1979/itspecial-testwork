import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../app/PaginationReducer";

const Pagination = ({currentTablePage}) => {
  const { currentPage, perPage } = useSelector((s) => s.pagination);
  const totalAmount = useSelector((s) => s.table.table.length);
  const pagesCount = totalAmount / perPage;
  const pages = new Array(pagesCount)
    .fill(null)
    .map((it, index) => index + 1);
  const dispatch = useDispatch();

  return (
    !!currentTablePage.length && pages.length > 1 && (
      <div className="pagination">
        <button
          type="button"
          disabled={+currentPage === 1}
          className="pagination-btn"
          onClick={() => dispatch(setCurrentPage(1))}>
          {"<<"}
        </button>
        {pages.map((page, index) => (
          <button
            type="button"
            disabled={+currentPage === page}
            className="pagination-btn"
            key={index}
            onClick={() => dispatch(setCurrentPage(page))}>
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={+currentPage === pagesCount}
          className="pagination-btn"
          onClick={() => dispatch(setCurrentPage(pagesCount))}>
          {">>"}
        </button>
      </div>
    )
  );
};

export default React.memo(Pagination);