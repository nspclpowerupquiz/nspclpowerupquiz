// ==========================
// NSPCL POWER-UP QUIZ
// QUIZ.JS
// ==========================


// ==========================
// QUIZ SETTINGS
// ==========================

const TOTAL_QUIZ_QUESTIONS = 30;
const QUESTION_TIME = 5;


// ==========================
// VARIABLES
// ==========================

let questions = [];

let currentQuestion = 0;

let score = 0;

let timer;

let time = QUESTION_TIME;


// ==========================
// EMPLOYEE INFORMATION
// ==========================

let employee = localStorage.getItem("employeeId");

let employeeName = localStorage.getItem("employeeName");


// ==========================
// GOOGLE SHEET WEB APP URL
// ==========================

const sheetURL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ==========================
// LOGIN CHECK
// ==========================

if (employee == null) {

    window.location.href = "login.html";

}


if (employeeName == null) {

    employeeName = "Employee";

}


// ==========================
// SHOW EMPLOYEE NAME
// ==========================

window.onload = function () {

    let user = document.getElementById("welcomeUser");

    if (user) {

        user.innerHTML =
        "Welcome <b>" + employeeName + "</b> (" + employee + ")";

    }

};


// ==========================
// LOAD QUESTION POOL
// ==========================

async function loadQuestions() {

    try {

        let response = await fetch("questions.json");

        if (!response.ok) {

            throw new Error("questions.json missing");

        }

        // Load ALL questions from question pool

        let questionPool = await response.json();


        if (!Array.isArray(questionPool) || questionPool.length === 0) {

            throw new Error("No questions found");

        }


        console.log(
            "Total questions in pool:",
            questionPool.length
        );


        // ==========================
        // RANDOMIZE QUESTION POOL
        // ==========================

        questionPool = shuffleArray(questionPool);


        // ==========================
        // SELECT 30 QUESTIONS
        // ==========================

        questions = questionPool.slice(
            0,
            Math.min(TOTAL_QUIZ_QUESTIONS, questionPool.length)
        );


        console.log(
            "Questions selected for this quiz:",
            questions.length
        );


    }

    catch (error) {

        console.error(error);

        alert("Unable to load questions");

    }

}


// ==========================
// SHUFFLE ARRAY
// FISHER-YATES SHUFFLE
// ==========================

function shuffleArray(array) {

    let shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        let randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            shuffled[i],
            shuffled[randomIndex]
        ] =
        [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }

    return shuffled;

}


// ==========================
// START QUIZ
// ==========================

async function startQuiz() {

    await loadQuestions();


    if (questions.length === 0) {

        alert("No questions available");

        return;

    }


    currentQuestion = 0;

    score = 0;


    document.getElementById("liveScore").innerHTML = score;


    document.querySelector(".quiz-intro").style.display = "none";


    document.getElementById("quiz-area").style.display = "block";


    loadQuestion();

}


// ==========================
// LOAD QUESTION
// ==========================

function loadQuestion() {

    clearInterval(timer);


    // ==========================
    // CHECK QUIZ COMPLETION
    // ==========================

    if (currentQuestion >= questions.length) {

        showResult();

        return;

    }


    // ==========================
    // RESET TIMER
    // ==========================

    time = QUESTION_TIME;

    document.getElementById("time").innerHTML = time;


    // ==========================
    // CURRENT QUESTION
    // ==========================

    let q = questions[currentQuestion];


    // ==========================
    // PROGRESS
    // ==========================

    document.getElementById("progress").innerHTML =

        (currentQuestion + 1) +
        " / " +
        questions.length;


    // ==========================
    // QUESTION TEXT
    // ==========================

    document.getElementById("question").innerHTML =

        "Q" +
        (currentQuestion + 1) +
        ". " +
        q.question;


    // ==========================
    // OPTIONS
    // ==========================

    let optionHTML = "";

    let letters = ["A", "B", "C", "D"];


    q.options.forEach(function (option, index) {

        optionHTML += `

        <button
            class="option"
            onclick="checkAnswer(this, '${escapeHTML(option)}')"
        >

            <span class="option-letter">

                ${letters[index]}

            </span>

            ${option}

        </button>

        `;

    });


    document.getElementById("options").innerHTML =
        optionHTML;


    // ==========================
    // DISABLE NEXT BUTTON
    // ==========================

    document.getElementById("nextBtn").disabled = true;


    // ==========================
    // START TIMER
    // ==========================

    startTimer();

}


