// =================================
// NSPCL ANALYTICS DASHBOARD
// =================================


// GOOGLE APPS SCRIPT URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/execc";




// =================================
// LOAD ANALYTICS
// =================================

window.onload=function(){


fetch(
SCRIPT_URL+"?action=leaderboard"
)


.then(response=>response.json())


.then(data=>{


console.log(
"Analytics Data:",
data
);



// SORT DATA

data.sort(
(a,b)=>Number(b.score)-Number(a.score)
);




// TOTAL USERS

let totalUsers =
[...new Set(

data.map(
x=>x.employeeId
)

)].length;





// TOTAL ATTEMPTS

let totalAttempts =
data.length;






// AVERAGE SCORE

let average=0;

let highest=0;



if(data.length>0){



average=Math.round(

data.reduce(

(sum,x)=>

sum+Number(x.percentage),

0

)

/

data.length

);




highest=Math.max(

...data.map(

x=>Number(x.percentage)

)

);



}






// DISPLAY DATA

let users =
document.getElementById(
"totalUsers"
);


if(users){

users.innerHTML=
totalUsers;

}





let attempts =
document.getElementById(
"totalAttempts"
);


if(attempts){

attempts.innerHTML=
totalAttempts;

}





let avg =
document.getElementById(
"averageScore"
);


if(avg){

avg.innerHTML=
average+"%";

}





let high =
document.getElementById(
"highestScore"
);


if(high){

high.innerHTML=
highest+"%";

}







// CATEGORY

loadCategory();



})



.catch(error=>{


console.log(
"Analytics Error:",
error
);


});



};









// =================================
// CATEGORY ANALYSIS
// =================================

function loadCategory(){



if(typeof questions==="undefined"){


let box =
document.getElementById(
"categoryStats"
);


if(box){

box.innerHTML=
"No question data found";

}


return;


}





let category={};



questions.forEach(q=>{


if(!category[q.category]){


category[q.category]=0;


}



category[q.category]++;



});





let output="";





for(let c in category){



output +=`


<p>

<strong>
${c}
</strong>

:
${category[c]}
Questions


</p>


`;



}





let categoryBox =
document.getElementById(
"categoryStats"
);



if(categoryBox){


categoryBox.innerHTML=
output;


}



}
