// ======================================================
// NSPCL POWER PULSE
// DAILY CURRENT AFFAIRS QUIZ
// VERSION 3
// ======================================================


// ======================================================
// GOOGLE APPS SCRIPT
// ======================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ======================================================
// EMPLOYEE DETAILS
// ======================================================

const employeeName =
    localStorage.getItem("employeeName") || "Employee";

const employeeId =
    localStorage.getItem("employeeId") || "Unknown";


const nameElement =
    document.getElementById("employeeName");

if (nameElement) {
    nameElement.innerHTML = employeeName;
}


const idElement =
    document.getElementById("employeeId");

if (idElement) {
    idElement.innerHTML = employeeId;
}


// ======================================================
// VARIABLES
// ======================================================

let dailyQuestion = null;

let selectedAnswer = null;

let answered = false;

let submitted = false;

let time = 300;

let timer;


// ======================================================
// TODAY'S DATE
// ======================================================

function getToday() {

    const now = new Date();

    const year = now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


const today = getToday();


// ======================================================
// DISPLAY DATE
// ======================================================

function displayTodayDate() {

    const dateElement =
        document.getElementById("todayDate");

    if (!dateElement) return;

    const date = new Date();

    dateElement.innerHTML =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


// ======================================================
// DAILY MOTIVATION FALLBACK
// ======================================================

const motivations = [

    "Every day is a new opportunity to learn and improve.",

    "Small improvements every day lead to great achievements.",

    "Knowledge grows when it is shared.",

    "Learn something new today and become better tomorrow.",

    "Continuous learning is the foundation of excellence.",

    "Challenge yourself today. Excellence follows.",

    "Curiosity is the beginning of every great learning journey.",

    "Knowledge gives you the power to make better decisions.",

    "Learn • Compete • Grow.",

    "A better tomorrow starts with learning today.",

    "Every question is an opportunity to discover something new.",

    "Stay curious. Stay informed. Keep learning."

];


// ======================================================
// LOAD MOTIVATION
// ======================================================

function loadMotivation() {

    const element =
        document.getElementById("motivation");

    if (!element) return;


    /*
       Select motivation based on the day.

       It changes automatically every day.
    */

    const dateNumber =
        Math.floor(
            new Date().getTime() /
            (1000 * 60 * 60 * 24)
        );


    const index =
        dateNumber % motivations.length;


    element.innerHTML =
        `"${motivations[index]}"`;

}


// ======================================================
// LOAD DAILY QUESTION
// ======================================================

async function loadDailyQuestion() {

    const questionElement =
        document.getElementById("question");


    if (questionElement) {

        questionElement.innerHTML =
            "⏳ Loading today's current-affairs question...";

    }


    try {

        /*
          The Google Apps Script will provide:

          question
          options
          answer
          explanation
          category
          date
        */

        const response =
            await fetch(
                SCRIPT_URL +
                "?action=dailyQuiz&date=" +
                encodeURIComponent(today)
            );


        if (!response.ok) {

            throw new Error(
                "Unable to connect to quiz server"
            );

        }


        const data =
            await response.json();


        console.log(
            "Daily Quiz Data:",
            data
        );


        if (
            !data ||
            data.status !== "success"
        ) {

            throw new Error(
                "Daily question unavailable"
            );

        }


        dailyQuestion = data.question;


        showQuestion();


    }

    catch(error) {

        console.error(
            "Daily Quiz Error:",
            error
        );


        /*
          Temporary fallback question.
          This prevents the page from appearing blank
          if the Apps Script is temporarily unavailable.
        */

        dailyQuestion = {

            question:
                "Which organization is India's largest power generation utility?",

            options: [

                "NTPC Limited",

                "SAIL",

                "BHEL",

                "Power Grid Corporation"

            ],

            answer:
                "NTPC Limited",

            explanation:
                "NTPC Limited is India's largest power generation utility.",

            category:
                "Power Sector"

        };


        showQuestion();

    }

}


// ======================================================
// DISPLAY QUESTION
// ======================================================

function showQuestion() {

    if (!dailyQuestion) return;


    const questionElement =
        document.getElementById("question");


    if (questionElement) {

        questionElement.innerHTML =
            dailyQuestion.question;

    }


    const category =
        document.getElementById("category");


    if (category) {

        category.innerHTML =
            dailyQuestion.category ||
            "Current Affairs";

    }


    const optionsElement =
        document.getElementById("options");


    if (!optionsElement) return;


    let html = "";


    dailyQuestion.options.forEach(
        function(option, index) {


            const letter =
                ["A", "B", "C", "D"][index];


            html += `

                <button
                    class="option"
                    onclick="selectAnswer(this, '${escapeHTML(option)}')">

                    <strong>${letter}</strong>

                    &nbsp;

                    ${option}

                </button>

            `;

        }
    );


    optionsElement.innerHTML = html;


    const submitButton =
        document.getElementById("submitBtn");


    if (submitButton) {

        submitButton.disabled = true;

    }


    startTimer();

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ======================================================
// SELECT ANSWER
// ======================================================

function selectAnswer(button, answer) {

    if (answered) return;


    selectedAnswer = answer;


    const buttons =
        document.querySelectorAll(
            "#options .option"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    const submitButton =
        document.getElementById("submitBtn");


    if (submitButton) {

        submitButton.disabled = false;

    }

}


// ======================================================
// SUBMIT ANSWER
// ======================================================

async function submitAnswer() {

    if (answered) return;


    if (!selectedAnswer) {

        alert(
            "Please select an answer first."
        );

        return;

    }


    answered = true;

    clearInterval(timer);


    const correctAnswer =
        dailyQuestion.answer;


    const isCorrect =
        selectedAnswer.trim() ===
        correctAnswer.trim();


    const buttons =
        document.querySelectorAll(
            "#options .option"
        );


    buttons.forEach(
        function(button) {

            button.disabled = true;


            const text =
                button.innerText
                    .replace(/^[A-D]\s*/i, "")
                    .trim();


            if (
                text ===
                correctAnswer.trim()
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                text ===
                selectedAnswer.trim() &&
                !isCorrect
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    const submitButton =
        document.getElementById("submitBtn");


    if (submitButton) {

        submitButton.disabled = true;

    }


    // ==========================================
    // RESULT
    // ==========================================

    const result =
        document.getElementById("result");


    const explanation =
        document.getElementById(
            "explanation"
        );


    if (isCorrect) {

        if (result) {

            result.innerHTML = `

                <div class="result-success">

                    🎉 <strong>Correct Answer!</strong>

                    <br><br>

                    ⚡ You earned
                    <strong>10 Power Points</strong>.

                </div>

            `;

        }


        if (explanation) {

            explanation.style.display =
                "block";

            explanation.innerHTML =

                "<strong>💡 Explanation:</strong><br>" +

                (
                    dailyQuestion.explanation ||
                    "Well done! Keep learning."
                );

        }


        await recordCorrectAnswer();


        loadPowerPerformers();

    }

    else {

        if (result) {

            result.innerHTML = `

                <div class="result-wrong">

                    ❌ <strong>Incorrect Answer</strong>

                    <br><br>

                    Correct Answer:
                    <strong>
                        ${correctAnswer}
                    </strong>

                </div>

            `;

        }


        if (explanation) {

            explanation.style.display =
                "block";

            explanation.innerHTML =

                "<strong>💡 Explanation:</strong><br>" +

                (
                    dailyQuestion.explanation ||
                    "Keep learning and try again tomorrow!"
                );

        }


        /*
           We still record the attempt,
           but no points are awarded.
        */

        await recordAttempt(false);


        loadPowerPerformers();

    }

}


// ======================================================
// RECORD CORRECT ANSWER
// ======================================================

async function recordCorrectAnswer() {

    if (submitted) return;


    submitted = true;


    try {

        await fetch(
            SCRIPT_URL +
            "?action=submitDailyQuiz",

            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    employeeId:
                        employeeId,

                    employeeName:
                        employeeName,

                    date:
                        today,

                    question:
                        dailyQuestion.question,

                    answer:
                        selectedAnswer,

                    correct:
                        true,

                    points:
                        10,

                    dateTime:
                        new Date().toISOString()

                })

            }
        );


        localStorage.setItem(
            "dailyLastDate",
            today
        );


    }

    catch(error) {

        console.error(
            "Score submission error:",
            error
        );

    }

}


// ======================================================
// RECORD INCORRECT ANSWER
// ======================================================

async function recordAttempt(correct) {

    if (submitted) return;


    submitted = true;


    try {

        await fetch(
            SCRIPT_URL +
            "?action=submitDailyQuiz",

            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    employeeId:
                        employeeId,

                    employeeName:
                        employeeName,

                    date:
                        today,

                    question:
                        dailyQuestion.question,

                    answer:
                        selectedAnswer,

                    correct:
                        false,

                    points:
                        0,

                    dateTime:
                        new Date().toISOString()

                })

            }

        );

    }

    catch(error) {

        console.error(
            "Attempt submission error:",
            error
        );

    }

}


// ======================================================
// POWER PERFORMERS
// ======================================================

async function loadPowerPerformers() {

    const performers =
        document.getElementById(
            "performers"
        );


    const count =
        document.getElementById(
            "performerCount"
        );


    if (!performers) return;


    performers.innerHTML =
        "⏳ Loading today's Power Performers...";


    try {

        const response =
            await fetch(

                SCRIPT_URL +
                "?action=dailyPerformers&date=" +
                encodeURIComponent(today)

            );


        const data =
            await response.json();


        console.log(
            "Power Performers:",
            data
        );


        if (
            !data ||
            data.status !== "success"
        ) {

            throw new Error(
                "Performers unavailable"
            );

        }


        const list =
            data.performers || [];


        if (count) {

            count.innerHTML =

                list.length +

                " employee" +

                (list.length === 1
                    ? ""
                    : "s") +

                " answered correctly today.";

        }


        if (list.length === 0) {

            performers.innerHTML = `

                <div class="performer">

                    🏆

                    <span class="performer-name">

                        Be the first Power Performer today!

                    </span>

                </div>

            `;

            return;

        }


        performers.innerHTML = "";


        list.forEach(
            function(person, index) {

                const medals =
                    ["🥇", "🥈", "🥉"];


                const medal =
                    medals[index] ||
                    "⚡";


                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "performer";


                div.innerHTML = `

                    <span
                        class="performer-medal">

                        ${medal}

                    </span>

                    <span
                        class="performer-name">

                        ${person.employeeName}

                    </span>

                `;


                performers.appendChild(
                    div
                );

            }
        );


    }

    catch(error) {

        console.error(
            "Performer Error:",
            error
        );


        performers.innerHTML = `

            <div class="performer">

                ⚡

                <span class="performer-name">

                    Power Performers will appear
                    after the first correct answer.

                </span>

            </div>

        `;

    }

}


// ======================================================
// TIMER
// ======================================================

function startTimer() {

    clearInterval(timer);


    time = 300;


    updateTimer();


    timer =
        setInterval(
            function() {

                time--;


                updateTimer();


                if (time <= 0) {

                    clearInterval(timer);


                    if (!answered) {

                        timeUp();

                    }

                }

            },

            1000

        );

}


// ======================================================
// UPDATE TIMER
// ======================================================

function updateTimer() {

    const timerElement =
        document.getElementById(
            "timer"
        );


    if (!timerElement) return;


    const minutes =
        Math.floor(time / 60);


    const seconds =
        time % 60;


    timerElement.innerHTML =

        `${minutes}:` +

        `${seconds < 10 ? "0" : ""}` +

        `${seconds}`;

}


// ======================================================
// TIME UP
// ======================================================

function timeUp() {

    answered = true;


    const buttons =
        document.querySelectorAll(
            "#options .option"
        );


    buttons.forEach(
        function(button) {

            button.disabled = true;


            const text =
                button.innerText
                    .replace(/^[A-D]\s*/i, "")
                    .trim();


            if (
                text ===
                dailyQuestion.answer.trim()
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const result =
        document.getElementById(
            "result"
        );


    if (result) {

        result.innerHTML = `

            <div class="result-wrong">

                ⏰ <strong>Time's Up!</strong>

                <br><br>

                Correct Answer:
                <strong>
                    ${dailyQuestion.answer}
                </strong>

            </div>

        `;

    }


    const explanation =
        document.getElementById(
            "explanation"
        );


    if (explanation) {

        explanation.style.display =
            "block";

        explanation.innerHTML =

            "<strong>💡 Explanation:</strong><br>" +

            (
                dailyQuestion.explanation ||
                "Keep learning and come back tomorrow!"
            );

    }


    recordAttempt(false);

}


// ======================================================
// INITIALISE PAGE
// ======================================================

async function initialiseDailyQuiz() {

    displayTodayDate();

    loadMotivation();

    await loadDailyQuestion();

    loadPowerPerformers();

}


// ======================================================
// START
// ======================================================

initialiseDailyQuiz();
