import "./reset.css";
import "./styles.css";

import {
  validatePostalCode,
  updatePostalCodePlaceholder,
} from "./postalCode-validator";

import { isValidPattern, setValidityClass } from "./validation-utils";

console.log("Script entry point working");

const form = document.querySelector("form");
const submitBtn = document.querySelector("button#submit");

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
  //Validate confirm password at the same time.
  if (cfmPwd.value.length !== 0) cfmPwd_handler();

  if (pwd.value.length < 8) {
    const minlength = Number(pwd.getAttribute("minlength"));
    pwd.setCustomValidity(`Must enter at least ${minlength} characters`);
    setValidityClass(pwd, false);
    return;
  }

  if (!hasRequiredCharacters()) {
    pwd.setCustomValidity(
      "Must contain lowercase and uppercase letters, numbers, and symbols",
    );
    setValidityClass(pwd, false);
    return;
  }

  pwd.setCustomValidity("");
  setValidityClass(pwd, true);
  return;
}

function hasRequiredCharacters() {
  //To test if password contains these required character classes.

  //Lowercase & uppercase english letters,
  if (!/[a-z]/.test(pwd.value)) return false;
  if (!/[A-Z]/.test(pwd.value)) return false;

  //Numbers
  if (!/[0-9]/.test(pwd.value)) return false;

  //Special characters
  if (!/[!@#$%^&&*()_=-]/.test(pwd.value)) return false;

  return true;
}

function isValidCfmPwds() {
  if (cfmPwd.validity.valueMissing) return false;

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
  setValidityClass(email, validity);
}

function validateEmail() {
  //Don't validate if it is empty.
  if (email.validity.valueMissing) return;

  const emailRegExp =
    /^[a-zA-Z0-9!#$%^&*(){}:"|/_+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)*$/;

  const validity = isValidPattern(email, emailRegExp);

  if (!validity) {
    email.setCustomValidity("Please enter valid email address.");
    return false;
  } else {
    email.setCustomValidity("");
    return true;
  }
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
  const validity = validatePostalCode();
  setValidityClass(postalCode, validity);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("input");

  let firstInvalidInput = undefined;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].validity.valueMissing) {
      //Remember the first invalid input's index number.
      if (firstInvalidInput === undefined) firstInvalidInput = inputs[i];

      inputs[i].setCustomValidity("This field is required");
      setValidityClass(inputs[i], false);
      inputs[i].reportValidity();
    } else {
      inputs[i].setCustomValidity("");
    }
  }
  //Report validity if first invalid input is captured.
  if (firstInvalidInput) {
    firstInvalidInput.reportValidity();
    return;
  }

  email_handler();
  email.reportValidity();

  postalCode_handler();
  postalCode.reportValidity();

  pwd_handler();
  pwd.reportValidity();

  cfmPwd_handler();
  cfmPwd.reportValidity();
});
