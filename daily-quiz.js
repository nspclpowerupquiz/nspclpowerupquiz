// =====================================
// NSPCL POWER PULSE
// DAILY QUIZ SYSTEM
// =====================================


// Employee Details

let employeeName = localStorage.getItem("employeeName") || "Employee";

document.getElementById("employeeName").innerHTML = employeeName;



// ================================
// DAILY QUESTIONS
// ================================


const dailyQuestions = [

{
question:
"Which fuel is mainly used in thermal power plants?",

options:[
"Coal",
"Wind",
"Solar",
"Hydrogen"
],

answer:"Coal"

},


{
question:
"NSPCL is a joint venture between NTPC and which company?",

options:[
"SAIL",
"BHEL",
"ONGC",
"Power Grid"
],

answer:"SAIL"

},


{
question:
"Which equipment converts mechanical energy into electrical energy?",

options:[
"Boiler",
"Generator",
"Transformer",
"Condenser"
],

answer:"Generator"

},


{
question:
"Which of these is a renewable source of energy?",

options:[
"Coal",
"Oil",
"Solar",
"Gas"
],

answer:"Solar"

},


{
question:
"Safety is the responsibility of?",

options:[
"Only Manager",
"Only Engineer",
"Every Employee",
"Only Supervisor"
],

answer:"Every Employee"

}


];





// Variables


let currentQuestion = 0;

let score = 0;

let points = 0;

let time = 300; // 5 minutes

let timer;






// ================================
// LOAD QUESTION
// ================================


function loadQuestion(){


let q = dailyQuestions[currentQuestion];


document.getElementById("question").innerHTML =

(currentQuestion+1)+". "+q.question;



let optionsHTML="";


q.options.forEach(function(option){


optionsHTML += `

<button onclick="checkAnswer(this,'${option}')">

${option}

</button>

`;


});



document.getElementById("options").innerHTML = optionsHTML;



}






// ================================
// CHECK ANSWER
// ================================


function checkAnswer(button,selected){


let correct = dailyQuestions[currentQuestion].answer;



if(selected === correct){


score++;


button.style.background="green";


}


else{


button.style.background="red";


}



// Disable buttons

let buttons=document.querySelectorAll("#options button");


buttons.forEach(btn=>{

btn.disabled=true;

});



}








// ================================
// NEXT QUESTION
// ================================


function nextQuestion(){



if(currentQuestion < dailyQuestions.length-1){


currentQuestion++;


loadQuestion();


}

else{


finishQuiz();


}



}








// ================================
// FINISH QUIZ
// ================================


function finishQuiz(){



clearInterval(timer);



points = score * 10;



document.getElementById("questionBox").innerHTML = `


<h2>
🎉 Challenge Completed!
</h2>


<h3>
Score:
${score}/${dailyQuestions.length}
</h3>


<h3>
⭐ Points Earned:
${points}
</h3>


<p>
Keep learning every day and continue your streak 🔥
</p>


`;



document.getElementById("nextBtn").style.display="none";



localStorage.setItem(
"dailyScore",
points
);



}








// ================================
// TIMER
// ================================


function startTimer(){


timer=setInterval(function(){


let minutes=Math.floor(time/60);

let seconds=time%60;



document.getElementById("timer").innerHTML=

`${minutes}:${seconds < 10 ? "0":""}${seconds}`;



time--;



if(time<0){


finishQuiz();


}


},1000);



}







// START

loadQuestion();

startTimer();
