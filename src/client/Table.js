import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTable } from "../app/tableReducer";
import { titleSorting, subTitleSorting } from "../utils/sorting";
import Filter from "./Filter";
import Loader from "./Loader";
import Pagination from "./Pagination";
import "./style.css";

const Table = () => {
  const [currentTablePage, setCurrentTablePage] = useState([]);
  const [filteredDisplayPage, setFilteredDisplayPage] = useState(null);
  const [toggleCounter, setToggleCounter] = useState(1);
  const [toggleName, setToggleName] = useState("№");
  const { table, filteredPage } = useSelector((state) => state.table);
  const { currentPage, perPage } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  console.log(
    "инициализация",
    `столбец "${toggleName}", кликов подряд:`,
    toggleCounter
  );

  const title = currentTablePage[0];
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

  useEffect(() => {
    const filteredCurrentTablePage = table.filter(
      (it, index) =>
        index >= (currentPage - 1) * perPage && index < currentPage * perPage
    );
    setCurrentTablePage(filteredCurrentTablePage);
    setToggleCounter(1);
  }, [table, currentPage, perPage]);

  useEffect(() => {
    setFilteredDisplayPage(filteredPage);
  }, [filteredPage]);

  return (
    <>
      {!currentTablePage.length && <Loader />}
      {!!currentTablePage.length && (
        <>
          <Filter currentTablePage={currentTablePage} />
          <table cols={cols} align="center">
            <thead>
              <tr>
                {resultTitle.map((it, index) =>
                  index !== subTitleIndex ? (
                    <th
                      rowSpan="2"
                      onClick={() => {
                        filteredDisplayPage
                          ? setFilteredDisplayPage(
                              titleSorting(it, filteredDisplayPage, toggleName)
                            )
                          : setCurrentTablePage(
                              titleSorting(it, currentTablePage, toggleName)
                            );
                        setToggleName(it);
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
                      filteredDisplayPage ? setFilteredDisplayPage(subTitleSorting(
                        "adress",
                        filteredDisplayPage,
                        it,
                        toggleName
                      )) :
                      setCurrentTablePage(
                        subTitleSorting(
                          "adress",
                          currentTablePage,
                          it,
                          toggleName
                        )
                      );
                      setToggleName(it);
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
              {(filteredDisplayPage || currentTablePage).map((item, index) => (
                <tr
                  key={item.email}
                  className="string-hover"
                  id={`srt${index + 1}`}>
                  <td>
                    <b>{item["№"]}</b>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.adress?.streetAddress}</td>
                  <td>{item.adress?.city}</td>
                  <td>{item.adress?.state}</td>
                  <td>{item.adress?.zip}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Pagination currentTablePage={currentTablePage} />
    </>
  );
};

export default React.memo(Table);
