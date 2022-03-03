const { convertToRoman, convertToArabic } = require("./roman_numerals.js");

describe("convertToRoman function", () => {
  test.each([
    [1, "I"],
    [10, "X"],
    [7, "VII"],
    [1972, "MCMLXXII"],
    [-1, ""],
    [9.23, ""],
    ["hello", ""],
  ])(`should convert %p to %p`, (arabic, roman) => {
    expect(convertToRoman(arabic)).toEqual(roman);
  });
});

describe("convertToArabic function", () => {
  test.each([
    ["I", 1],
    ["X", 10],
    ["VII", 7],
    ["MCMLXXII", 1972],
    ["", 0],
    ["hello", 0],
    ["MCM99", 0],
    [42, 0],
  ])(`should convert %p to %p`, (roman, arabic) => {
    expect(convertToArabic(roman)).toEqual(arabic);
  });
});
