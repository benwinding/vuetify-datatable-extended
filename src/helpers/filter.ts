import * as _ from "lodash";
import { doesItemMatch } from "./doesMatch";

export interface FilterOptions {
  caseSensitive?: boolean;
  isCheckbox?: boolean;
}

export interface Filter {
  options?: FilterOptions;
  value?: any;
}

interface Filters {
  [key: string]: Filter;
}

class FilterArraysHandler {
  private filters: Filters = {};
  private activeFilters: { [key: string]: boolean } = {};

  updateFilterValue(filterFieldName: string, filterValue: any) {
    if (!this.filters[filterFieldName]) {
      this.filters[filterFieldName] = {};
    }
    this.filters[filterFieldName].value = filterValue;
    const hasValue =
      !_.isNil(filterValue) ||
      (Array.isArray(filterValue) && !EmptyArray(filterValue));
    this.activeFilters[filterFieldName] = hasValue;
    console.log({ activeFilters: this.activeFilters });
  }

  registerFilter(filterFieldName: string, options: FilterOptions) {
    this.filters[filterFieldName] = {
      options: options,
      value: null,
    };
  }

  runFilter(item: Object): boolean {
    const activeFilters = Object.entries(this.activeFilters).filter(
      (a) => a[1]
    );
    if (!activeFilters.length) {
      return true;
    }
    const results = activeFilters.map(([filterFieldName]) => {
      const filterObject = this.filters[filterFieldName];
      const doesItMatch = doesItemMatch(item, filterFieldName, filterObject);
      return doesItMatch;
    });
    const doesMatch = results.reduce((acc, match) => acc || match, false);
    return doesMatch;
  }
}

export function EmptyArray(arr: any[]): boolean {
  if (!Array.isArray(arr)) {
    return true;
  }
  const allValuesNil = arr.every((v) => _.isNil(v));
  if (allValuesNil) {
    return true;
  }
  return false;
}

export default FilterArraysHandler;
