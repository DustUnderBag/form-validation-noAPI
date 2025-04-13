import { isValidPattern } from "./validation-utils";

const postalCode = document.querySelector("#postal-code");
const country = document.querySelector("#country");

const postalCode_patterns = {
  //ANA NAN
  //Excluded characters: D,F,I,O,Q,U
  //1st character has NO: W, Z
  ca: [
    /^[ABCEGHJKLMNPRSTVXY]\d[[ABCEGHJKLMNPRSTVWXYZ][-\s]\d[ABCEGHJKLMNPRSTVXYZ]\d$/i,
    "M1P 2A1",
  ],

  //NNNNN or NNNNN-NNNN
  us: [/^\d{5}(?:[-\s]\d{4})?$/, "12345 or 12345 1234"],

  //A[A]N[A/N]|AAA NAA
  //2nd section has NO: C, I, K, M, O or V.
  uk: [
    /^([A-Z][A-Z]?\d[A-Z0-9]?|[A-Z]{3})[-\s]\d[ABDEFGHJLNPQRSTUWWYZ][ABDEFGHJLNPQRSTUWWYZ]$/i,
    "L2A 5NP",
  ],

  //NNNNN
  de: [/^\d{5}$/, "12345"],
  fr: [/^\d{5}$/, "12345"],

  //NNN OR NNN-NNNN
  jp: [/^\d{3}(?:[-\s]\d{4})?$/, "123 or 123-1234"],
};

function getSelectedCountry() {
  const selectedIndex = country.options.selectedIndex;
  return country[selectedIndex].value;
}

function validatePostalCode() {
  //Skip if postal code is empty.
  if (postalCode.validity.valueMissing) return;

  const pattern = postalCode_patterns[getSelectedCountry()][0];

  const validity = isValidPattern(postalCode, pattern);

  if (!validity) {
    postalCode.setCustomValidity("The postal code format is incorrect");
    return false;
  } else {
    postalCode.setCustomValidity("");
    return true;
  }
}

function updatePostalCodePlaceholder() {
  const country = getSelectedCountry();
  postalCode.setAttribute(
    "placeholder",
    "e.g. " + postalCode_patterns[country][1],
  );
}

export { validatePostalCode, updatePostalCodePlaceholder };
