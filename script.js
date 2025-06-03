const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      const choiceId = `question-${i}-choice-${j}`;

      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.id = choiceId;

      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      choiceLabel.setAttribute("for", choiceId);
      choiceLabel.style.marginRight = "10px";

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
    }

    questionsElement.appendChild(questionElement);
  }
}

const storedScore = localStorage.getItem("score");
if (storedScore) {
  scoreElement.textContent = `Your previous score is ${storedScore} out of ${questions.length}.`;
} else {
  renderQuestions();
}

submitButton.addEventListener("click", () => {
  if (userAnswers.includes(null)) {
    alert("Please answer all questions before submitting.");
    return;
  }

  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});