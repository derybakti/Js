const questions = [
	{
		question: "What is 2 + 2?",
		answers: [
			{ text: "4", correct: true },
			{ text: "3", correct: false },
			{ text: "6", correct: false },
			{ text: "5", correct: false },
		],
	},

	{
		question: "What is the capital of France?",
		answers: [
			{ text: "New York", correct: false },
			{ text: "Paris", correct: true },
			{ text: "London", correct: false },
			{ text: "Madrid", correct: false },
		],
	},
	{
		question: "What is the largest country in the world?",
		answers: [
			{ text: "Russia", correct: false },
			{ text: "Canada", correct: false },
			{ text: "China", correct: true },
			{ text: "USA", correct: false },
		],
	},

	{
		question: "What is the smallest country in the world?",
		answers: [
			{ text: "Vatican City", correct: false },
			{ text: "Monaco", correct: false },
			{ text: "San Marino", correct: false },
			{ text: "Malta", correct: true },
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
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");

		answerButtons.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
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
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
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

function handleNextButton() {
	resetState();
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

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

	nextButton.style.display = "block";
	nextButton.style.width = "150px";
	nextButton.innerHTML = "Play Again";
}

startQuiz();
