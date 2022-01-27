import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTable, setSelectedPerson } from '../app/tableReducer';
import { titleSorting, subTitleSorting } from '../utils/sorting';
import Filter from './Filter';
import Loader from './Loader';
import Person from './Person';
import Pagination from './Pagination';
import './style.css';

const Table = () => {
  const [currentTablePage, setCurrentTablePage] = useState([]);
  const [toggleCounter, setToggleCounter] = useState(1);
  const [toggleName, setToggleName] = useState('№');
  const { table, tableLayout, hasLoaded, filteredTable, error } = useSelector(
    (s) => s.table
  );
  const { currentPage, perPage } = useSelector((s) => s.pagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);

  useEffect(() => {
    if (table.length) {
      const filteredCurrentTablePage = (filteredTable || table).filter(
        (it, index) =>
          index >= (currentPage - 1) * perPage && index < currentPage * perPage
      );
      setCurrentTablePage(filteredCurrentTablePage);
      setToggleCounter(1);
      setToggleName('№');
    }
  }, [table, currentPage, filteredTable, perPage]);

  return (
    <>
      {!hasLoaded && !error && <Loader />}
      {error && <h3>{error}</h3>}
      {hasLoaded && (
        <>
          <Filter />
          <div className="adapt">
            <table cols={tableLayout.cols} align="center">
              <thead>
                <tr>
                  {tableLayout.title.map((it, index) =>
                    index !== tableLayout.subTitleIndex ? (
                      <th
                        rowSpan="2"
                        onClick={() => {
                          if (currentTablePage.length) {
                            setCurrentTablePage(
                              titleSorting(it, currentTablePage, toggleName)
                            );
                            setToggleName(it);
                            toggleName === it
                              ? setToggleCounter(toggleCounter + 1)
                              : setToggleCounter(1);
                          }
                        }}
                        key={it}>
                        <div className="flex">
                          <span
                            className={`arrow
                      ${toggleName !== it ? 'arrow-none' : ''}
                      ${toggleCounter % 2 ? 'arrow-bottom' : ''}
                      ${!(toggleCounter % 2) ? 'arrow-top' : ''}`}></span>
                          <span>{it}</span>
                        </div>
                      </th>
                    ) : (
                      <th
                        colSpan={tableLayout.subTitle.length}
                        key={it}
                        className="cursor-none">
                        {it}
                      </th>
                    )
                  )}
                </tr>
                <tr>
                  {tableLayout.subTitle.map((it) => (
                    <th
                      key={it}
                      onClick={() => {
                        if (currentTablePage.length) {
                          setCurrentTablePage(
                            subTitleSorting(
                              'adress',
                              currentTablePage,
                              it,
                              toggleName
                            )
                          );
                          setToggleName(it);
                          toggleName === it
                            ? setToggleCounter(toggleCounter + 1)
                            : setToggleCounter(1);
                        }
                      }}>
                      <div className="flex">
                        <span
                          className={`arrow
                      ${toggleName !== it ? 'arrow-none' : ''}
                      ${toggleCounter % 2 ? 'arrow-bottom' : ''}
                      ${!(toggleCounter % 2) ? 'arrow-top' : ''}`}></span>
                        <span>{it}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTablePage.map((item) => (
                  <tr
                    key={item.email}
                    className="string-hover"
                    onClick={() => {
                      dispatch(setSelectedPerson(item));
                    }}>
                    <td aria-label="№">
                      <b>{item['№']}</b>
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
          </div>
        </>
      )}
      <Pagination ready={hasLoaded} />
      <Person />
    </>
  );
};

export default React.memo(Table);
