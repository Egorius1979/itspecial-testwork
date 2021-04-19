import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { createPages } from "../utils/pageCreator";
import { setCurrentPage } from "../app/PaginationReducer";

const Pagination = () => {
  const { currentPage } = useSelector((s) => s.pagination);
  const pagesCount = useSelector((s) => s.table.table.length);
  const pages = Array(pagesCount)
    .fill(null)
    .map((it, index) => index + 1);
  const dispatch = useDispatch();
  // const pages = [];
  // createPages(pages, pagesCount, currentPage);

  return (
    pages.length > 1 && (
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

export default Pagination;