// ==========================
// TIMER
// ==========================

function startTimer() {

    timer = setInterval(function () {

        time--;

        document.getElementById("time").innerHTML =
            time;


        if (time <= 0) {

            clearInterval(timer);

            disableOptions();

            document.getElementById("nextBtn").disabled =
                false;

        }

    }, 1000);

}


// ==========================
// CHECK ANSWER
// ==========================

function checkAnswer(button, selectedAnswer) {

    clearInterval(timer);


    let correctAnswer =
        questions[currentQuestion].answer;


    let buttons =
        document.querySelectorAll(".option");


    buttons.forEach(function (btn) {

        btn.disabled = true;


        if (
            btn.innerText.trim().endsWith(
                correctAnswer.trim()
            )
        ) {

            btn.style.background = "#16a34a";

            btn.style.color = "white";

        }

    });


    // ==========================
    // CORRECT ANSWER
    // ==========================

    if (
        selectedAnswer.trim() ===
        correctAnswer.trim()
    ) {

        score++;

        document.getElementById("liveScore").innerHTML =
            score;


        button.style.background = "#16a34a";

        button.style.color = "white";

    }


    // ==========================
    // WRONG ANSWER
    // ==========================

    else {

        button.style.background = "#dc2626";

        button.style.color = "white";

    }


    document.getElementById("nextBtn").disabled =
        false;

}


// ==========================
// DISABLE OPTIONS
// ==========================

function disableOptions() {

    let buttons =
        document.querySelectorAll(".option");


    let correctAnswer =
        questions[currentQuestion].answer;


    buttons.forEach(function (btn) {

        btn.disabled = true;


        if (
            btn.innerText.trim().endsWith(
                correctAnswer.trim()
            )
        ) {

            btn.style.background = "#16a34a";

            btn.style.color = "white";

        }

    });

}


// ==========================
// NEXT QUESTION
// ==========================

function nextQuestion() {

    currentQuestion++;

    loadQuestion();

}


// ==========================
// SEND SCORE TO GOOGLE SHEET
// ==========================

function submitScore(score, percentage) {

    let data = {

        employeeId: employee,

        employeeName: employeeName,

        score: score,

        totalQuestions: questions.length,

        percentage: percentage,

        dateTime: new Date().toISOString()

    };


    console.log("Sending:", data);


    fetch(sheetURL, {

        method: "POST",

        mode: "no-cors",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

}


// ==========================
// SHOW RESULT
// ==========================

function showResult() {

    clearInterval(timer);


    document.getElementById("quiz-area").style.display =
        "none";


    // ==========================
    // CALCULATE PERCENTAGE
    // ==========================

    let percentage = Math.round(
        (score / questions.length) * 100
    );


    // ==========================
    // SAVE RESULT TO GOOGLE SHEET
    // ==========================

    submitScore(score, percentage);


    // ==========================
    // SAVE LOCALLY
    // ==========================

    localStorage.setItem("score", score);

    localStorage.setItem(
        "totalQuestions",
        questions.length
    );

    localStorage.setItem(
        "percentage",
        percentage
    );


    // ==========================
    // SHOW RESULT
    // ==========================

    document.getElementById("result").innerHTML = `

        <div class="result-card">

            <h2>
                🎉 Congratulations
                ${employeeName}
                (${employee})
            </h2>

            <h3>
                NSPCL Power-Up Quiz Completed Successfully
            </h3>

            <h1>
                ${score} / ${questions.length}
            </h1>

            <h2>
                ${percentage}%
            </h2>

            <p>
                🏆 Generating your certificate...
            </p>

        </div>

    `;


    // ==========================
    // OPEN CERTIFICATE
    // ==========================

    setTimeout(function () {

        window.location.href =
            "certificate.html";

    }, 2000);

}


// ==========================
// RESTART QUIZ
// ==========================

function restartQuiz() {

    location.reload();

}


// ==========================
// BASIC HTML ESCAPE
// ==========================

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
