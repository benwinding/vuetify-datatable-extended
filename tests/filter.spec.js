import FilterArraysHandler from "../src/plugin/filter";

describe("test filter", () => {
  test("test no filters registered", () => {
    const f = new FilterArraysHandler();
    const item = {
      name: "Okay",
      category: "A",
    };
    expect(f.runFilter(item)).toBe(true);
  });

  test("test no filter values", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("name", (filterFieldName, filterFieldValue, item) => {
      return false;
    });
    const item = {
      name: "Okay",
      category: "A",
    };
    expect(f.runFilter(item)).toBe(true);
  });

  test("test filter category not present", () => {
    const f = new FilterArraysHandler();
    f.registerFilter(
      "category",
      (filterFieldName, filterFieldValueArray, item) => {
        if (
          filterFieldValueArray.some((v) => item[filterFieldName].includes(v))
        ) {
          return true;
        }
        return false;
      }
    );
    f.updateFilterValue('category', ['A']);
    const item = {
      name: "Okay",
      category: "A",
    };
    expect(f.runFilter(item)).toBe(true);
  });

  test("test filter category is present", () => {
    const f = new FilterArraysHandler();
    f.registerFilter(
      "category",
      (filterFieldName, filterFieldValueArray, item) => {
        if (
          filterFieldValueArray.some((v) => item[filterFieldName].includes(v))
        ) {
          return true;
        }
        return false;
      }
    );
    f.updateFilterValue('category', ['B']);
    const item = {
      name: "Okay",
      category: "A",
    };
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter category multiple filters selected", () => {
    const f = new FilterArraysHandler();
    f.registerFilter(
      "category",
      (filterFieldName, filterFieldValueArray, item) => {
        if (
          filterFieldValueArray.some((v) => item[filterFieldName].includes(v))
        ) {
          return true;
        }
        return false;
      }
    );
    f.updateFilterValue('category', ['B']);
    const item = {
      name: "Okay",
      category: "A",
    };
    expect(f.runFilter(item)).toBe(false);
  });
});
