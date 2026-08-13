// ==========================================================
// NSPCL POWER PULSE
// AUTOMATIC DAILY QUIZ
// QUESTION BANK FROM GOOGLE SHEETS
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

const employeeNameElement =
document.getElementById("employeeName");

if (employeeNameElement) {
    employeeNameElement.innerHTML = escapeHTML(employeeName);
}


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

        const response = await fetch(
            SCRIPT_URL + "?action=dailyQuiz"
        );

        if (!response.ok) {
            throw new Error("Unable to connect to quiz server.");
        }

        const data = await response.json();

        console.log("Daily Quiz:", data);

        if (data.status !== "success") {

            throw new Error(
                data.message ||
                "Today's question is unavailable."
            );

        }

        dailyQuestion = data.question;

        if (!dailyQuestion) {
            throw new Error("Question data is missing.");
        }


        // ==================================================
        // MOTIVATION
        // ==================================================

        const motivation =
        document.getElementById("motivation");

        if (motivation) {

            motivation.innerHTML =
                "⚡ " +
                escapeHTML(
                    data.motivation ||
                    dailyQuestion.motivation ||
                    "Every day is a new opportunity to learn and improve."
                );

        }


        // ==================================================
        // CATEGORY
        // ==================================================

        const category =
        document.getElementById("category");

        if (category && dailyQuestion.category) {

            category.innerHTML =
                escapeHTML(dailyQuestion.category);

        }


        // ==================================================
        // SOURCE
        // ==================================================

        const source =
        document.getElementById("newsSource");

        if (source) {

            if (data.source) {

                source.innerHTML =
                    "📚 Source: " +
                    escapeHTML(data.source);

            } else {

                source.innerHTML =
                    "📚 NSPCL Power Pulse Question Bank";

            }

        }


        // ==================================================
        // DISPLAY
        // ==================================================

        displayQuestion();

        loadPerformers();

        startTimer();

    }

    catch (error) {

        console.error("Daily Quiz Error:", error);

        const question =
        document.getElementById("question");

        if (question) {

            question.innerHTML =
                "⚠️ Today's Power Pulse could not be loaded.";

        }

        const options =
        document.getElementById("options");

        if (options) {

            options.innerHTML =
                `<p>Please try again in a few moments.</p>`;

        }

    }

}


// ==========================================================
// DISPLAY QUESTION
// ==========================================================

function displayQuestion() {

    answered = false;
    selectedAnswer = "";

    const question =
    document.getElementById("question");

    if (question) {

        question.innerHTML =
            escapeHTML(dailyQuestion.question);

    }


    const options =
    document.getElementById("options");

    if (!options) return;

    options.innerHTML = "";


    // ------------------------------------------
    // SUPPORT BOTH FORMATS
    // ------------------------------------------

    let questionOptions =
        dailyQuestion.options;

    // If backend sends optionA/B/C/D instead
    if (
        !questionOptions ||
        !Array.isArray(questionOptions)
    ) {

        questionOptions = [
            dailyQuestion.optionA,
            dailyQuestion.optionB,
            dailyQuestion.optionC,
            dailyQuestion.optionD
        ];

    }


    questionOptions.forEach(
        function(option, index) {

            if (
                option === undefined ||
                option === null ||
                option === ""
            ) {
                return;
            }

            const button =
            document.createElement("button");

            button.className =
                "daily-option";

            button.innerHTML =
                `<span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                 </span>
                 ${escapeHTML(option)}`;

            button.onclick =
            function() {

                selectAnswer(
                    button,
                    String(option)
                );

            };

            options.appendChild(button);

        }
    );


    const questionNumber =
    document.getElementById("questionNumber");

    if (questionNumber) {
        questionNumber.innerHTML = "1";
    }


    const totalQuestions =
    document.getElementById("totalQuestions");

    if (totalQuestions) {
        totalQuestions.innerHTML = "1";
    }


    const progress =
    document.getElementById("progress");

    if (progress) {
        progress.style.width = "100%";
    }

}


