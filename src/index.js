import "./reset.css";
import "./styles.css";

console.log("Script entry point working");

const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const pwd = document.querySelector("#pwd");
const cfmPwd = document.querySelector("#cfm-pwd");

pwd.addEventListener("input", (e) => {
  if (checkMinLength(e));
});

cfmPwd.addEventListener("input", (e) => {
  matchPwds();
});

function checkMinLength(e) {
  const self = e.target;
  const minlength = Number(self.getAttribute("minlength"));

  if (self.value.length < minlength) {
    self.setCustomValidity(`Must contain at least ${minlength} characters`);
    self.reportValidity();
    return false;
  }

  self.setCustomValidity("");
  return true;
}

function matchPwds() {
  if (cfmPwd.value !== pwd.value) {
    cfmPwd.setCustomValidity("Password doesn't match");
    cfmPwd.reportValidity();
    return false;
  }
  cfmPwd.setCustomValidity("");
  return true;
}
