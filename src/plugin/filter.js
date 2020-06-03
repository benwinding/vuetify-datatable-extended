// Credit: https://github.com/frontid/vuetify-data-table-multi-filter

class FiltersHandler {
  constructor() {
    this.filterCallbacks = {};
    this.filterValues = {};
  }

  updateFilterValues(filterValues) {
    console.log('updated filter: ', {filterValues})
    this.filterValues = filterValues;
  }

  registerFilter(filterName, filterCallback) {
    this.filterCallbacks[filterName] = filterCallback;
  }

  runFilters(value, search, item) {
    const self = this;

    for (let [filterName, filterCallback] of Object.entries(this.filterCallbacks)) {
      const filterSearchValue = self.filterValues[filterName];
      const isFiltered = filterCallback(value, filterSearchValue, item)
      if (!isFiltered) {
        return false;
      }
    }
    return true;
  }

}

export default FiltersHandler;
