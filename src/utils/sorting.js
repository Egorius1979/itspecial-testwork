export function titleSorting(column, forSorting, toggleName) {
    // проверяем, что прошлый клик был конкретно по данному столбцу, если да - обратная сортировка
    if (toggleName === column) {
      console.log("reverse");
      return [...forSorting].reverse();
    }
    // проверка на число либо телефонный номер
    if (/^\d|\(/.test(forSorting[0][column])) {
      // если номер - преобразование к числу, сортировка, обратное преобразование к шаблону тел.номера
      if (/^\(/.test(forSorting[0][column])) {
        console.log("first, тел. номер");
        return [...forSorting]
          .map((it) => ({
            ...it,
            [column]: it[column].replace(/[()-]/g, ""),
          }))
          .sort((a, b) => a[column] - b[column])
          .map((it) => ({
            ...it,
            [column]: `(${it[column].slice(0, 3)})${it[column].slice(3, 6)}-${it[
              column
            ].slice(6)}`,
          }));
      }
      // сортировка, если  число
      console.log("first, число");
      return [...forSorting].sort((a, b) => a[column] - b[column]);
    }
    // сортировка строк
    console.log("first, строка");
    return [...forSorting].sort((a, b) => a[column].localeCompare(b[column]));

}

// по аналогии с верхней функцией
export function subTitleSorting(title, forSorting, subTitle, toggleName) {
  if (toggleName === subTitle) {
    console.log("revers");
    return [...forSorting].reverse();
  }
  if (/^\d+$/.test(forSorting[0][title][subTitle])) {
    console.log("first, число");
    return [...forSorting].sort((a, b) => a[title][subTitle] - b[title][subTitle]);
  } else {
    console.log("first, строка");
    return [...forSorting].sort((a, b) =>
      a[title][subTitle].localeCompare(b[title][subTitle])
    );
  }
}
