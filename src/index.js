import "./reset.css";
import "./styles.css";

console.log("Script entry point working");

const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const pwd = document.querySelector("#pwd");
const cfmPwd = document.querySelector("#cfm-pwd");

pwd.addEventListener("input", pwdHandler);

cfmPwd.addEventListener("input", () => {
  const validty = isValidCfmPwds();
  setValidityClass(cfmPwd, validty);
});

email.addEventListener("input", email_hander);
email.addEventListener("change", () => {
  if (email.value.length === 0) {
    email.setCustomValidity("Email is required.");

    //Set to invalid for missing value.
    setValidityClass(email, false);
  }

  email.reportValidity();
});

function email_hander() {
  const validity = validateEmail();

  if (!validity && email.value.length !== 0) {
    email.setCustomValidity("Please enter valid email address.");
  } else {
    email.setCustomValidity("");
  }

  setValidityClass(email, validity);
}

function validateEmail() {
  const emailRegExp =
    /^[a-zA-Z0-9!#$%^&*(){}:"|/_+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)*$/;

  return isValidPattern(email, emailRegExp);
}

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

updatePostalCodePlaceholder();

function updatePostalCodePlaceholder() {
  const country = getSelectedCountry();
  postalCode.setAttribute("placeholder", postalCode_patterns[country][1]);

  postalCode.classList.remove("valid");
  postalCode.classList.remove("invalid");
  postalCode.setCustomValidity("");
}

country.addEventListener("change", () => {
  postalCode_handler();
  updatePostalCodePlaceholder();
});

postalCode.addEventListener("input", postalCode_handler);
postalCode.addEventListener("change", () => {
  if (postalCode.value.length === 0) {
    postalCode.setCustomValidity("Postal code is required.");

    //Set to invalid for missing value.
    setValidityClass(postalCode, false);
  }

  postalCode.reportValidity();
});

function postalCode_handler() {
  const isValid = validatePostalCode();

  if (!isValid && postalCode.value.length !== 0) {
    postalCode.setCustomValidity("The postal code format is incorrect");
  } else {
    postalCode.setCustomValidity("");
  }

  setValidityClass(postalCode, isValid);
}

function validatePostalCode() {
  const pattern = postalCode_patterns[getSelectedCountry()][0];

  return isValidPattern(postalCode, pattern);
}

function pwdHandler() {
  const validity = isValidMinLength(this);
  setValidityClass(this, validity);
}

function isValidMinLength(input) {
  const minlength = Number(input.getAttribute("minlength"));

  if (input.value.length < minlength) {
    input.setCustomValidity(`Must contain at least ${minlength} characters`);
    input.reportValidity();
    return false;
  }

  input.setCustomValidity("");
  return true;
}

function isValidCfmPwds() {
  if (cfmPwd.value !== pwd.value) {
    cfmPwd.setCustomValidity("Password doesn't match");
    cfmPwd.reportValidity();
    return false;
  }
  cfmPwd.setCustomValidity("");
  return true;
}

function isValidPattern(input, regex) {
  return regex.test(input.value);
}

function setValidityClass(input, validity) {
  if (validity) {
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
  }
}

function getSelectedCountry() {
  const selectedIndex = country.options.selectedIndex;
  return country[selectedIndex].value;
}
