import * as _ from "lodash";
import { doesItemMatch } from "./doesMatch";

export interface FilterOptions {
  caseSensitive?: boolean;
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

  updateFilterValue(filterFieldName: string, filterValue: any) {
    if (!this.filters[filterFieldName]) {
      this.filters[filterFieldName] = {};
    }
    this.filters[filterFieldName].value = filterValue;
  }

  registerFilter(filterFieldName: string, options: FilterOptions) {
    this.filters[filterFieldName] = {
      options: options,
      value: null,
    };
  }

  runFilter(item: Object): boolean {
    if (_.isEmpty(this.filters) || !_.isObject(this.filters)) {
      return true;
    }
    if (Object.values(this.filters).every((f) => _.isNil(f.value))) {
      return true;
    }
    const filterEntries = Object.entries(this.filters);
    const results = filterEntries.map(
      ([filterFieldName, filterObject]) => {
        const doesItMatch = doesItemMatch(item, filterFieldName, filterObject);
        return doesItMatch;
      }
    );
    const doesMatch = results.reduce((acc, match) => acc || match, false);
    return doesMatch;
  }
}

export default FilterArraysHandler;
