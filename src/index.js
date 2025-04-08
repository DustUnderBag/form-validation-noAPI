import "./reset.css";
import "./styles.css";

import {
  validatePostalCode,
  updatePostalCodePlaceholder,
} from "./postalCode-validator";
import {
  isValidPattern,
  setValidityClass,
  isValidMinLength,
} from "./validation-utils";

console.log("Script entry point working");

const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const pwd = document.querySelector("#pwd");
const cfmPwd = document.querySelector("#cfm-pwd");

updatePostalCodePlaceholder();

pwd.addEventListener("input", pwd_handler);
pwd.addEventListener("change", () => {
  if (pwd.validity.valueMissing) {
    pwd.setCustomValidity("Password is required");

    //Set to invalid for missing value.
    setValidityClass(pwd, false);
  }

  pwd.reportValidity();
});

cfmPwd.addEventListener("input", cfmPwd_handler);
cfmPwd.addEventListener("change", () => {
  if (cfmPwd.validity.valueMissing) {
    cfmPwd.setCustomValidity("Confirm Password is required");

    //Set to invalid for missing value.
    setValidityClass(cfmPwd, false);
  }

  cfmPwd.reportValidity();
});

function pwd_handler() {
  const validity = validatePwd();

  if (!validity) {
    const minlength = Number(pwd.getAttribute("minlength"));
    pwd.setCustomValidity(`Must contain at least ${minlength} characters`);
  } else {
    pwd.setCustomValidity("");
  }

  setValidityClass(pwd, validity);

  //Validate confirm password at the same time.
  if (!cfmPwd.validity.valueMissing) cfmPwd_handler();
}

function validatePwd() {
  const pattern = /^[0-9a-zA-Z]{8,}$/;
  const validPattern = isValidPattern(pwd, pattern);

  return validPattern;
}

function isValidCfmPwds() {
  return cfmPwd.value === pwd.value;
}

function cfmPwd_handler() {
  const validty = isValidCfmPwds();

  if (!validty && cfmPwd.value.length !== 0) {
    cfmPwd.setCustomValidity("Passwords do NOT match");
  } else {
    cfmPwd.setCustomValidity("");
  }

  setValidityClass(cfmPwd, validty);
}

email.addEventListener("input", email_handler);
email.addEventListener("change", () => {
  if (email.value.length === 0) {
    email.setCustomValidity("Email is required.");

    //Set to invalid for missing value.
    setValidityClass(email, false);
  }

  email.reportValidity();
});

function email_handler() {
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

country.addEventListener("change", () => {
  updatePostalCodePlaceholder();

  //Validate only when the postal code isn't empty
  if (postalCode.value.length !== 0) postalCode_handler();
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

/*
form.addEventListener("submit", e => {
  e.preventDefault();

  const inputs = document.querySelectorAll("input");
  for(const input of inputs) {
    if(input.value.length === 0) {
      input.setCustomValidity("This field is required");
      input.reportValidity();
      return;
    } else {
      input.setCustomValidity("");
    }
  }

  email_handler();
  postalCode_handler();
  pwd_handler();
  cfmPwd_handler();
});

*/
