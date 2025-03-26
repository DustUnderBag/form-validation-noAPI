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
