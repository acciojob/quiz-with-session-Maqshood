let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing questions

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Add event listener to store progress in session storage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      choiceLabel.style.marginRight = "10px";

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Check if the score is already stored in local storage
const storedScore = localStorage.getItem("score");
if (storedScore) {
  scoreElement.textContent = `Your previous score is ${storedScore} out of 5.`;
} else {
  renderQuestions(); // Render questions if no previous score
}

// Submit button logic
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score to local storage
  localStorage.setItem("score", score);
});