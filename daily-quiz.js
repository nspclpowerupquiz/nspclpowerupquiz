// ==========================================================
// NSPCL POWER PULSE
// AUTOMATIC DAILY CURRENT-AFFAIRS QUIZ
// ==========================================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbziOrV0Tit-jAwCXLZTLJovnnpIh1zTLpZVOOmhtjXyigCj6uxFxY-UYfK6_gn1xXW-yA/exec";


// ==========================================================
// EMPLOYEE
// ==========================================================

const employeeId =
localStorage.getItem("employeeId") || "";

const employeeName =
localStorage.getItem("employeeName") || "Employee";


document.getElementById(
"employeeName"
).innerHTML =
employeeName;


// ==========================================================
// VARIABLES
// ==========================================================

let dailyQuestion = null;

let selectedAnswer = "";

let answered = false;

let seconds = 300;

let timer = null;


// ==========================================================
// LOAD DAILY QUIZ
// ==========================================================

async function loadDailyQuiz() {

    try {

        showLoading();


        const response =
        await fetch(
            SCRIPT_URL +
            "?action=dailyQuiz"
        );


        const data =
        await response.json();


        console.log(
            "Daily Quiz:",
            data
        );


        if (
            data.status !==
            "success"
        ) {

            throw new Error(
                data.message ||
                "Daily question unavailable"
            );

        }


        dailyQuestion =
        data.question;


        // MOTIVATION

        const motivation =
        document.getElementById(
            "motivation"
        );


        if (motivation) {

            motivation.innerHTML =
            "✨ " +
            (
                data.motivation ||
                "Every day is a new opportunity to learn and improve."
            );

        }


        // SOURCE

        const source =
        document.getElementById(
            "newsSource"
        );


        if (
            source &&
            data.source
        ) {

            source.innerHTML =
            "📰 Source: " +
            data.source;

        }


        displayQuestion();


        loadPerformers();


        startTimer();

    }

    catch(error) {

        console.error(
            error
        );


        document.getElementById(
            "question"
        ).innerHTML =

        "⚠️ Today's Daily Power Pulse could not be loaded.";


        document.getElementById(
            "options"
        ).innerHTML =

        `<p>
        Please try again in a few moments.
        </p>`;

    }

}


// ==========================================================
// DISPLAY QUESTION
// ==========================================================

