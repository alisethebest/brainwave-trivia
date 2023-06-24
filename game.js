const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const prevButton = document.createElement("button");
const submitButton = document.createElement("button");

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

function selectAnswer(index, answerElement) {
  const prevSelected = document.querySelector(".selected");
  if (prevSelected) {
    prevSelected.classList.remove("selected");
  }
  answerElement.classList.add("selected");
  userAnswers[currentQuestion] = index;
}

function submitAnswer() {
  if (userAnswers[currentQuestion] === questions[currentQuestion].correct) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    alert(
      `Congratulations! You finished the trivia. Your score is ${score} out of ${questions.length}.`
    );
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(-1);
     window.location.href = "steps.html";
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

showQuestion();
