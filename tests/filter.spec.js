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
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", ["A"]);
    expect(f.runFilter(item)).toBe(true);
  });

  test("test filter category is present", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", ["B"]);
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter category multiple filters selected", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", ["B"]);
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter category multiple filters", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", ["B"]);

    f.registerFilter("name", { caseSensitive: true });
    expect(f.runFilter(item)).toBe(false);
  });

  test("test filter sets active filters empty array", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", []);
    expect(f.activeFilters.category).toBe(false);
  });

  test("test filter sets active filters empty array with null", () => {
    const f = new FilterArraysHandler();
    f.registerFilter("category", { caseSensitive: true });
    f.updateFilterValue("category", [null]);
    expect(f.activeFilters.category).toBe(false);
  });
});
