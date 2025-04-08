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

function isValidMinLength(input) {
  const minlength = Number(input.getAttribute("minlength"));
  return input.value.length >= minlength;
}

export { isValidPattern, setValidityClass, isValidMinLength };
