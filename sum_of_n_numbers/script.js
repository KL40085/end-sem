const numbersInput = document.getElementById("numbers");
const sumOutput = document.getElementById("sum");
const countOutput = document.getElementById("count");
const errorOutput = document.getElementById("error");

function calculateSum() {
  const raw = numbersInput.value.trim();
  errorOutput.textContent = "";

  if (!raw) {
    sumOutput.textContent = "0";
    countOutput.textContent = "0 numbers entered";
    errorOutput.textContent = "Please enter at least one number.";
    return;
  }

  // Accept commas, spaces, semicolons, and line breaks as separators.
  const tokens = raw.split(/[\s,;]+/).filter(Boolean);
  const values = tokens.map(Number);

  if (values.some(value => !Number.isFinite(value))) {
    errorOutput.textContent = "Please enter valid numbers only.";
    return;
  }

  const total = values.reduce((accumulator, value) => accumulator + value, 0);
  sumOutput.textContent = Number.isInteger(total)
    ? total.toLocaleString()
    : total.toLocaleString(undefined, { maximumFractionDigits: 10 });
  countOutput.textContent = `${values.length} ${values.length === 1 ? "number" : "numbers"} entered`;
}

document.getElementById("calculate").addEventListener("click", calculateSum);
document.getElementById("clear").addEventListener("click", () => {
  numbersInput.value = "";
  sumOutput.textContent = "0";
  countOutput.textContent = "0 numbers entered";
  errorOutput.textContent = "";
  numbersInput.focus();
});
document.getElementById("sample").addEventListener("click", () => {
  numbersInput.value = "10, 20, 30, 40, 50";
  calculateSum();
});
numbersInput.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") calculateSum();
});
