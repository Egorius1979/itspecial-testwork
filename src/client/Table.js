import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTable, titleSorting, subTitleSorting } from "../app/tableReducer";
import Loader from "./Loader";
import Pagination from "./Pagination";

import "./style.css";

const Table = () => {
  const [toggleCounter, setToggleCounter] = useState(0);
  const { table, hasLoaded, toggleName } = useSelector((state) => state.table);
  const { currentPage } = useSelector((state) => state.pagination);
  const currentTablePage = table[currentPage - 1];
  const dispatch = useDispatch();

  const title = table.length ? currentTablePage[0] : {};
  let resultTitle = [];
  let subTitle = [];
  let subTitleIndex = null;

  for (let key in title) {
    if (typeof title[key] === "object") {
      subTitle = Object.keys(title[key]);
      subTitleIndex = resultTitle.length;
    }
    resultTitle = [...resultTitle, key];
  }

  const cols = resultTitle.length + subTitle.length - 1;

  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);

  return (
    <>
      {!hasLoaded && <Loader />}
      {hasLoaded && (
        <table cols={cols} align="center">
          <thead>
            <tr>
              {resultTitle.map((it, index) =>
                index !== subTitleIndex ? (
                  <th
                    rowSpan="2"
                    onClick={() => {
                      dispatch(titleSorting(it));
                      toggleName === it
                        ? setToggleCounter(toggleCounter + 1)
                        : setToggleCounter(1);
                    }}
                    key={it}>
                    <div className="flex">
                      <span
                        className={`arrow
                      ${toggleName !== it ? "arrow-none" : ""}
                      ${toggleCounter % 2 ? "arrow-bottom" : ""}
                      ${!(toggleCounter % 2) ? "arrow-top" : ""}`}></span>
                      <span>{it}</span>
                    </div>
                  </th>
                ) : (
                  <th
                    colSpan={subTitle.length}
                    key={it}
                    className="cursor-none">
                    {it}
                  </th>
                )
              )}
            </tr>
            <tr>
              {subTitle.map((it) => (
                <th
                  key={it}
                  onClick={() => {
                    dispatch(subTitleSorting("adress", it));
                    toggleName === it
                      ? setToggleCounter(toggleCounter + 1)
                      : setToggleCounter(1);
                  }}>
                  <div className="flex">
                    <span
                      className={`arrow
                      ${toggleName !== it ? "arrow-none" : ""}
                      ${toggleCounter % 2 ? "arrow-bottom" : ""}
                      ${!(toggleCounter % 2) ? "arrow-top" : ""}`}></span>
                    <span>{it}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTablePage.map((item) => (
              <tr key={item.email}>
                <td>
                  <b>{item["№"]}</b>
                </td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.adress.streetAddress}</td>
                <td>{item.adress.city}</td>
                <td>{item.adress.state}</td>
                <td>{item.adress.zip}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination />
    </>
  );
};

export default Table;
