const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



let results=[];



window.onload=function(){

loadAdmin();

document
.getElementById("search")
.addEventListener(
"keyup",
searchData
);

};





function loadAdmin(){


fetch(
SCRIPT_URL+"?action=leaderboard"
)

.then(res=>res.json())

.then(data=>{


console.log(data);


results=data;


updateCards(data);


showTable(data);



})

.catch(err=>{

console.log(err);

});


}






function updateCards(data){


document.getElementById("participants")
.innerHTML=data.length;


document.getElementById("attempts")
.innerHTML=data.length;



let high=0;


data.forEach(x=>{


if(Number(x.score)>high)

high=x.score;


});


document.getElementById("highest")
.innerHTML=high;



document.getElementById("certificates")
.innerHTML=data.length;



}





function showTable(data){


let table=
document.getElementById("resultTable");


table.innerHTML="";



data.forEach((x,i)=>{


table.innerHTML+=`


<tr>

<td>${i+1}</td>

<td>${x.employeeId}</td>

<td>${x.employeeName}</td>

<td>${x.score}</td>

<td>${x.totalQuestions}</td>

<td>${Math.round(Number(x.percentage)*100)}%</td>

<td>${new Date(x.dateTime).toLocaleDateString()}</td>


</tr>


`;


});


}






function searchData(){


let value=
document
.getElementById("search")
.value
.toLowerCase();



let filtered=
results.filter(x=>{


return (

String(x.employeeId)
.includes(value)

||

x.employeeName
.toLowerCase()
.includes(value)


);


});



showTable(filtered);



}
