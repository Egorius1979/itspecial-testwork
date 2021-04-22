export let filterCopy = "";
let str = "";
let result = [];
let counter = 0;

export function arrayOfStrings(currentTablePage, forFiltering) {
  result = [];
  counter = 0;
  filterCopy = forFiltering

  const arrayFromFilterSet = forFiltering.split(/, +| +|,/)
  currentTablePage.map((it) => {
    str = "";
    return getSrtingFromProps(it, arrayFromFilterSet);
  });

  const resultArray = currentTablePage
    .filter((it, index) => result.includes(index + 1))
    .sort((a, b) => a["№"] - b["№"]);
  return resultArray;
}

function getSrtingFromProps(obj, arrayFromFilterSet) {
  counter += 1;
  getProp(obj);
  function getProp(o) {
    for (let prop in o) {
      if (typeof o[prop] === "object") {
        getProp(o[prop]);
      } else {
        str = `${str} ` + o[prop];
      }
    }
  }
  if (
    arrayFromFilterSet.filter((it) => str.includes(it)).length ===
    arrayFromFilterSet.length
  ) {
    result = [...result, counter];
  }
}
