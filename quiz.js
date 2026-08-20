// ======================================================
// NSPCL POWER UP SSC-C&M QUIZ
// QUIZ.JS
// ======================================================


// ======================================================
// QUIZ SETTINGS
// ======================================================

// 40 QUESTIONS
const TOTAL_QUIZ_QUESTIONS = 40;

// 15 SECOND TIMER
const QUESTION_TIME = 15;


// ======================================================
// VARIABLES
// ======================================================

let questionPool = [];
let questions = [];

let currentQuestion = 0;
let score = 0;

let timer;
let time = QUESTION_TIME;


// ======================================================
// EMPLOYEE INFORMATION
// ======================================================

let employee =
    localStorage.getItem("employeeId");

let employeeName =
    localStorage.getItem("employeeName");


// ======================================================
// GOOGLE SHEET WEB APP URL
// ======================================================

const sheetURL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ======================================================
// LOGIN CHECK
// ======================================================

if (employee == null) {

    window.location.href = "login.html";

}


if (employeeName == null) {

    employeeName = "Employee";

}


// ======================================================
// SHOW EMPLOYEE NAME
// ======================================================

window.onload = function () {

    let user =
        document.getElementById("welcomeUser");

    if (user) {

        user.innerHTML =
            "Welcome <b>" +
            escapeHTML(employeeName) +
            "</b> (" +
            escapeHTML(employee) +
            ")";

    }

};


// ======================================================
// LOAD QUESTION POOL
// ======================================================

async function loadQuestions() {

    try {

        let response = await fetch(
            "questions.json?version=" + Date.now()
        );


        if (!response.ok) {

            throw new Error(
                "questions.json could not be loaded"
            );

        }


        questionPool =
            await response.json();


        if (
            !Array.isArray(questionPool) ||
            questionPool.length === 0
        ) {

            throw new Error(
                "Question pool is empty"
            );

        }


        console.log(
            "Total questions in pool:",
            questionPool.length
        );


        // ==================================================
        // CHECK QUESTION COUNT
        // ==================================================

        if (
            questionPool.length <
            TOTAL_QUIZ_QUESTIONS
        ) {

            throw new Error(
                "Question pool contains fewer than " +
                TOTAL_QUIZ_QUESTIONS +
                " questions"
            );

        }


        // ==================================================
        // SELECT RANDOM 40 QUESTIONS
        // ==================================================

        questions =
            getRandomQuestions(
                questionPool,
                TOTAL_QUIZ_QUESTIONS
            );


        console.log(
            "Random questions selected:",
            questions.length
        );


    }

    catch (error) {

        console.error(
            "Question loading error:",
            error
        );


        alert(
            "Unable to load the quiz questions. Please try again."
        );

    }

}


// ======================================================
// RANDOM QUESTION SELECTION
// FISHER-YATES SHUFFLE
// ======================================================

function getRandomQuestions(
    pool,
    count
) {

    let shuffled =
        [...pool];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        let randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[randomIndex]
        ] =
        [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }


    return shuffled.slice(
        0,
        count
    );

}


// ======================================================
// RANDOMIZE OPTIONS
//
// SPECIAL RULE:
// "All of the Above" will NOT be placed first.
// ======================================================

function shuffleOptions(question) {

    let options =
        [...question.options];


    // --------------------------------------------------
    // FISHER-YATES SHUFFLE
    // --------------------------------------------------

    for (
        let i = options.length - 1;
        i > 0;
        i--
    ) {

        let randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            options[i],
            options[randomIndex]
        ] =
        [
            options[randomIndex],
            options[i]
        ];

    }


    // --------------------------------------------------
    // FIND "ALL OF THE ABOVE"
    // --------------------------------------------------

    let allOfAboveIndex =
        options.findIndex(
            function (option) {

                return String(option)
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .includes("all of the above");

            }
        );


    // --------------------------------------------------
    // IF ALL OF THE ABOVE IS FIRST,
    // MOVE IT TO A RANDOM POSITION
    // OTHER THAN FIRST
    // --------------------------------------------------

    if (
        allOfAboveIndex === 0 &&
        options.length > 1
    ) {

        let newIndex =
            Math.floor(
                Math.random() *
                (options.length - 1)
            ) + 1;


        [
            options[0],
            options[newIndex]
        ] =
        [
            options[newIndex],
            options[0]
        ];

    }


    return options;

}


// ======================================================
// START QUIZ
// ======================================================

