var questionEl = document.getElementById("question");
var answerOne = document.getElementById("answerOne");
var answerTwo = document.getElementById("answerTwo");
var answerThree = document.getElementById("answerThree");
var answerFour = document.getElementById("answerFour");

(function () {
  document
    .getElementById("submitButton")
    .addEventListener("click", loadNextQuestion);

  localStorage.removeItem("CurrentQuestion");
  localStorage.removeItem("Score");
  showQuestion(1);
})();

function showQuestion(id) {
  var selectedQuestion = allQuestions.find((x) => x.id == id);

  resetActive();

  questionEl.innerHTML = selectedQuestion.question;

  answerOne.textContent = selectedQuestion.option1;
  answerTwo.innerHTML = selectedQuestion.option2;
  answerThree.innerHTML = selectedQuestion.option3;
  answerFour.innerHTML = selectedQuestion.option4;

  localStorage.setItem("CurrentQuestion", id);
}

function loadNextQuestion() {
  var currentQuestionId = parseInt(localStorage.getItem("CurrentQuestion"));
  var score;

  var SelectOption = document.querySelector("input[type=radio]:checked");
  if (!SelectOption) {
    alert("Please select your answer.");
    return;
  }

  if (localStorage.getItem("Score") === null) {
    score = 0;
    localStorage.setItem("Score", score);
  } else {
    score = parseInt(localStorage.getItem("Score"));
  }

  var answer = SelectOption.value;
  var selectedQuestion = allQuestions.find((x) => x.id == currentQuestionId);

  if (selectedQuestion.answer == answer) {
    localStorage.setItem("Score", (score += 1));
  }

  if (currentQuestionId + 1 == allQuestions.length) {
    submitButton.textContent = "Finish";
  }

  if (currentQuestionId == allQuestions.length) {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result").textContent =
      "Your score is " + score + "/5";
    return;
  }

  showQuestion(currentQuestionId + 1);
  SelectOption.checked = false;
}

function setActive(option) {
  resetActive();

  var element = document.getElementById(option.id);
  element.classList.add("active");
}

function resetActive() {
  var options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.classList.remove("active");
  });
}
