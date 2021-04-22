import React from "react";
import { useSelector } from "react-redux";

const Person = () => {
  const { selectedPerson: chel } = useSelector((s) => s.table);

  return (
    <>
      {chel && (
        <div className="flex">
          <div id="person">
            <p>
              Выбран пользователь: <b>{`${chel.firstName} ${chel.lastName}`}</b>
            </p>
            <p>Описание:</p>
            <textarea
              disabled
              placeholder={chel.description}
              cols="50"
              rows="5"
              className="fixed-field "
            />
            <p>
              Адрес проживания: <b>{chel.adress?.streetAddress}</b>
            </p>
            <p>
              Город: <b>{chel.adress?.city}</b>
            </p>
            <p>
              Провинция/штат: <b>{chel.adress?.state}</b>
            </p>
            <p>
              Индекс: <b>{chel.adress?.zip}</b>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Person);