async function startQuiz() {

    await loadQuestions();


    if (
        !questions ||
        questions.length === 0
    ) {

        return;

    }


    // ==================================================
    // RESET QUIZ
    // ==================================================

    currentQuestion = 0;

    score = 0;


    // ==================================================
    // RESET SCORE DISPLAY
    // ==================================================

    let liveScore =
        document.getElementById(
            "liveScore"
        );


    if (liveScore) {

        liveScore.innerHTML =
            "0";

    }


    // ==================================================
    // SHOW QUIZ
    // ==================================================

    let intro =
        document.querySelector(
            ".quiz-intro"
        );


    if (intro) {

        intro.style.display =
            "none";

    }


    let quizArea =
        document.getElementById(
            "quiz-area"
        );


    if (quizArea) {

        quizArea.style.display =
            "block";

    }


    // ==================================================
    // LOAD FIRST QUESTION
    // ==================================================

    loadQuestion();

}


// ======================================================
// LOAD QUESTION
// ======================================================

function loadQuestion() {

    clearInterval(timer);


    // ==================================================
    // CHECK QUIZ COMPLETION
    // ==================================================

    if (
        currentQuestion >=
        questions.length
    ) {

        showResult();

        return;

    }


    // ==================================================
    // RESET TIMER
    // ==================================================

    time =
        QUESTION_TIME;


    let timeElement =
        document.getElementById(
            "time"
        );


    if (timeElement) {

        timeElement.innerHTML =
            time;

    }


    // ==================================================
    // CURRENT QUESTION
    // ==================================================

    let q =
        questions[currentQuestion];


    // ==================================================
    // PROGRESS
    // ==================================================

    let progress =
        document.getElementById(
            "progress"
        );


    if (progress) {

        progress.innerHTML =
            (currentQuestion + 1) +
            " / " +
            TOTAL_QUIZ_QUESTIONS;

    }


    // ==================================================
    // QUESTION TEXT
    // ==================================================

    let questionElement =
        document.getElementById(
            "question"
        );


    if (questionElement) {

        questionElement.innerHTML =
            "Q" +
            (currentQuestion + 1) +
            ". " +
            escapeHTML(
                q.question
            );

    }


    // ==================================================
    // RANDOMIZE OPTIONS
    // ==================================================

    let randomizedOptions =
        shuffleOptions(q);


    // Save randomized options

    q.currentOptions =
        randomizedOptions;


    // ==================================================
    // CREATE OPTIONS
    // ==================================================

    let optionHTML = "";


    let letters =
        [
            "A",
            "B",
            "C",
            "D"
        ];


    randomizedOptions.forEach(
        function (
            option,
            index
        ) {

            optionHTML += `

                <button
                    class="option"
                    data-answer="${escapeHTML(option)}"
                    onclick="checkAnswer(this)"
                >

                    <span class="option-letter">
                        ${letters[index]}
                    </span>

                    <span class="option-text">
                        ${escapeHTML(option)}
                    </span>

                </button>

            `;

        }
    );


    let optionsElement =
        document.getElementById(
            "options"
        );


    if (optionsElement) {

        optionsElement.innerHTML =
            optionHTML;

    }


    // ==================================================
    // DISABLE NEXT BUTTON
    // ==================================================

    let nextButton =
        document.getElementById(
            "nextBtn"
        );


    if (nextButton) {

        nextButton.disabled =
            true;

    }


    // ==================================================
    // START TIMER
    // ==================================================

    startTimer();

}


// ======================================================
// TIMER
// ======================================================

function startTimer() {

    clearInterval(timer);


    timer =
        setInterval(
            function () {

                time--;


                let timeElement =
                    document.getElementById(
                        "time"
                    );


                if (timeElement) {

                    timeElement.innerHTML =
                        time;

                }


                // ==================================================
                // TIME UP
                // ==================================================

                if (time <= 0) {

                    clearInterval(timer);


                    disableOptions();


                    let nextButton =
                        document.getElementById(
                            "nextBtn"
                        );


                    if (nextButton) {

                        nextButton.disabled =
                            false;

                    }

                }

            },
            1000
        );

}


// ======================================================
// CHECK ANSWER
// ======================================================

