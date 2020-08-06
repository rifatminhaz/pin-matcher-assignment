const generateButton = document.querySelector(".generate-btn");
const randomNumberInput = document.querySelector(".random-number-input");
const submittedPinInput = document.querySelector(".submitted-pin-input");
const buttons = document.querySelectorAll("div.button");
const submitButton = document.querySelector(".submit-btn");
const rightNotification = document.querySelector(".notify-right");
const wrongNotification = document.querySelector(".notify-wrong");
const overNotification = document.querySelector(".notify-over");
const triesSpan = document.querySelector(".tries");

let submittedPin = "";
let wins = 0;

resetTries();

updateNotify();

generateButton.addEventListener("click", generatePin);

buttons.forEach((button) => {
  button.addEventListener("click", addPin);
});

submitButton.addEventListener("click", checkAnswer);

function updateNotify(right = false, wrong = false, over = false) {
  if (right) {
    rightNotification.style.display = "";
  } else {
    rightNotification.style.display = "none";
  }

  if (wrong) {
    wrongNotification.style.display = "";
  } else {
    wrongNotification.style.display = "none";
  }

  if (over) {
    overNotification.style.display = "";
    wrongNotification.style.display = "none";
    rightNotification.style.display = "none";
  } else {
    overNotification.style.display = "none";
  }
}

function addPin() {
  const pressedButton = this.innerText;
  let currentVal = String(submittedPinInput.value);

  if (pressedButton === "C") {
    submittedPinInput.value = "";
  } else if (pressedButton === "<") {
    submittedPinInput.value = Number(currentVal.slice(0, -1));
  } else {
    currentVal += pressedButton;
    submittedPinInput.value = Number(currentVal);
  }
}

function resetTries() {
  tries = 3;
  triesSpan.innerText = tries;
}

function generatePin() {
  const randomNumber = Math.floor(Math.random() * 10000 + 1);
  randomNumberInput.value = randomNumber;

  submittedPinInput.value = "";

  updateNotify(false, false);

  resetTries();
}

function checkAnswer() {
  const pin = randomNumberInput.value;
  const answer = submittedPinInput.value;

  if (tries !== 0) {
    tries--;
    triesSpan.innerText = tries;
  }

  if (wins === 0 && tries === 0) {
    updateNotify(false, false, true);
    return;
  }

  if (!answer || (!pin && !answer) || pin !== answer) {
    updateNotify(false, true);
    return;
  }

  updateNotify(true, false);
}
