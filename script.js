const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
  "Don't watch the clock; do what it does. Keep going and never give up on your goals.",
  "Believe in yourself and all that you are. Know that there's something inside you greater than any obstacle.",
  "Typing is a skill developed with patience, practice, and constant persistence. Keep practicing daily.",
  "Opportunities don't just happen. You have to create them with hard work and dedication."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const inputArea = document.getElementById("inputArea");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");

let startTime, timerInterval, quote = "";

startBtn.addEventListener("click", () => {
  inputArea.disabled = false;
  submitBtn.disabled = false;
  inputArea.value = "";
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = "";
  timeDisplay.innerText = 0;
  wpmDisplay.innerText = 0;
  accuracyDisplay.innerText = 0;

  // Display quote letter by letter in spans
  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });

  inputArea.focus();
  clearInterval(timerInterval);
  startTime = new Date();
  timerInterval = setInterval(updateTime, 1000);
});

inputArea.addEventListener("input", () => {
  const arrayQuote = quote.split("");
  const arrayInput = inputArea.value.split("");

  let correctCount = 0;

  quoteDisplay.querySelectorAll("span").forEach((span, index) => {
    const char = arrayInput[index];

    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === arrayQuote[index]) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctCount++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });
});

submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  const inputText = inputArea.value.trim();
  const totalTime = Math.floor((new Date() - startTime) / 1000) || 1;

  const wordsTyped = inputText.split(/\s+/).length;
  const wpm = Math.round((wordsTyped / totalTime) * 60);

  const quoteChars = quote.split("");
  const inputChars = inputText.split("");
  let correctChars = 0;

  for (let i = 0; i < inputChars.length; i++) {
    if (inputChars[i] === quoteChars[i]) { 
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / quote.length) * 100);

  wpmDisplay.innerText = wpm;
  accuracyDisplay.innerText = accuracy;
  inputArea.disabled = true;
  submitBtn.disabled = true;
});

function updateTime() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  timeDisplay.innerText = elapsed;
}
