export let filterCopy = "";
let result = [];

export function filteredTable(stringArrayforFilter, forFiltering, table) {
  result = [];
  filterCopy = forFiltering;
  const arrayFromFilterSet = forFiltering.split(/, +| +|,|	/);

  for (let idx = 0; idx < stringArrayforFilter.length; idx += 1) {
    if (
      arrayFromFilterSet.filter((it) => stringArrayforFilter[idx].includes(it))
        .length === arrayFromFilterSet.length
    ) {
      result = [...result, idx];
    }
  }

  const resultArray = table
    .filter((it, index) => result.includes(index))
    .sort((a, b) => a["№"] - b["№"]);
  return resultArray;
}
