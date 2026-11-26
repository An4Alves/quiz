
const questions = [
  {
    question: "Qual é o papel da inteligência artificial na educação?",
    answers: [
      { id: 1, text: "Substituir completamente os professores.", correct: false },
      { id: 2, text: "Servir como ferramenta de apoio ao ensino e à aprendizagem.", correct: true },
      { id: 3, text: "Realizar todas as atividades dos estudantes.", correct: false },
      { id: 4, text: "Eliminar a necessidade de estudar.", correct: false },
    ],
    explanation: "A IA pode auxiliar alunos e professores, mas não deve substituir o pensamento humano e a participação nas atividades educativas."
  },
  {
    question: "Qual situação representa o uso consciente da inteligência artificial?",
    answers: [
      { id: 1, text: "Copiar respostas sem compreender o conteúdo.", correct: false },
      { id: 2, text: "Entregar trabalhos produzidos pela IA sem realizar a leitura.", correct: false },
      { id: 3, text: "Aceitar todas as informações fornecidas pela IA como verdadeiras.", correct: false },
      { id: 4, text: "Utilizar a IA para esclarecer dúvidas e analisar criticamente suas respostas.", correct: true },
    ],
    explanation: "O uso consciente da IA envolve questionar informações, esclarecer dúvidas e desenvolver o próprio conhecimento."
  },
  {
    question: "De acordo com Moita Neto (2023), por que devemos questionar as respostas da inteligência artificial?",
    answers: [
      { id: 1, text: "Porque a IA funciona a partir de informações e padrões presentes nos dados de treinamento, podendo apresentar respostas inadequadas.", correct: true },
      { id: 2, text: "Porque a IA possui consciência humana.", correct: false },
      { id: 3, text: "Porque todas as respostas da IA são falsas.", correct: false },
      { id: 4, text: "Porque a IA não consegue produzir nenhum conteúdo educativo.", correct: false },
    ],
    explanation: "As respostas da inteligência artificial precisam ser analisadas e questionadas, pois nem sempre apresentam informações adequadas."
  },
  {
    question: "Como o professor pode utilizar a inteligência artificial sem comprometer sua autonomia?",
    answers: [
      { id: 1, text: "Deixando que a IA tome todas as decisões pedagógicas.", correct: false },
      { id: 2, text: "Utilizando atividades produzidas pela IA sem nenhuma revisão.", correct: false },
      { id: 3, text: "Utilizando a IA como apoio ao planejamento, revisando e adaptando as atividades.", correct: true },
      { id: 4, text: "Substituindo sua participação nas práticas educativas.", correct: false },
    ],
    explanation: "O professor continua sendo fundamental no planejamento, na adaptação das atividades e na orientação dos estudantes."
  },
  {
    question: "Utilizar a inteligência artificial é o mesmo que aprender?",
    answers: [
      { id: 1, text: "Sim, porque receber uma resposta pronta significa construir conhecimento.", correct: false },
      { id: 2, text: "Não necessariamente, pois aprender envolve interpretar, questionar e construir ideias próprias.", correct: true },
      { id: 3, text: "Sim, porque a IA pode pensar pelo estudante.", correct: false },
      { id: 4, text: "Não, porque a tecnologia nunca pode contribuir para a aprendizagem.", correct: false },
    ],
    explanation: "Aprender não significa apenas receber informações. É necessário desenvolver o pensamento crítico, a interpretação e a autonomia."
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const progressInfo = document.getElementById("progress-info");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima pergunta";
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;

  questionElement.textContent =
    questionNo + ". " + currentQuestion.question;

  progressInfo.textContent =
    "Pergunta " + questionNo + " de " + questions.length;

  progressBar.style.width =
    (questionNo / questions.length) * 100 + "%";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent =
      String.fromCharCode(65 + index) + ") " + answer.text;

    button.classList.add("btn");
    button.dataset.id = answer.id;
    button.dataset.correct = answer.correct;

    answerButtons.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedback.textContent = "";
  feedback.className = "";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.currentTarget;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    feedback.textContent = "Resposta correta! ";
    feedback.classList.add("feedback-correct");
  } else {
    selectedBtn.classList.add("incorrect");
    feedback.textContent = "Vamos refletir! ";
    feedback.classList.add("feedback-incorrect");
  }

  feedback.textContent +=
    questions[currentQuestionIndex].explanation;

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "Ver resultado"
      : "Próxima pergunta";

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  progressBar.style.width = "100%";
  progressInfo.textContent = "Desafio concluído!";

  questionElement.textContent =
    `Você acertou ${score} de ${questions.length} perguntas!`;

  feedback.classList.add("final-message");

  if (score === questions.length) {
    feedback.textContent =
      "Parabéns! Você demonstrou compreender a importância do uso consciente da inteligência artificial na educação.";
  } else {
    feedback.textContent =
      "Continue refletindo! A inteligência artificial pode contribuir para a aprendizagem, mas não deve substituir sua capacidade de pensar, interpretar e questionar.";
  }

  nextButton.textContent = "Jogar novamente";
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