function checkAnswer(button) {

    clearInterval(timer);


    // ==================================================
    // CURRENT QUESTION
    // ==================================================

    let q =
        questions[currentQuestion];


    let correctAnswer =
        String(
            q.answer
        ).trim();


    // ==================================================
    // SELECTED ANSWER
    // ==================================================

    let selectedAnswer =
        button
            .getAttribute(
                "data-answer"
            )
            .trim();


    // ==================================================
    // GET ALL OPTIONS
    // ==================================================

    let buttons =
        document.querySelectorAll(
            ".option"
        );


    // ==================================================
    // DISABLE ALL OPTIONS
    // ==================================================

    buttons.forEach(
        function (btn) {

            btn.disabled =
                true;


            let answer =
                btn
                    .getAttribute(
                        "data-answer"
                    )
                    .trim();


            // ==================================================
            // SHOW CORRECT ANSWER
            // ==================================================

            if (
                answer ===
                correctAnswer
            ) {

                btn.style.background =
                    "#16a34a";

                btn.style.color =
                    "white";

            }

        }
    );


    // ==================================================
    // CHECK SELECTED ANSWER
    // ==================================================

    if (
        selectedAnswer ===
        correctAnswer
    ) {

        score++;


        let liveScore =
            document.getElementById(
                "liveScore"
            );


        if (liveScore) {

            liveScore.innerHTML =
                score;

        }


        button.style.background =
            "#16a34a";

        button.style.color =
            "white";

    }


    else {

        button.style.background =
            "#dc2626";

        button.style.color =
            "white";

    }


    // ==================================================
    // ENABLE NEXT BUTTON
    // ==================================================

    let nextButton =
        document.getElementById(
            "nextBtn"
        );


    if (nextButton) {

        nextButton.disabled =
            false;

    }

}


// ======================================================
// DISABLE OPTIONS
// ======================================================

function disableOptions() {

    let buttons =
        document.querySelectorAll(
            ".option"
        );


    let q =
        questions[currentQuestion];


    let correctAnswer =
        String(
            q.answer
        ).trim();


    buttons.forEach(
        function (btn) {

            btn.disabled =
                true;


            let answer =
                btn
                    .getAttribute(
                        "data-answer"
                    )
                    .trim();


            // ==================================================
            // HIGHLIGHT CORRECT ANSWER
            // ==================================================

            if (
                answer ===
                correctAnswer
            ) {

                btn.style.background =
                    "#16a34a";

                btn.style.color =
                    "white";

            }

        }
    );

}


// ======================================================
// NEXT QUESTION
// ======================================================

function nextQuestion() {

    currentQuestion++;

    loadQuestion();

}


// ======================================================
// SEND SCORE TO GOOGLE SHEET
// ======================================================

function submitScore(
    finalScore,
    percentage
) {

    let data = {

        employeeId:
            employee,

        employeeName:
            employeeName,

        score:
            finalScore,

        totalQuestions:
            TOTAL_QUIZ_QUESTIONS,

        percentage:
            percentage,

        dateTime:
            new Date().toISOString()

    };


    console.log(
        "Sending quiz result:",
        data
    );


    fetch(
        sheetURL,
        {

            method:
                "POST",

            mode:
                "no-cors",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(
                    data
                )

        }
    )

    .then(
        function () {

            console.log(
                "Quiz result submitted."
            );

        }
    )

    .catch(
        function (error) {

            console.error(
                "Score submission error:",
                error
            );

        }
    );

}


// ======================================================
// SHOW RESULT
// ======================================================

function showResult() {

    clearInterval(timer);


    // ==================================================
    // HIDE QUIZ
    // ==================================================

    let quizArea =
        document.getElementById(
            "quiz-area"
        );


    if (quizArea) {

        quizArea.style.display =
            "none";

    }


    // ==================================================
    // CALCULATE PERCENTAGE
    // ==================================================

    let percentage =
        Math.round(
            (
                score /
                TOTAL_QUIZ_QUESTIONS
            ) *
            100
        );


    // ==================================================
    // SAVE LOCALLY
    // ==================================================

    localStorage.setItem(
        "score",
        score
    );


    localStorage.setItem(
        "totalQuestions",
        TOTAL_QUIZ_QUESTIONS
    );


    localStorage.setItem(
        "percentage",
        percentage
    );


    // ==================================================
    // SEND RESULT TO GOOGLE SHEETS
    // ==================================================

    submitScore(
        score,
        percentage
    );


    // ==================================================
    // DISPLAY RESULT
    // ==================================================

    let result =
        document.getElementById(
            "result"
        );


    if (result) {

        result.innerHTML = `

            <div class="result-card">

                <h2>
                    🎉 Congratulations
                    ${escapeHTML(employeeName)}
                    (${escapeHTML(employee)})
                </h2>

                <h3>
                    NSPCL Power Up SSC-C&amp;M Quiz
                    <br>
                    Completed Successfully
                </h3>

                <h1>
                    ${score} /
                    ${TOTAL_QUIZ_QUESTIONS}
                </h1>

                <h2>
                    ${percentage}%
                </h2>

                <p>
                    🏆 Generating your certificate...
                </p>

            </div>

        `;

    }


    // ==================================================
    // OPEN CERTIFICATE
    // ==================================================

    setTimeout(
        function () {

            window.location.href =
                "certificate.html";

        },
        2000
    );

}


// ======================================================
// RESTART QUIZ
// ======================================================

function restartQuiz() {

    location.reload();

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