// ==========================================================
// SELECT ANSWER
// ==========================================================

function selectAnswer(button, option) {

    if (answered) return;

    answered = true;

    selectedAnswer = option;

    clearInterval(timer);


    const buttons =
    document.querySelectorAll(
        "#options button"
    );

    buttons.forEach(
        function(btn) {
            btn.disabled = true;
        }
    );


    const correct =
        String(
            dailyQuestion.answer || ""
        ).trim();


    const isCorrect =
        option.trim().toLowerCase() ===
        correct.toLowerCase();


    // ==================================================
    // SHOW CORRECT / WRONG
    // ==================================================

    if (isCorrect) {

        button.classList.add("correct");

    }

    else {

        button.classList.add("incorrect");


        buttons.forEach(
            function(btn) {

                const text =
                    btn.innerText
                    .replace(/^[A-D]\s*/, "")
                    .trim();

                if (
                    text.toLowerCase() ===
                    correct.toLowerCase()
                ) {

                    btn.classList.add("correct");

                }

            }
        );

    }


    // ==================================================
    // EXPLANATION
    // ==================================================

    const result =
    document.getElementById("answerResult");

    if (result) {

        if (isCorrect) {

            result.innerHTML =
                `<div class="correct-message">
                    ✅ Correct! +10 Power Points
                    <br><br>
                    ${escapeHTML(
                        dailyQuestion.explanation || ""
                    )}
                </div>`;

        }

        else {

            result.innerHTML =
                `<div class="wrong-message">
                    ❌ Incorrect
                    <br>
                    Correct Answer:
                    <strong>
                        ${escapeHTML(correct)}
                    </strong>
                    <br><br>
                    ${escapeHTML(
                        dailyQuestion.explanation || ""
                    )}
                </div>`;

        }

    }


    // ==================================================
    // SUBMIT RESULT
    // ==================================================

    submitAnswer(
        option,
        isCorrect
    );


    // ==================================================
    // REFRESH LEADERBOARD
    // ==================================================

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

                method: "POST",

                body: JSON.stringify({

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


        data.performers.forEach(
            function(person, index) {

                let medal = "⭐";

                if (index === 0)
                    medal = "🥇";

                if (index === 1)
                    medal = "🥈";

                if (index === 2)
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
                        +${Number(person.points) || 0} ⚡
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

    clearInterval(timer);

    seconds = 300;


    const timerBox =
    document.getElementById("timer");


    function updateTimer() {

        const min =
            Math.floor(seconds / 60);

        const sec =
            seconds % 60;


        if (timerBox) {

            timerBox.innerHTML =
                `${min}:${sec < 10 ? "0" : ""}${sec}`;

        }


        if (seconds <= 0) {

            clearInterval(timer);

            if (!answered) {

                answered = true;

                const buttons =
                document.querySelectorAll(
                    "#options button"
                );

                buttons.forEach(
                    function(btn) {
                        btn.disabled = true;
                    }
                );


                const result =
                document.getElementById(
                    "answerResult"
                );

                if (result) {

                    result.innerHTML =
                        `<div class="wrong-message">
                            ⏰ Time's up!
                         </div>`;

                }

            }

            return;

        }

        seconds--;

    }


    updateTimer();

    timer =
    setInterval(
        updateTimer,
        1000
    );

}


// ==========================================================
// LOADING
// ==========================================================

function showLoading() {

    const question =
    document.getElementById("question");

    if (question) {

        question.innerHTML =
            "⚡ Preparing today's Power Pulse...";

    }


    const options =
    document.getElementById("options");

    if (options) {

        options.innerHTML =
            `<div class="loading">
                Loading today's challenge...
             </div>`;

    }

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(value) {

    return String(value || "")

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


// ==========================================================
// REFRESH PERFORMERS
// ==========================================================

setInterval(
    loadPerformers,
    20000
);
