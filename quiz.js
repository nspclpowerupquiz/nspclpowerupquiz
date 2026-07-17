// ==========================
// VARIABLES
// ==========================

let questions = [];

let currentQuestion = 0;

let score = 0;

let timer;

let time = 5;

let employee = localStorage.getItem("employeeId");
let employeeName = localStorage.getItem("employeeName");


// Google Sheet Web App URL

const sheetURL = "https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec";




// ==========================
// LOGIN CHECK
// ==========================

if(employee == null){

    window.location.href = "login.html";

}



// ==========================
// SHOW EMPLOYEE NAME
// ==========================

window.onload = function(){

    let user = document.getElementById("welcomeUser");


    if(user){

        user.innerHTML = "Welcome <b>" + employee + "</b>";

    }

};





// ==========================
// LOAD QUESTIONS JSON
// ==========================

async function loadQuestions(){

    try{


        let response = await fetch("questions.json");


        if(!response.ok){

            throw new Error("questions.json not found");

        }



        questions = await response.json();



    }

    catch(error){


        alert("Unable to load questions.json");


        console.log(error);


    }


}








// ==========================
// START QUIZ
// ==========================

async function startQuiz(){


    await loadQuestions();



    if(questions.length == 0){


        alert("No questions available");


        return;


    }



    currentQuestion = 0;

    score = 0;



    document.getElementById("liveScore").innerHTML = score;



    document.querySelector(".quiz-intro").style.display="none";


    document.getElementById("quiz-area").style.display="block";



    loadQuestion();


}









// ==========================
// LOAD QUESTION
// ==========================

function loadQuestion(){


    clearInterval(timer);



    if(currentQuestion >= questions.length){


        showResult();


        return;


    }




    time = 5;


    document.getElementById("time").innerHTML=time;



    let q = questions[currentQuestion];



    document.getElementById("progress").innerHTML =

    (currentQuestion+1)+" / "+questions.length;



    document.getElementById("question").innerHTML =

    "Q"+(currentQuestion+1)+". "+q.question;



    let optionHTML = "";

    let letters = ["A","B","C","D"];



    q.options.forEach(function(option,index){



        optionHTML += `


        <button class="option"

        onclick="checkAnswer(this,'${option}')">


        <span class="option-letter">

        ${letters[index]}

        </span>


        ${option}


        </button>


        `;



    });



    document.getElementById("options").innerHTML = optionHTML;



    document.getElementById("nextBtn").disabled = true;



    startTimer();


}









// ==========================
// TIMER
// ==========================

function startTimer(){



    timer = setInterval(function(){



        time--;



        document.getElementById("time").innerHTML=time;



        if(time <= 0){



            clearInterval(timer);



            disableOptions();



            document.getElementById("nextBtn").disabled=false;



        }



    },1000);



}











// ==========================
// CHECK ANSWER
// ==========================

function checkAnswer(button,selectedAnswer){



    clearInterval(timer);



    let correctAnswer = questions[currentQuestion].answer;



    let buttons = document.querySelectorAll(".option");




    buttons.forEach(function(btn){



        btn.disabled = true;



        if(btn.innerText.includes(correctAnswer)){



            btn.style.background="#16a34a";

            btn.style.color="white";

        }



    });





    if(selectedAnswer === correctAnswer){



        score++;



        document.getElementById("liveScore").innerHTML=score;



        button.style.background="#16a34a";

        button.style.color="white";


    }

    else{


        button.style.background="#dc2626";

        button.style.color="white";


    }



    document.getElementById("nextBtn").disabled=false;



}












// ==========================
// DISABLE OPTIONS
// ==========================

function disableOptions(){



    let buttons=document.querySelectorAll(".option");


    let correctAnswer = questions[currentQuestion].answer;



    buttons.forEach(function(btn){



        btn.disabled=true;



        if(btn.innerText.includes(correctAnswer)){


            btn.style.background="#16a34a";

            btn.style.color="white";


        }


    });



}









// ==========================
// NEXT QUESTION
// ==========================

function nextQuestion(){


    currentQuestion++;


    loadQuestion();


}











// ==========================
// SEND RESULT TO GOOGLE SHEET
// ==========================

function submitScore(score,percentage){



    let data = {


        employee: employee,


        score: score,


        total: questions.length,


        percentage: percentage,


        date: new Date().toLocaleString()



    };




    fetch(sheetURL,{


        method:"POST",


        mode:"no-cors",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(data)



    })

    .then(()=>{


        console.log("Score submitted");


    })

    .catch(error=>{


        console.log("Sheet error:",error);


    });



}












// ==========================
// SHOW RESULT
// ==========================

function showResult(){


    clearInterval(timer);



    document.getElementById("quiz-area").style.display="none";



    let percentage = Math.round(

        (score/questions.length)*100

    );



    // Send score to Google Sheet

    submitScore(score,percentage);





    document.getElementById("result").innerHTML = `



    <div class="result-card">



    <h2>🎉 Congratulations ${employee}</h2>



    <h3>NSPCL Power-Up Quiz Completed</h3>



    <h1>${score} / ${questions.length}</h1>



    <h2>${percentage}%</h2>




    <button onclick="restartQuiz()">

    🔄 Play Again

    </button>



    </div>



    `;



    localStorage.setItem("score",score);



}









// ==========================
// RESTART QUIZ
// ==========================

function restartQuiz(){


    location.reload();


}
