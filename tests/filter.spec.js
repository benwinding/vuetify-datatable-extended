import FilterArraysHandler from "../src/helpers/filter";

const item = {
  name: "Okay",
  category: "A",
};

describe("test filter", () => {
  test("test no filters registered", () => {
    const f = new FilterArraysHandler();
    expect(f.runFilter(item)).toBe(true);
  });

  test("test no filter values", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("name", { caseSensitive: true });
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
    f.updateFilterValue("category", ["A"]);
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
    f.updateFilterValue("category", ["B"]);
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter category multiple filters selected", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", (name, filterValue, item) => {
      if (filterValue.some((v) => item[name].includes(v))) {
        return true;
      }
      return false;
    });
    f.updateFilterValue("category", ["B"]);
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter category multiple filters", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", (name, filterValue, item) => {
      if (filterValue.some((v) => item[name].includes(v))) {
        return true;
      }
      return false;
    });
    f.updateFilterValue("category", ["B"], true);

    f.registerFilter("name", (name, filterValue, item) => {
      if (filterValue.some((v) => item[name].includes(v))) {
        return true;
      }
      return false;
    });
    expect(f.runFilter(item)).toBe(false);
  });
});
