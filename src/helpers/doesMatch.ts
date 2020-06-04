import * as _ from "lodash";
import { Filter, FilterOptions } from "./filter";

export function doesItemMatch(
  item: any,
  filterFieldName: string,
  filter: Filter
): boolean {
  const optionsParsed: FilterOptions = (filter && filter.options) || {};
  const filterValue: any = filter && filter.value;
  const itemValue = _.get(item, filterFieldName);
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
  return filterValue;
}
