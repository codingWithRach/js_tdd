// The Kata says you should write a function to convert from normal numbers to Roman Numerals: eg

//      1 --> I
//      10 --> X
//      7 --> VII

const romans = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
};

export function convertToRoman(num) {
  if (!Number.isInteger(num)) return "";
  const arabics = Object.keys(romans).sort((a, b) => b - a);
  let result = "";
  arabics.forEach((arabic) => {
    while (num >= arabic) {
      num -= arabic;
      result += romans[arabic];
    }
  });
  return result;
}

export function convertToArabic(roman) {
  if (!/^[IVXLCDM]*$/.test(roman)) return 0;
  const romanChars = Object.keys(romans)
    .sort((a, b) => b - a)
    .map((arabic) => romans[arabic]);
  let result = 0;
  romanChars.forEach((entry) => {
    while (roman.substring(0, entry.length) === entry) {
      result += parseInt(
        Object.keys(romans).find((key) => romans[key] === entry)
      );
      roman = roman.substring(entry.length);
    }
  });
  return result;
}
