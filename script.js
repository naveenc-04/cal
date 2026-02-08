const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (button.classList.contains("number")) {
      if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
        display.value = currentInput;

    }

    else if (button.classList.contains("operator")) {
  if (!currentInput && !previousInput) return;

  if (previousInput && currentInput) {
    previousInput = calculate(previousInput, currentInput, operator);
    display.value = previousInput;
    currentInput = "";
  } else {
    previousInput = currentInput;
    currentInput = "";
  }

  operator = value;
}


    else if (button.classList.contains("equals")) {
      if (!currentInput || !previousInput) return;
      const result = calculate(previousInput, currentInput, operator);
      display.value = result;
      currentInput = result;
      previousInput = "";
      operator = "";
    }

    else if (button.classList.contains("clear")) {
      currentInput = "";
      previousInput = "";
      operator = "";
      display.value = "";
    }
  });
});

function calculate(a, b, op) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "*") return num1 * num2;
  if (op === "/") return num2 === 0 ? "Error" : num1 / num2;

  return "";
}
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
   if (key === "." && currentInput.includes(".")) return;
   currentInput += key;
   display.value = currentInput;
}


  if (["+", "-", "*", "/"].includes(key)) {
    if (!currentInput) return;
    operator = key;
    previousInput = currentInput;
    currentInput = "";
  }

  if (key === "Enter") {
    if (!currentInput || !previousInput) return;
    const result = calculate(previousInput, currentInput, operator);
    display.value = result;
    currentInput = result === "Error" ? "" : result;
     previousInput = "";
    operator = "";
  }

  if (key === "Escape") {
    currentInput = "";
    previousInput = "";
    operator = "";
    display.value = "";
  }
});
