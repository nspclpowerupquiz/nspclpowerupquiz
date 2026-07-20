// ======================================
// NSPCL POWER PULSE - LIVE DAILY CHALLENGE
// ======================================


// LOAD DAILY MOTIVATION FROM INTERNET

function loadMotivation(){

    fetch("https://zenquotes.io/api/random")
    .then(response => response.json())
    .then(data => {

        document.getElementById("dailyQuote").innerHTML =
        `
        <h3>✨ Daily Motivation</h3>
        <p>
        "${data[0].q}"
        </p>
        <strong>— ${data[0].a}</strong>
        `;

    })
    .catch(error=>{

        document.getElementById("dailyQuote").innerHTML =
        `
        <h3>✨ Daily Motivation</h3>
        <p>
        "Every day is a new opportunity to learn and improve."
        </p>
        <strong>— NSPCL Power Pulse</strong>
        `;

    });

}



// LOAD DAILY QUIZ QUESTION FROM INTERNET

function loadDailyQuestion(){

    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
    .then(response=>response.json())
    .then(data=>{


        let q=data.results[0];


        let question =
        q.question;


        let options=[
            ...q.incorrect_answers,
            q.correct_answer
        ];


        // shuffle options

        options.sort(()=>Math.random()-0.5);



        document.getElementById("dailyQuestion").innerHTML=
        `
        <h3>⚡ Today's Challenge</h3>

        <p>${question}</p>
        `;



        let html="";


        options.forEach(option=>{

            html +=
            `
            <button class="daily-option">
            ${option}
            </button>
            `;

        });


        document.getElementById("dailyOptions").innerHTML=html;



    })
    .catch(error=>{

        document.getElementById("dailyQuestion").innerHTML=
        "Unable to load today's question";

    });

}




// START

loadMotivation();

loadDailyQuestion();
