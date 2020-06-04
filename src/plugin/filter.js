// Credit: https://github.com/frontid/vuetify-data-table-multi-filter

class FilterArraysHandler {
  constructor() {
    this.filterCallbacks = {};
    this.filterValuesArray = {};
    this.filterMatchAll = {};
  }

  updateFilterValue(filterFieldName, filterValue, matchAll) {
    this.filterValuesArray[filterFieldName] = filterValue;
    this.filterMatchAll[filterFieldName] = matchAll;
  }

  registerFilter(filterFieldName, filterCallback) {
    this.filterCallbacks[filterFieldName] = filterCallback;
  }

  runFilter(item) {
    const self = this;
    if (!Object.values(self.filterValuesArray).length) {
      return true;
    }
    const applyFilter = (filterFieldName, filterCallback) => {
      const filterFieldValue = self.filterValuesArray[filterFieldName];
      const hasNoValue =
        !filterFieldValue ||
        (Array.isArray(filterFieldValue) && !filterFieldValue.length);
      if (hasNoValue) {
        return true;
      }
      const isFiltered = filterCallback(
        filterFieldName,
        filterFieldValue,
        item
      );
      return isFiltered;
    };
    const filterEntries = Object.entries(this.filterCallbacks);
    const result = filterEntries.reduce(
      (acc, [filterFieldName, filterCallback]) => {
        const filterResult = applyFilter(filterFieldName, filterCallback);
        if (self.filterMatchAll[filterFieldName]) {
          return acc && filterResult;
        }
        return acc || filterResult;
      },
      false
    );
    return result;
  }
}

export default FilterArraysHandler;
