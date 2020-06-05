import { doesItemMatch } from "../src/helpers/doesMatch";

const item = {
  name: "Okay",
  category: "A",
  numb: 200,
  bool: true,
};

describe("test doesMatch", () => {
  test("item", () => {
    const matches = doesItemMatch(item, "name", {
      value: "okay",
    });
    expect(matches).toBe(true);
  });

  test("item case-sensitive", () => {
    const matches = doesItemMatch(item, "name", {
      value: "okay",
      options: {
        caseSensitive: true,
      },
    });
    expect(matches).toBe(false);
  });

  test("item arrays", () => {
    const matches = doesItemMatch(item, "name", {
      value: ["Showkay", "Dowkay", "Okay"],
    });
    expect(matches).toBe(true);
  });

  test("item number array", () => {
    const matches = doesItemMatch(item, "numb", {
      value: [200],
      options: {},
    });
    expect(matches).toBe(true);
  });

  test("item boolean checkbox", () => {
    const matches = doesItemMatch(item, "bool", {
      value: [true],
      options: {
        isCheckbox: true
      },
    });
    expect(matches).toBe(true);
  });
});
