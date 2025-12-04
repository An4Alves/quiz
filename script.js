const questions = [
  {
    question: "1- Segundo Bourdieu, aprender sociologia é mais parecido com:",
    answers: [
      { id: 1, text: "Memorizar fórmulas e conceitos teóricos", correct: false },
      { id: 2, text: "Assistir passivamente a aulas e palestras", correct: false },
      { id: 3, text: "Aprender um modo de fazer, com prática, dúvidas e correções constantes.", correct: true },
      { id: 4, text: " Escolher temas grandiosos para pesquisa que tenham impacto social imediato.", correct: false },
    ],
  },
  {
    question: "No mercado dos bens simbólicos, o reconhecimento de identidades diferentes envolve qual princípio fundamental?",
    answers: [
      { id: 1, text: "A padronização das culturas para evitar conflitos de representação.", correct: false },
      { id: 2, text: "A afirmação jurídica e política da diferença, permitindo que identidades distintas existam de forma legítima. ", correct: true },
      { id: 3, text: "A eliminação das distinções simbólicas para garantir igualdade total entre os grupos..", correct: false },
      { id: 4, text: "A submissão das identidades regionais aos critérios universais da economia global.", correct: false },
    ],
  },
  {
    question: "Segundo Bourdieu, qual é o principal erro cometido por certos filósofos ao tentar definir a experiência estética?",
    answers: [
      { id: 1, text: "Tomar a sua própria experiência estética, socialmente construída, como se fosse universal e válida para todos", correct: true },
      { id: 2, text: "Considerar que o gosto artístico é resultado de escolhas individuais totalmente livres.", correct: false },
      { id: 3, text: "Afirmar que toda experiência estética é determinada exclusivamente por fatores biológicos.", correct: false },
      { id: 4, text: " Defender que a arte só pode ser compreendida por meio de métodos quantitativos e estatísticos.", correct: false },
    ],
  },
  {
    question: "Segundo Pierre Bourdieu, qual a principal diferença entre História Reificada e História Incorporada?",
    answers: [
      { id: 1, text: "A história reificada é a concretização do passado em instituições e estruturas, enquanto a história incorporada é o passado presente nos corpos e práticas cotidianas.    ", correct: true },
      { id: 2, text: "A história reificada está ligada ao esquecimento social, enquanto a história incorporada corresponde à lembrança consciente dos indivíduos.  ", correct: false },
      { id: 3, text: "A história reificada se refere à maneira de falar e aos gestos e a história incorporada se refere às normas, leis e regras.  ", correct: false },
      { id: 4, text: "A história reificada refere-se às memórias individuais, enquanto a história incorporada diz respeito apenas às tradições orais.", correct: false },
    ],
  },
  {
    question: "Qual é o conceito sociológico utilizado por Bourdieu para nomear esse universo social específico onde o Direito é produzido e legitimado?",
    answers: [
      { id: 1, text: "Aparelho Ideológico do Estado", correct: false },
      { id: 2, text: "Campo Jurídico", correct: true },
      { id: 3, text: "Estrutura Social", correct: false },
      { id: 4, text: "Relação de Força", correct: false },
    ],
  },
  {
    question: "o que significa dizer que os “discursos regionalistas” podem contribuir para produzir aquilo que descrevem?",
    answers: [
      { id: 1, text: "Que os discursos regionalistas apenas registram fatos objetivos já existentes na realidade.", correct: false  },
      { id: 2, text: "Que os discursos regionalistas são irrelevantes e não influenciam a construção das identidades.", correct: false },
      { id: 3, text: "Que os discursos regionalistas são sempre falsos e devem ser rejeitados pelos cientistas.", correct: false },
      { id: 4, text: "Que, ao afirmar a existência de uma identidade ou unidade regional, esses discursos ajudam a criar práticas e símbolos que tornam essa identidade real.", correct: true },
    ],
  },
    {
    question: "Qual exemplo mostra que a percepção do mundo social é moldada por estruturas objetivas?",
    answers: [
      { id: 1, text: "Todos os grupos visitam museus com a mesma frequência.", correct: false },
      { id: 2, text: "As pessoas vão ao museu só por gosto pessoal.", correct: false },
      { id: 3, text: "É mais provável que quem tem muito capital cultural visite museus.", correct: true },
      { id: 4, text: "A decisão de ir ao museu é totalmente aleatória e não depende da posição social.", correct: false },
    ],
  },
  {
    question: "É um indivíduo que age na sociedade transforma ela ou será que a sociedade forma um indivíduo? ",
    answers: [
      { id: 1, text: "Apenas o indivíduo molda a sociedade.", correct: false },
      { id: 2, text: " Apenas a sociedade molda totalmente o indivíduo. ", correct: false },
      { id: 3, text: "O indivíduo age sem qualquer influência social.", correct: false },
      { id: 4, text: "O indivíduo e a sociedade se formam mutuamente", correct: true },
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


