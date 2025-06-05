const welcomeEl = document.getElementById('welcome');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');

const quizEl = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let userName = "";
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

quizEl.style.display = 'none';  // hide quiz initially

// Enable Start button only if name entered
nameInput.addEventListener('input', () => {
  startBtn.disabled = nameInput.value.trim() === "";
});

// When start clicked, hide welcome and show quiz
startBtn.addEventListener('click', () => {
  userName = nameInput.value.trim();
  if (userName) {
    welcomeEl.style.display = 'none';
    quizEl.style.display = 'block';
    loadQuestion();
  }
});

const quizData = [
  {
    question: "Let's start easy shall we? What's my favorite color?",
    options: ["Blue", "Pink", "Black", "Purple"],
    answer: "Black"
  },
  {
    question: "Which series do I rewatch the most?",
    options: ["Game of Thrones","Supernatural", "Sherlock BBC", "Doctor Who"],
    answer: "Sherlock BBC"
  },
  {
    question: "My go-to comfort fruit?",
    options: ["Mango", "Watermelon", "Pineapple", "grapes"],
    answer: "Watermelon"
  },
  {
    question: "What's my dream sport?",
    options: ["Badminton", "Horse Racing", "Archery", "Gymnastics"],
    answer: "Archery"
  },
  {
    question: "Which hobby do I enjoy most?",
    options: ["Painting", "Dancing", "Reading", "Gaming"],
    answer: "Reading"
  }
];

function loadQuestion() {
  resetState();
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectOption(button));
    optionsEl.appendChild(button);
  });
}

function resetState() {
  selectedOption = null;
  nextBtn.disabled = true;
  while (optionsEl.firstChild) {
    optionsEl.removeChild(optionsEl.firstChild);
  }
}

function selectOption(button) {
  if (selectedOption) {
    selectedOption.classList.remove('selected');
  }
  selectedOption = button;
  selectedOption.classList.add('selected');
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedOption.textContent === currentQuestion.answer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  score = 0;
  currentQuestionIndex = 0;
  resultEl.classList.add('hide');
  quizEl.classList.remove('hide');
  loadQuestion();
});

function showResult() {
  quizEl.style.display = 'none';       // Hide quiz container
  resultEl.style.display = 'block';    // Show result container

  scoreEl.textContent = `${userName}, you scored ${score} out of ${quizData.length}`;

  let msg = "";
  if (score === quizData.length) {
    msg = "Wow! You know me perfectly! 💖";
  } else if (score >= quizData.length / 2) {
    msg = "Not bad! We’re getting there! 😊";
  } else {
    msg = "Hmm... we should hang out more! 😜";
  }
  scoreEl.textContent += ` ${msg}`;
}
