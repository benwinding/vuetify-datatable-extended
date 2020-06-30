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

const itemMany = {
  name: "Okay",
  category: "A",
  numb: 200,
  bool: true,
  tags: ['one', 'two', 'three'],
};

describe('test many', () => {
  test("item tags", () => {
    const matches = doesItemMatch(itemMany, "tags", {
      value: ['two'],
      options: {
        isManyFilter: true
      },
    });
    expect(matches).toBe(true);
  });

  test("item tags should fail", () => {
    const matches = doesItemMatch(itemMany, "tags", {
      value: ['3333'],
      options: {
        isManyFilter: true
      },
    });
    expect(matches).toBe(false);
  });

  test("item tags should fail", () => {
    const matches = doesItemMatch(itemMany, "tags", {
      value: ['3333', 'one'],
      options: {
        isManyFilter: true
      },
    });
    expect(matches).toBe(true);
  });
})