function displayQuestion() {

    answered =
    false;

    selectedAnswer =
    "";


    document.getElementById(
        "question"
    ).innerHTML =

    dailyQuestion.question;


    const options =
    document.getElementById(
        "options"
    );


    options.innerHTML = "";


    dailyQuestion.options
    .forEach(
        function(option, index) {


            const button =
            document.createElement(
                "button"
            );


            button.className =
            "daily-option";


            button.innerHTML =

            `<span class="option-letter">
            ${String.fromCharCode(65 + index)}
            </span>
            ${option}`;


            button.onclick =
            function() {

                selectAnswer(
                    button,
                    option
                );

            };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "questionNumber"
    ).innerHTML =
    "1";


    document.getElementById(
        "totalQuestions"
    ).innerHTML =
    "1";


    const progress =
    document.getElementById(
        "progress"
    );


    if (progress) {

        progress.style.width =
        "100%";

    }

}


// ==========================================================
// SELECT ANSWER
// ==========================================================

function selectAnswer(
    button,
    option
) {

    if (answered)
    return;


    answered =
    true;


    selectedAnswer =
    option;


    const buttons =
    document.querySelectorAll(
        "#options button"
    );


    buttons.forEach(
        function(btn) {

            btn.disabled =
            true;

        }
    );


    const correct =
    dailyQuestion.answer;


    const isCorrect =
    option.trim() ===
    correct.trim();


    if (isCorrect) {

        button.classList.add(
            "correct"
        );

    }

    else {

        button.classList.add(
            "incorrect"
        );


        buttons.forEach(
            function(btn) {

                if (
                    btn.innerText
                    .trim()
                    .endsWith(
                        correct.trim()
                    )
                ) {

                    btn.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    // SHOW EXPLANATION

    const result =
    document.getElementById(
        "answerResult"
    );


    if (result) {

        result.innerHTML =

        isCorrect

        ?

        `<div class="correct-message">
        ✅ Correct! +10 Power Points
        <br><br>
        ${dailyQuestion.explanation || ""}
        </div>`

        :

        `<div class="wrong-message">
        ❌ Incorrect
        <br>
        Correct Answer:
        <strong>
        ${correct}
        </strong>
        <br><br>
        ${dailyQuestion.explanation || ""}
        </div>`;

    }


    // SUBMIT

    submitAnswer(
        option,
        isCorrect
    );


    // REFRESH PERFORMERS

    setTimeout(
        loadPerformers,
        1000
    );

}


// ==========================================================
// SUBMIT ANSWER
// ==========================================================

async function submitAnswer(
    answer,
    correct
) {

    try {

        const response =
        await fetch(
            SCRIPT_URL,
            {

                method:
                "POST",

                body:
                JSON.stringify({

                    action:
                    "submitDailyQuiz",

                    employeeId:
                    employeeId,

                    employeeName:
                    employeeName,

                    question:
                    dailyQuestion.question,

                    answer:
                    answer,

                    correct:
                    correct,

                    points:
                    correct ? 10 : 0

                })

            }
        );


        const data =
        await response.json();


        console.log(
            "Submission:",
            data
        );


        if (
            data.status ===
            "already_submitted"
        ) {

            alert(
                "You have already attempted today's Daily Power Pulse."
            );

        }

    }

    catch(error) {

        console.error(
            "Submission error:",
            error
        );

    }

}


// ==========================================================
// LOAD POWER PERFORMERS
// ==========================================================

async function loadPerformers() {

    try {

        const response =
        await fetch(
            SCRIPT_URL +
            "?action=dailyPerformers"
        );


        const data =
        await response.json();


        const container =
        document.getElementById(
            "performers"
        );


        if (!container)
        return;


        if (
            !data.performers ||
            data.performers.length === 0
        ) {

            container.innerHTML =

            `<p class="no-performers">
            Be the first Power Performer today! ⚡
            </p>`;

            return;

        }


        let html = "";


        data.performers
        .forEach(
            function(person, index) {


                let medal =
                "⭐";


                if (
                    index === 0
                )
                medal = "🥇";


                if (
                    index === 1
                )
                medal = "🥈";


                if (
                    index === 2
                )
                medal = "🥉";


                html +=

                `<div class="performer">

                    <span class="performer-rank">
                    ${medal}
                    </span>

                    <span class="performer-name">
                    ${escapeHTML(
                        person.employeeName
                    )}
                    </span>

                    <span class="performer-points">
                    +${person.points} ⚡
                    </span>

                </div>`;

            }
        );


        container.innerHTML =
        html;

    }

    catch(error) {

        console.error(
            "Performer error:",
            error
        );

    }

}


// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    clearInterval(
        timer
    );


    seconds =
    300;


    timer =
    setInterval(
        function() {


            const min =
            Math.floor(
                seconds / 60
            );


            const sec =
            seconds % 60;


            const timerBox =
            document.getElementById(
                "timer"
            );


            if (timerBox) {

                timerBox.innerHTML =

                `${min}:${sec < 10 ? "0" : ""}${sec}`;

            }


            if (
                seconds <= 0
            ) {

                clearInterval(
                    timer
                );


                if (!answered) {

                    document.getElementById(
                        "answerResult"
                    ).innerHTML =

                    `<div class="wrong-message">
                    ⏰ Time's up!
                    </div>`;

                }

            }


            seconds--;

        },

        1000
    );

}


// ==========================================================
// LOADING
// ==========================================================

function showLoading() {

    document.getElementById(
        "question"
    ).innerHTML =

    "⚡ Preparing today's current-affairs question...";


    document.getElementById(
        "options"
    ).innerHTML =

    `<div class="loading">
    Fetching today's Power Pulse...
    </div>`;

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(
    value
) {

    return String(
        value || ""
    )
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


// ==========================================================
// START
// ==========================================================

loadDailyQuiz();


// Refresh performers every 20 seconds

setInterval(
    loadPerformers,
    20000
);
