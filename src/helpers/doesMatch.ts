import * as _ from "lodash";
import { Filter, FilterOptions } from "./filter";

export function doesItemMatch(
  item: any,
  filterFieldName: string,
  filter: Filter
): boolean {
  const optionsParsed: FilterOptions = (filter && filter.options) || {};
  const itemValue = _.get(item, filterFieldName);
  const filterValue: any = filter && filter.value;
  if (optionsParsed.isManyFilter) {
    return doesManyMatch(itemValue, filterValue)
  }
  return doesStringMatch(itemValue, filterValue, optionsParsed);
}

function doesManyMatch(itemValue: [], filterValue: any): boolean {
  const parsedValue = Array.isArray(itemValue) ? itemValue : [];
  const parsedFilterValue: string[] = Array.isArray(filterValue) ? filterValue : [];
  const parsedFilterValueKeys = new Set(parsedFilterValue);
  let matches: boolean[] = parsedValue.map((str) => parsedFilterValueKeys.has(str));
  const doesMatch = matches.reduce((acc, match) => acc || match, false);
  return doesMatch;
}

function doesStringMatch(itemValue: any, filterValue: any, optionsParsed: FilterOptions): boolean {
  const parsedItemValueInput = parseItemValue(itemValue);
  const parsedFilterInput = parseFilterValue(filterValue);
  let parsedItemValue = parsedItemValueInput;
  let parsedFilter = parsedFilterInput;
  if (!optionsParsed.caseSensitive) {
    parsedItemValue = parsedItemValueInput.toLowerCase();
    parsedFilter = parsedFilterInput.map((i) =>
      (i + "").toString().toLowerCase()
    );
  }
  let matches: boolean[] = parsedFilter.map((str) => str === parsedItemValue);
  const doesMatch = matches.reduce((acc, match) => acc || match, false);
  return doesMatch;
}

function parseItemValue(itemValue: string | null | any): string {
  if (_.isNil(itemValue)) {
    return "";
  }
  if (typeof itemValue === "string") {
    return itemValue;
  }
  if (typeof itemValue === "number") {
    return itemValue.toString();
  }
  return itemValue.toString();
}

function parseFilterValue(
  filterValue: string[] | string | null | any
): string[] {
  if (_.isNil(filterValue)) {
    return [];
  }
  if (_.isArray(filterValue)) {
    return filterValue.map(v => v + '');
  }
  if (typeof filterValue === "string") {
    return [filterValue];
  }
  if (typeof filterValue === "boolean") {
    return [filterValue.toString()];
  }
  return [filterValue];
}
