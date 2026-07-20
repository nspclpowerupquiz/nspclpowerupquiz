// ==========================================
// NSPCL POWER-UP QUIZ
// ADMIN DASHBOARD
// ==========================================


// GOOGLE APPS SCRIPT URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



let employeeData=[];



// ==========================================
// PAGE LOAD
// ==========================================

window.onload=function(){

    loadDashboard();

    document
    .getElementById("search")
    .addEventListener(
        "keyup",
        searchEmployee
    );

};




// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard(){

try{

    // Leaderboard Data

    const response=
    await fetch(
        SCRIPT_URL+"?action=leaderboard"
    );

    const data=
    await response.json();

    employeeData=data;

    updateCards(data);

    loadTable(data);

    loadCharts(data);

}
catch(error){

    console.log(error);

    document.getElementById("resultTable").innerHTML=`

    <tr>

        <td colspan="7">

        Unable to load data

        </td>

    </tr>

    `;

}

}





// ==========================================
// DASHBOARD CARDS
// ==========================================

function updateCards(data){

document.getElementById("participants").innerHTML=data.length;

document.getElementById("attempts").innerHTML=data.length;

document.getElementById("certificates").innerHTML=data.length;


let highest=0;

data.forEach(function(emp){

    if(Number(emp.score)>highest){

        highest=Number(emp.score);

    }

});

document.getElementById("highest").innerHTML=highest;

}





// ==========================================
// EMPLOYEE TABLE
// ==========================================

function loadTable(data){

const table=
document.getElementById("resultTable");

table.innerHTML="";


if(data.length===0){

table.innerHTML=`

<tr>

<td colspan="7">

No Records Found

</td>

</tr>

`;

return;

}


data.forEach(function(emp,index){

let percentage=emp.percentage;

// Handle both "75%" and 0.75 formats
if(typeof percentage==="string"){

    percentage=percentage;

}
else{

    percentage=Math.round(Number(percentage)*100)+"%";

}


table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${emp.employeeId}</td>

<td>${emp.employeeName}</td>

<td>${emp.score}</td>

<td>${emp.totalQuestions}</td>

<td>${percentage}</td>

<td>

${new Date(emp.dateTime).toLocaleDateString("en-IN")}

</td>

</tr>

`;

});


}





// ==========================================
// SEARCH
// ==========================================

function searchEmployee(){

const value=

document

.getElementById("search")

.value

.toLowerCase();



const filtered=

employeeData.filter(function(emp){

return(

String(emp.employeeId)

.includes(value)

||

emp.employeeName

.toLowerCase()

.includes(value)

);

});



loadTable(filtered);

}
