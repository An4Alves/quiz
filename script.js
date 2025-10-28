const questions = [
  {
    question: "Segundo Rousseau, qual deve ser o papel principal do educador na educação infantil?",
    answers: [
      { id: 1, text: "Ensinar diretamente os conhecimentos e regras da sociedade", correct: false },
      { id: 2, text: "Corrigir os erros da criança com castigos e lições", correct: false },
      { id: 3, text: "Proteger a criança dos vícios sociais e permitir que aprenda pela experiênciante", correct: true },
      { id: 4, text: "Impor normas e valores morais desde cedo", correct: false },
    ],
  },
  {
    question: "Para Rousseau, por que é importante respeitar a natureza da criança durante o aprendizado?",
    answers: [
      { id: 1, text: "Porque a criança deve se adaptar rapidamente às convenções sociaisalahari", correct: false },
      { id: 2, text: "Porque a infância tem formas próprias de ver, pensar e sentir ", correct: true },
      { id: 3, text: "Porque o educador precisa manter o controle total sobre o aluno", correct: false },
      { id: 4, text: "Porque o objetivo é torná-la dependente dos adultos e da sociedade", correct: false },
    ],
  },
  {
    question: "Qual é a principal obra de Jean-Jacques Rousseau?",
    answers: [
      { id: 1, text: "O Contrato Social", correct: true },
      { id: 2, text: "O Príncipe", correct: false },
      { id: 3, text: "Emílio, ou Da Educação", correct: false },
      { id: 4, text: "O Leviatã", correct: false },
    ],
  },
  {
    question: "O que seria a tábula rasa?",
    answers: [
      { id: 1, text: "A noção de que o ser humano nasce como uma “folha em branco”, adquirindo conhecimento por meio da experiência", correct: true },
      { id: 2, text: "A ideia de que o ser humano já nasce com todo o conhecimento", correct: false },
      { id: 3, text: "Um conceito que defende que o aprendizado ocorre apenas pela herança genética", correct: false },
      { id: 4, text: "A teoria de que a sociedade molda o indivíduo de forma imutável desde o nascimento", correct: false },
    ],
  },
  {
    question: "O que seria a liberdade, a autonomia e a igualdade segundo Rousseau?",
    answers: [
      { id: 1, text: "A liberdade é agir conforme a vontade dos outros, a autonomia é obedecer regras impostas e a igualdade é ter as mesmas riquezas.", correct: false },
      { id: 2, text: "A liberdade, a autonomia e a igualdade representam o estado natural do homem: a liberdade de pensar e agir por si mesmo e a igualdade como base para uma convivência justa.", correct: true },
      { id: 3, text: "A liberdade é seguir leis impostas, a autonomia é ausência de pensamento próprio e a igualdade é apenas um ideal impossível.", correct: false },
      { id: 4, text: "A liberdade é individual, a autonomia é coletiva e a igualdade depende do poder político.", correct: false },
    ],
  },
  {
    question: "Por que, segundo Rousseau, a criança deveria ser “isolada” do convívio social?",
    answers: [
      { id: 1, text: "Porque o convívio social poderia corromper sua pureza natural e influenciar negativamente seu desenvolvimento", correct: true },
      { id: 2, text: "Porque Rousseau acreditava que a criança aprendia melhor observando o comportamento dos adultos", correct: false },
      { id: 3, text: "Porque o isolamento serviria apenas para desenvolver sua fé religiosa desde cedo", correct: false },
      { id: 4, text: "Porque Rousseau defendia que a criança devia aprender primeiro as regras da sociedade para depois aplicá-las", correct: false },
    ],
  },
    {
    question: "Segundo Santo Agostinho, qual é o papel da fé na busca pela verdade?",
    answers: [
      { id: 1, text: "A fé impede o ser humano de compreender a verdade eterna", correct: false },
      { id: 2, text: "A fé deve ser substituída pela razão para alcançar o verdadeiro conhecimento", correct: false },
      { id: 3, text: "A fé é o ponto de partida que orienta a razão na compreensão do mundo e de si mesmo", correct: true },
      { id: 4, text: "A fé é inferior à razão, pois se baseia apenas em crenças e não em provas", correct: false },
    ],
  },
  {
    question: "De acordo com o texto, onde se encontra a verdadeira fonte da verdade para Santo Agostinho?",
    answers: [
      { id: 1, text: "Nos sentidos humanos, que revelam o mundo material", correct: false },
      { id: 2, text: "Nas ideias criadas pela mente humana", correct: false },
      { id: 3, text: "Na razão isolada da experiência interior", correct: false },
      { id: 4, text: "Em Deus, que ilumina e orienta o conhecimento humano", correct: true },
    ],
  },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    button.dataset.id = answer.id;

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();