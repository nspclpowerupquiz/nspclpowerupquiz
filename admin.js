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
// ==========================================
// CHARTS
// ==========================================

let scoreChart = null;
let passChart = null;

function loadCharts(data){

    if(typeof Chart==="undefined"){
        return;
    }

    // Destroy old charts

    if(scoreChart){
        scoreChart.destroy();
    }

    if(passChart){
        passChart.destroy();
    }

    // Employee Names

    const labels = data.map(emp => emp.employeeName);

    const scores = data.map(emp => Number(emp.score));

    // Percentages

    const percentages = data.map(emp => {

        if(typeof emp.percentage==="string"){

            return parseFloat(emp.percentage);

        }

        return Number(emp.percentage)*100;

    });

    // ==========================
    // BAR CHART
    // ==========================

    scoreChart = new Chart(

        document.getElementById("scoreChart"),

        {

            type:"bar",

            data:{

                labels:labels,

                datasets:[{

                    label:"Quiz Score",

                    data:scores,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    legend:{
                        display:false
                    }

                },

                scales:{

                    y:{

                        beginAtZero:true,

                        max:20

                    }

                }

            }

        }

    );



    // ==========================
    // PASS / FAIL CHART
    // ==========================

    let pass=0;

    let fail=0;

    percentages.forEach(function(p){

        if(p>=60){

            pass++;

        }
        else{

            fail++;

        }

    });


    passChart = new Chart(

        document.getElementById("passChart"),

        {

            type:"doughnut",

            data:{

                labels:["Pass","Fail"],

                datasets:[{

                    data:[pass,fail]

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}



// ==========================================
// AUTO REFRESH
// ==========================================

setInterval(function(){

    loadDashboard();

},30000);



// ==========================================
// COUNTER ANIMATION
// ==========================================

function animateCounter(id,target){

    let count=0;

    let step=Math.max(1,Math.ceil(target/40));

    let interval=setInterval(function(){

        count+=step;

        if(count>=target){

            count=target;

            clearInterval(interval);

        }

        document.getElementById(id).innerHTML=count;

    },20);

}
