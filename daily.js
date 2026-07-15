// =================================
// NSPCL DAILY CHALLENGE
// =================================



let dailyQuestions = questions;



let today = new Date().toDateString();



let savedDay = localStorage.getItem(
"dailyDate"
);



let index;



if(savedDay === today){


index = localStorage.getItem(
"dailyQuestion"
);


}

else{


index = Math.floor(

Math.random()*dailyQuestions.length

);



localStorage.setItem(
"dailyDate",
today
);



localStorage.setItem(
"dailyQuestion",
index
);



}




let q=dailyQuestions[index];



document.getElementById(
"dailyQuestion"
).innerHTML=

`

<h2>${q.question}</h2>

`;



let container=

document.getElementById(
"dailyOptions"
);



q.options.forEach(option=>{


let btn=document.createElement(
"button"
);


btn.innerHTML=option;


btn.onclick=()=>{


if(option===q.answer){


document.getElementById(
"dailyResult"
).innerHTML=

"🏆 Correct! Badge earned";


updateBadge();


}

else{


document.getElementById(
"dailyResult"
).innerHTML=

"📚 Keep Learning!";


}


};



container.appendChild(btn);



});






function updateBadge(){


let streak=

Number(

localStorage.getItem(
"streak"
)

)||0;



streak++;



localStorage.setItem(
"streak",
streak
);



if(streak>=10){


localStorage.setItem(
"badge",
"🥇 Gold Champion"
);


}

else if(streak>=5){


localStorage.setItem(
"badge",
"🥈 Silver Champion"
);


}

else{


localStorage.setItem(
"badge",
"🥉 Bronze Learner"
);


}



}
