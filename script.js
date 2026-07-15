// ===============================
// Quiz Questions
// ===============================

const questions = [

{
    question: "Which planet is known as the Red Planet?",
    options: ["Earth","Mars","Jupiter","Venus"],
    answer: "Mars",
    category: "Science"
},

{
    question: "What is the capital of India?",
    options: ["Mumbai","Delhi","Kolkata","Chennai"],
    answer: "Delhi",
    category: "GK"
},

{
    question: "5 × 8 = ?",
    options: ["35","40","45","50"],
    answer: "40",
    category: "Maths"
},

{
    question: "Who wrote Harry Potter?",
    options: [
        "J.K. Rowling",
        "Ruskin Bond",
        "Roald Dahl",
        "Enid Blyton"
    ],
    answer: "J.K. Rowling",
    category: "Reading"
},

{
    question: "How many squares are there on a chessboard?",
    options: ["32","64","100","81"],
    answer: "64",
    category: "Chess"
},

{
    question: "Which gas do plants absorb?",
    options: [
        "Oxygen",
        "Nitrogen",
        "Carbon Dioxide",
        "Hydrogen"
    ],
    answer: "Carbon Dioxide",
    category: "Science"
},

{
    question: "Who is known as the Father of the Nation in India?",
    options: [
        "Jawaharlal Nehru",
        "Subhas Chandra Bose",
        "Mahatma Gandhi",
        "Sardar Patel"
    ],
    answer: "Mahatma Gandhi",
    category: "GK"
},

{
    question: "12 + 18 = ?",
    options: ["28","30","32","34"],
    answer: "30",
    category: "Maths"
},

{
    question: "Who is the author of Charlotte's Web?",
    options: [
        "E. B. White",
        "Ruskin Bond",
        "Dr. Seuss",
        "Enid Blyton"
    ],
    answer: "E. B. White",
    category: "Reading"
},

{
    question: "Which chess piece can jump over other pieces?",
    options: [
        "Queen",
        "Knight",
        "Rook",
        "Bishop"
    ],
    answer: "Knight",
    category: "Chess"
}

];
// ==========================
// QuizMaster Script Part 4A
// ==========================

// Elements
const landing = document.getElementById("landing");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");

const startBtn = document.getElementById("startQuiz");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const progressBar = document.getElementById("progressBar");

const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");

// Variables
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
// =====================
// Timer Variables
// =====================

let totalTime = 600; // 10 Minutes

let timer;

const timerDisplay = document.getElementById("timer");

const darkBtn = document.getElementById("darkBtn");

// Total Questions
totalQuestions.textContent = questions.length;

// ==========================
// Start Quiz
// ==========================

startBtn.addEventListener("click", () => {

    landing.classList.add("hidden");

    quizContainer.classList.remove("hidden");

    loadQuestion();

    startTimer();

});


// ==========================
// Load Question
// ==========================

function loadQuestion() {

    const q = questions[currentQuestion];

    questionText.textContent = q.question;

    questionNumber.textContent = currentQuestion + 1;

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {

        const btn = document.createElement("button");

        btn.classList.add("option");

        btn.textContent = option;

        if(userAnswers[currentQuestion] === option){
            btn.classList.add("selected");
        }

        btn.addEventListener("click", () => {

            userAnswers[currentQuestion] = option;

            loadQuestion();

        });

        optionsContainer.appendChild(btn);

    });

    updateProgress();

}

// ==========================
// Progress Bar
// ==========================

function updateProgress(){

    const percent = ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = percent + "%";

}

// ==========================
// Next
// ==========================

nextBtn.addEventListener("click", () => {

    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        loadQuestion();

    }

});

// ==========================
// Previous
// ==========================

prevBtn.addEventListener("click", () => {

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});

// ==========================
// Submit
// ==========================

submitBtn.addEventListener("click", showResult);

// ==========================
// Result
// ==========================

function showResult(){

    clearInterval(timer);

    let score = 0;

    questions.forEach((q,index)=>{

        if(userAnswers[index] === q.answer){

            score++;

        }

    });

    const percentage = Math.round((score/questions.length)*100);

    let message="";

    if(percentage>=80){

        message="🏆 Excellent!";

    }

    else if(percentage>=60){

        message="😊 Good Job!";

    }

    else{

        message="📚 Keep Practicing!";

    }

    quizContainer.classList.add("hidden");

    resultContainer.classList.remove("hidden");

    scoreText.innerHTML=`
        <h2>${score} / ${questions.length}</h2>
        <h3>${percentage}%</h3>
        <p>${message}</p>
    `;

}

    let score = 0;

    questions.forEach((q,index)=>{

        if(userAnswers[index] === q.answer){

            score++;

        }

    });

    quizContainer.classList.add("hidden");

    resultContainer.classList.remove("hidden");

    scoreText.textContent = score + " / " + questions.length;

}

// ==========================
// Restart
// ==========================

restartBtn.addEventListener("click",()=>{

    clearInterval(timer);

    totalTime=600;

    timerDisplay.textContent="10:00";

    currentQuestion=0;

    userAnswers=new Array(questions.length).fill(null);

    resultContainer.classList.add("hidden");

    landing.classList.remove("hidden");

    progressBar.style.width="0%";

});
// =====================
// Timer
// =====================

function startTimer(){

    clearInterval(timer);

    totalTime = 600;

    updateTimer();

    timer = setInterval(()=>{

        totalTime--;

        updateTimer();

        if(totalTime<=0){

            clearInterval(timer);

            showResult();

        }

    },1000);

}

function updateTimer(){

    let minutes=Math.floor(totalTime/60);

    let seconds=totalTime%60;

    if(minutes<10) minutes="0"+minutes;

    if(seconds<10) seconds="0"+seconds;

    timerDisplay.textContent=minutes+":"+seconds;

}
