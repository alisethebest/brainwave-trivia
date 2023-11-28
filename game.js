const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const prevButton = document.createElement("button");
const submitButton = document.createElement("button");
const timerElement = document.createElement("div"); // Timer element
const summaryElement = document.createElement("div"); // Summary element

const questions = [
  {
    question: "What is the capital of California?",
    answers: ["Los Angeles", "San Francisco", "Sacramento", "San Diego"],
    correct: 2,
  },
  {
    question: "What is the capital of Florida?",
    answers: ["Miami", "Tampa", "Orlando", "Tallahassee"],
    correct: 3,
  },

  {
    question: "What is the capital of New York?",
    answers: ["New York City", "Albany", "Buffalo", "Rochester"],
    correct: 1,
  },

  {
    question: "What is the capital of Texas?",
    answers: ["Dallas", "Houston", "Austin", "San Antonio"],
    correct: 2,
  },

  {
    question: "What is the capital of Washington?",
    answers: ["Seattle", "Tacoma", "Spokane", "Olympia"],
    correct: 3,
  },

  {
    question: "What is the capital of Oregon?",
    answers: ["Portland", "Eugene", "Salem", "Bend"],
    correct: 2,
  },

  {
    question: "What is the capital of Nevada?",
    answers: ["Las Vegas", "Reno", "Carson City", "Henderson"],
    correct: 2,
  },
  {
    question: "What is the capital of Arizona?",
    answers: ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
    correct: 0,
  },

  {
    question: "What is the capital of Colorado?",
    answers: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
    correct: 0,
  },

  {
    question: "What is the capital of Utah?",
    answers: ["Salt Lake City", "West Valley City", "Provo", "West Jordan"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = Array(questions.length).fill(-1);
let timer; // Timer variable
let timeLimit = 10; // Time limit for each question in seconds
let points = 0; // Points earned for each question

function showQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const answerElement = document.createElement("label");
    answerElement.textContent = answer;
    answerElement.className = "answer";
    if (userAnswers[currentQuestion] === index) {
      answerElement.classList.add("selected");
    }
    answerElement.addEventListener("click", () =>
      selectAnswer(index, answerElement)
    );
    answersElement.appendChild(answerElement);
  });

  submitButton.textContent = "Submit";
  submitButton.className = "submit-button";
  submitButton.addEventListener("click", submitAnswer);
  answersElement.appendChild(submitButton);

  if (currentQuestion > 0 && !prevButton.isConnected) {
    prevButton.textContent = "Previous";
    prevButton.className = "prev-button";
    prevButton.addEventListener("click", prevQuestion);
    answersElement.appendChild(prevButton);
  }
}

function startTimer() {
  let timeRemaining = timeLimit;
  timerElement.textContent = formatTime(timeRemaining);

  timer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining >= 0) {
      timerElement.textContent = formatTime(timeRemaining);
    } else {
      clearInterval(timer);
      timerElement.textContent = "Time's Up!";
      submitAnswer();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function selectAnswer(index, answerElement) {
  const prevSelected = document.querySelector(".selected");
  if (prevSelected) {
    prevSelected.classList.remove("selected");
  }
  answerElement.classList.add("selected");
  userAnswers[currentQuestion] = index;
}

function submitAnswer() {
  clearInterval(timer); // Stop the timer

  const question = questions[currentQuestion];
  const answerIndex = userAnswers[currentQuestion];
  const timeTaken =
    timeLimit - parseInt(timerElement.textContent.split(":")[1]);

  if (answerIndex === question.correct) {
    if (timeTaken <= 5) {
      points += 3;
    } else {
      points += 5;
    }
  }

  if (currentQuestion === questions.length - 1) {
    showSummary();
  } else {
    currentQuestion++;
    showQuestion();
    startTimer();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showSummary() {
  questionElement.style.display = "none";
  answersElement.style.display = "none";
  timerElement.style.display = "none";
  nextButton.style.display = "none";
  prevButton.style.display = "none";
  submitButton.style.display = "none";

  const missedQuestions = [];
  questions.forEach((question, index) => {
    if (userAnswers[index] !== question.correct) {
      missedQuestions.push(index + 1);
    }
  });

  summaryElement.textContent = `Score: ${points} out of ${questions.length}`;

  if (missedQuestions.length > 0) {
    let missedQuestionsHTML = "";
    missedQuestions.forEach((questionIndex) => {
      missedQuestionsHTML += `<li>${questionIndex}</li>`;
    });
    summaryElement.innerHTML += `<br>Missed questions: <ul>${missedQuestionsHTML}</ul>`;
  }

  summaryElement.className = "summary";
  document.body.appendChild(summaryElement);
}

// Append the timer element to the container
const container = document.querySelector(".container");
timerElement.className = "timer";
container.appendChild(timerElement);

showQuestion();
startTimer();
