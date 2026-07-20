// =====================================
// NSPCL POWER PULSE
// DAILY QUIZ SYSTEM V2
// =====================================


// Employee Details

let employeeName =
localStorage.getItem("employeeName") || "Employee";


document.getElementById("employeeName").innerHTML =
employeeName;



// ================================
// DAILY QUESTIONS
// ================================

const dailyQuestions = [

{
question:"Which fuel is mainly used in thermal power plants?",
options:["Coal","Wind","Solar","Hydrogen"],
answer:"Coal"
},


{
question:"NSPCL is a joint venture between NTPC and which company?",
options:["SAIL","BHEL","ONGC","Power Grid"],
answer:"SAIL"
},


{
question:"Which equipment converts mechanical energy into electrical energy?",
options:["Boiler","Generator","Transformer","Condenser"],
answer:"Generator"
},


{
question:"Which of these is a renewable source of energy?",
options:["Coal","Oil","Solar","Gas"],
answer:"Solar"
},


{
question:"Safety is the responsibility of?",
options:[
"Only Manager",
"Only Engineer",
"Every Employee",
"Only Supervisor"
],
answer:"Every Employee"
}

];





let currentQuestion = 0;

let score = 0;

let points = 0;

let answered = false;







// ================================
// LOAD QUESTION
// ================================


function loadQuestion(){


answered=false;


let q=dailyQuestions[currentQuestion];



document.getElementById("question").innerHTML =

(currentQuestion+1)+". "+q.question;



document.getElementById("questionNumber").innerHTML =
currentQuestion+1;



document.getElementById("totalQuestions").innerHTML =
dailyQuestions.length;



let html="";



q.options.forEach(option=>{


html += `

<button onclick="checkAnswer(this,'${option}')">

${option}

</button>

`;

});


document.getElementById("options").innerHTML=html;



updateProgress();


}







// ================================
// CHECK ANSWER
// ================================


function checkAnswer(button,selected){


if(answered)
return;


answered=true;



let correct =
dailyQuestions[currentQuestion].answer;



let buttons =
document.querySelectorAll("#options button");



buttons.forEach(btn=>{

btn.disabled=true;

});



if(selected===correct){


score++;


points=score*10;


button.style.background="#00c853";


}

else{


button.style.background="#ff5252";


}



document.getElementById("points").innerHTML =
points;



}








// ================================
// NEXT QUESTION
// ================================


function nextQuestion(){


if(!answered){

alert("Please select an answer");

return;

}



if(currentQuestion < dailyQuestions.length-1){


currentQuestion++;


loadQuestion();


}

else{


finishQuiz();


}


}









// ================================
// PROGRESS
// ================================


function updateProgress(){


let percent =
((currentQuestion)/
dailyQuestions.length)*100;



let bar=document.getElementById("progress");


if(bar){

bar.style.width=
percent+"%";

}


}









// ================================
// FINISH QUIZ
// ================================


function finishQuiz(){



let percentage =
(score/dailyQuestions.length)*100;



localStorage.setItem(
"dailyScore",
points
);



document.querySelector(".quiz-container").innerHTML =


`

<div class="completion-card">


<h1>
🎉 Daily Mission Completed
</h1>


<h2>
${employeeName}
</h2>


<h3>
Score:
${score}/${dailyQuestions.length}
</h3>


<h3>
⭐ Points:
${points}
</h3>


<p>

Performance:
${percentage}%

</p>



<button class="mission-btn"
onclick="location.href='daily.html'">

Back To Daily Challenge

</button>


</div>

`;



}








// ================================
// TIMER
// ================================


let time=300;


function startTimer(){


let timer=setInterval(()=>{


let min=Math.floor(time/60);


let sec=time%60;



let timerBox=
document.getElementById("timer");



if(timerBox){

timerBox.innerHTML=

`${min}:${sec<10?"0":""}${sec}`;

}



time--;



if(time<0){


clearInterval(timer);


finishQuiz();


}



},1000);


}








// START

loadQuestion();

startTimer();
