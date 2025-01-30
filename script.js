const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
            { text: "Blue whale", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true},
            { text: "Asia", correct: false},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ] 
    },
    {
        question: "In What year was the first iphone released?",
        answers: [
            { text: "2008", correct: false},
            { text: "2009", correct: false},
            { text: "2007", correct: true},
            { text: "2010", correct: false},
        ] 
    },
    {
        question: "What type of animal is a penguin?",
        answers: [
            { text: "Mammal", correct: false},
            { text: "Bird", correct: true},
            { text: "Reptile", correct: false},
            { text: "Insect", correct: false},
        ] 
    },
    {
        question: "What is the largest country in the world by area?",
        answers: [
            { text: "China", correct: false},
            { text: "Russia", correct: true},
            { text: "Iran", correct: false},
            { text: "Africa", correct: false},
        ] 
    },
    {
        question: "How many millimeters are in centimetre?",
        answers: [
            { text: "10mm", correct: true},
            { text: "100mm", correct: false},
            { text: "1000mm", correct: false},
            { text: "20mm", correct: false},
        ] 
    },
    {
        question: "Which country has the longest coastline in the world?",
        answers: [
            { text: "France", correct: false},
            { text: "Australia", correct: false},
            { text: "Turkey", correct: false},
            { text: "Canada", correct: true},
        ] 
    },
    {
        question: "Which part of a plant is responsible for absorbing water and nutrients from the soil?",
        answers: [
            { text: "Root", correct: true},
            { text: "Stem", correct: false},
            { text: "Leaves", correct: false},
            { text: "Flowers", correct: false},
        ] 
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore () {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();
