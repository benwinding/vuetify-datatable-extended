// Credit: https://github.com/frontid/vuetify-data-table-multi-filter

class FiltersHandler {
  constructor() {
    this.filterCallbacks = {};
    this.filterValues = {};
  }

  updateFilterValue(filterName, filterValue) {
    console.log('updated filter: ', filterName, ' value:', filterValue)
    this.filterValues[filterName] = filterValue;
  }

  registerFilter(filterName, filterCallback) {
    this.filterCallbacks[filterName] = filterCallback;
  }

  runFilters(value, search, item) {
    const self = this;
    console.log('running filters: ', {value, search, item})

    for (let [filterName, filterCallback] of Object.entries(this.filterCallbacks)) {
      const filterValue = self.filterValues[filterName];
      const isFiltered = filterCallback(filterValue, item)
      if (!isFiltered) {
        return false;
      }
    }
    return true;
  }

}

export default FiltersHandler;
