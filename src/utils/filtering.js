let str = "";
let result = [];
let counter = 0;

export function arrayOfStrings(currentTablePage, arrayFromFilterSet) {
  result = [];
  counter = 0;
  console.log("click1");
  currentTablePage.map((it) => {
    str = "";
    return getSrtingFromProps(it, arrayFromFilterSet);
  });

  const resultArray = currentTablePage
  .filter((it, index) => result.includes(index + 1))
  .sort((a, b) => a["№"] - b["№"]);
  return resultArray
}

function getSrtingFromProps(obj, arrayFromFilterSet) {
  counter += 1;
  console.log("click2");
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
