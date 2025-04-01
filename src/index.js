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

email.addEventListener("input", () => {
  const emailRegExp =
    /^[a-zA-Z0-9!#$%^&*(){}:"|/_+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)*$/;

  const validity = isValidPattern(email, emailRegExp);
  setValidityClass(email, validity);
});

country.addEventListener("change", postalCode_handler);

postalCode.addEventListener("input", postalCode_handler);
postalCode.addEventListener("change", reportPostalCode);

function postalCode_handler() {
  postalCode.setCustomValidity("");

  const isValid = validatePostalCode();

  setValidityClass(postalCode, isValid);
}

function reportPostalCode() {
  const isValid = validatePostalCode();

  if (!isValid) {
    postalCode.setCustomValidity("The postal code format is incorrect");
  } else {
    postalCode.setCustomValidity("");
  }

  postalCode.reportValidity();
}

function validatePostalCode() {
  const postalCode_patterns = {
    //ANA NAN
    //Excluded characters: D,F,I,O,Q,U
    //1st character has NO: W, Z
    ca: /^[ABCEGHJKLMNPRSTVXY]\d[[ABCEGHJKLMNPRSTVWXYZ][-\s]\d[ABCEGHJKLMNPRSTVXYZ]\d$/i,

    //NNNNN or NNNNN-NNNN
    us: /^\d{5}(?:[-\s]\d{4})?$/,

    //A[A]N[A/N]|AAA NAA
    //2nd section has NO: C, I, K, M, O or V.
    uk: /^([A-Z][A-Z]?\d[A-Z0-9]?|[A-Z]{3})[-\s]\d[ABDEFGHJLNPQRSTUWWYZ][ABDEFGHJLNPQRSTUWWYZ]$/i,

    //NNNNN
    de: /^\d{5}$/,
    fr: /^\d{5}$/,

    //NNN OR NNN-NNNN
    jp: /^\d{3}(?:[-\s]\d{4})?$/,
  };

  const pattern = postalCode_patterns[getSelectedCountry()];

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
