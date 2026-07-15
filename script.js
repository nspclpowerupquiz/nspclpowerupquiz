// =================================
// NSPCL POWER-UP QUIZ
// Professional Quiz Engine
// =================================


// ===============================
// User Details
// ===============================

let userName="";
let employeeId="";



// ===============================
// Quiz Variables
// ===============================


let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);


let totalTime = 600;

let timer;



// ===============================
// Elements
// ===============================


const startBtn = document.getElementById("startBtn");

const startQuiz = document.getElementById("startQuiz");


const landing = document.getElementById("landing");

const quizContainer = document.getElementById("quizContainer");

const resultContainer = document.getElementById("resultContainer");


const questionText = document.getElementById("questionText");

const optionsContainer = document.getElementById("options");


const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const submitBtn = document.getElementById("submitBtn");


const progressBar = document.getElementById("progressBar");


const timerDisplay = document.getElementById("timer");


const scoreText = document.getElementById("score");



const userNameInput = document.getElementById("userName");

const employeeInput = document.getElementById("employeeId");



// ===============================
// Sounds
// ===============================


const correctSound = new Audio("sounds/correct.mp3");

const wrongSound = new Audio("sounds/wrong.mp3");

const finishSound = new Audio("sounds/finish.mp3");




// ===============================
// Start Quiz
// ===============================


function startQuizGame(){


    userName=userNameInput.value || "Guest";

    employeeId=employeeInput.value || "NA";


    localStorage.setItem("NSPCL_User",userName);

    localStorage.setItem("NSPCL_ID",employeeId);



    if(landing){

        landing.classList.add("hidden");

    }


    if(quizContainer){

        quizContainer.classList.remove("hidden");

    }


    loadQuestion();

    startTimer();


}





if(startBtn){

startBtn.addEventListener("click",startQuizGame);

}


if(startQuiz){

startQuiz.addEventListener("click",startQuizGame);

}




// ===============================
// Load Question
// ===============================


function loadQuestion(){


    let q=questions[currentQuestion];


    questionText.innerHTML=

    `
    <span>
    Question ${currentQuestion+1}/${questions.length}
    </span>
    <br>
    ${q.question}
    `;



    optionsContainer.innerHTML="";



    q.options.forEach(option=>{


        let button=document.createElement("button");


        button.className="option";


        button.innerHTML=option;



        if(userAnswers[currentQuestion]===option){

            button.classList.add("selected");

        }



        button.onclick=()=>{


            userAnswers[currentQuestion]=option;


            saveProgress();


            loadQuestion();


        };


        optionsContainer.appendChild(button);



    });



    updateProgress();


}





// ===============================
// Progress
// ===============================


function updateProgress(){


    let percent=

    ((currentQuestion+1)/questions.length)*100;


    if(progressBar){

    progressBar.style.width=

    percent+"%";

    }


}





// ===============================
// Navigation
// ===============================


if(nextBtn){

nextBtn.onclick=()=>{


if(currentQuestion<questions.length-1){

currentQuestion++;

loadQuestion();

}


};

}




if(prevBtn){

prevBtn.onclick=()=>{


if(currentQuestion>0){

currentQuestion--;

loadQuestion();

}


};

}





// ===============================
// Submit
// ===============================


if(submitBtn){

submitBtn.onclick=showResult;

}





// ===============================
// Result
// ===============================


function showResult(){


clearInterval(timer);



let score=0;


questions.forEach((q,i)=>{


if(userAnswers[i]===q.answer){

score++;

}

});



let percentage=

Math.round((score/questions.length)*100);



saveLeaderboard(score,percentage);



quizContainer.classList.add("hidden");


resultContainer.classList.remove("hidden");



scoreText.innerHTML=

`

<h2>${score}/${questions.length}</h2>

<h3>${percentage}%</h3>

<p>

${percentage>=80?

"🏆 Excellent Performance":

percentage>=60?

"😊 Good Job":

"📚 Keep Practicing"}

</p>

`;



finishSound.play();



showConfetti();
setTimeout(()=>{

window.location.href="certificate.html";

},3000);


}




// ===============================
// Timer
// ===============================


function startTimer(){


totalTime=600;


timer=setInterval(()=>{


totalTime--;


let min=Math.floor(totalTime/60);

let sec=totalTime%60;


if(sec<10)sec="0"+sec;


timerDisplay.innerHTML=

min+":"+sec;



if(totalTime<=0){

clearInterval(timer);

showResult();

}



},1000);


}





// ===============================
// Auto Save
// ===============================


function saveProgress(){


localStorage.setItem(

"NSPCL_progress",

JSON.stringify(userAnswers)

);


}





// ===============================
// Leaderboard
// ===============================


function saveLeaderboard(score,percentage){


let data=

JSON.parse(

localStorage.getItem("leaderboard")

)||[];



data.push({

name:userName,

id:employeeId,

score:score,

percentage:percentage,

date:new Date().toLocaleDateString()

});



localStorage.setItem(

"leaderboard",

JSON.stringify(data)

);


}





// ===============================
// Confetti
// ===============================


function showConfetti(){


if(typeof confetti==="function"){


confetti({

particleCount:150,

spread:100

});


}


}





// ===============================
// Restart
// ===============================


function restartQuiz(){


currentQuestion=0;


userAnswers=

new Array(questions.length).fill(null);



resultContainer.classList.add("hidden");


landing.classList.remove("hidden");


progressBar.style.width="0%";


}
// ===============================
// GALLERY IMAGE POPUP
// ===============================


let galleryImages =
document.querySelectorAll(".gallery-card img");


let popup =
document.getElementById("imagePopup");


let popupImage =
document.getElementById("popupImage");


let closePopup =
document.getElementById("closePopup");



galleryImages.forEach(image=>{


image.onclick=function(){


popup.style.display="flex";


popupImage.src=this.src;


}


});



closePopup.onclick=function(){


popup.style.display="none";


}



popup.onclick=function(e){


if(e.target===popup){

popup.style.display="none";

}


}




