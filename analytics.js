// =================================
// NSPCL ANALYTICS DASHBOARD
// =================================



let data = JSON.parse(

localStorage.getItem("leaderboard")

)||[];





let totalUsers =

[...new Set(

data.map(x=>x.id)

)].length;




let totalAttempts=data.length;



let average=0;

let highest=0;



if(data.length>0){


average=

Math.round(

data.reduce(

(sum,x)=>sum+x.percentage,

0

)/data.length

);



highest=

Math.max(

...data.map(x=>x.percentage)

);


}





document.getElementById(
"totalUsers"
).innerHTML=totalUsers;



document.getElementById(
"totalAttempts"
).innerHTML=totalAttempts;



document.getElementById(
"averageScore"
).innerHTML=

average+"%";



document.getElementById(
"highestScore"
).innerHTML=

highest+"%";






// Category Analysis


let category={};



questions.forEach(q=>{


if(!category[q.category]){

category[q.category]=0;

}


category[q.category]++;


});



let output="";



for(let c in category){


output+=`

<p>

<strong>${c}</strong>

: ${category[c]} Questions

</p>


`;


}



document.getElementById(
"categoryStats"
).innerHTML=output;
