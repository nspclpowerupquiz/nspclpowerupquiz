// =============================================
// NSPCL POWER-UP QUIZ
// ADMIN DASHBOARD
// =============================================


// =============================================
// GOOGLE APPS SCRIPT URL
// =============================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



// =============================================
// GLOBAL VARIABLES
// =============================================

let leaderboard = [];

let scoreChart = null;

let passChart = null;

let refreshTimer = null;



// =============================================
// PAGE LOAD
// =============================================

window.onload = function () {

    initialiseDashboard();

};



// =============================================
// INITIALISE
// =============================================

async function initialiseDashboard(){

    await loadDashboard();

    initialiseSearch();

    startAutoRefresh();

}



// =============================================
// LOAD DASHBOARD
// =============================================

async function loadDashboard(){

    try{

        showLoading();

        const response =
        await fetch(
            SCRIPT_URL +
            "?action=leaderboard"
        );

        leaderboard =
        await response.json();

        console.log(leaderboard);

        hideLoading();

        updateDashboard();

    }

    catch(error){

        hideLoading();

        console.error(error);

        alert("Unable to load dashboard.");

    }

}



// =============================================
// UPDATE EVERYTHING
// =============================================

function updateDashboard(){

    updateCards();

    populateTable();

    loadCharts();

    loadTopPerformers();

    loadRecentActivity();

    updateLastRefresh();

}



// =============================================
// KPI CARDS
// =============================================

function updateCards(){

    const participants =
    leaderboard.length;

    const attempts =
    leaderboard.length;

    let highest = 0;

    let certificates = 0;



    leaderboard.forEach(function(item){

        highest =
        Math.max(
            highest,
            Number(item.score)
        );

        certificates++;

    });



    animateCounter(
        "participants",
        participants
    );

    animateCounter(
        "attempts",
        attempts
    );

    animateCounter(
        "highest",
        highest
    );

    animateCounter(
        "certificates",
        certificates
    );

}



// =============================================
// COUNTER ANIMATION
// =============================================

function animateCounter(id,target){

    const element =
    document.getElementById(id);

    if(!element) return;

    let value = 0;

    const step =
    Math.max(
        1,
        Math.ceil(target/40)
    );

    const timer =
    setInterval(function(){

        value += step;

        if(value>=target){

            value=target;

            clearInterval(timer);

        }

        element.textContent=value;

    },25);

}



// =============================================
// LOADING
// =============================================

function showLoading(){

    const loader =
    document.getElementById("loadingOverlay");

    if(loader){

        loader.style.display="flex";

    }

}



function hideLoading(){

    const loader =
    document.getElementById("loadingOverlay");

    if(loader){

        loader.style.display="none";

    }

}



// =============================================
// LAST REFRESH
// =============================================

function updateLastRefresh(){

    const live =
    document.getElementById("liveClock");

    if(live){

        live.innerHTML =
        new Date().toLocaleString("en-IN");

    }

}



// =============================================
// AUTO REFRESH
// =============================================

function startAutoRefresh(){

    refreshTimer =
    setInterval(function(){

        loadDashboard();

    },30000);

}
// =============================================
// POPULATE EMPLOYEE TABLE
// =============================================

function populateTable(){

    const tbody =
    document.getElementById("resultTable");

    if(!tbody) return;

    tbody.innerHTML="";

    if(leaderboard.length===0){

        tbody.innerHTML=`

        <tr>

            <td colspan="7">

                No Data Available

            </td>

        </tr>

        `;

        return;

    }


    leaderboard.forEach(function(item,index){

        let rank=item.rank || index+1;

        let rankBadge=rank;


        if(rank==1){

            rankBadge=
            '<span class="goldRank">🥇 1</span>';

        }

        else if(rank==2){

            rankBadge=
            '<span class="silverRank">🥈 2</span>';

        }

        else if(rank==3){

            rankBadge=
            '<span class="bronzeRank">🥉 3</span>';

        }



        let percentage=
        Number(
        String(item.percentage)
        .replace("%","")
        );



        let percentBadge="lowScore";


        if(percentage>=75){

            percentBadge="highScore";

        }

        else if(percentage>=60){

            percentBadge="mediumScore";

        }



        let date=
        new Date(item.dateTime)
        .toLocaleDateString(
            "en-IN",
            {

                day:"2-digit",

                month:"short",

                year:"numeric"

            }

        );



        tbody.innerHTML+=`

        <tr>

            <td>${rankBadge}</td>

            <td>${item.employeeId}</td>

            <td>${item.employeeName}</td>

            <td>${item.score}</td>

            <td>${item.totalQuestions}</td>

            <td>

                <span class="${percentBadge}">

                    ${percentage}%

                </span>

            </td>

            <td>${date}</td>

        </tr>

        `;

    });


    updateRecordCount();

}



// =============================================
// RECORD COUNT
// =============================================

function updateRecordCount(){

    const record=
    document.getElementById("recordCount");

    if(record){

        record.innerHTML=

        "📋 Total Records : "

        +leaderboard.length;

    }

}



// =============================================
// LIVE SEARCH
// =============================================

function initialiseSearch(){

    const search=
    document.getElementById("search");

    if(!search) return;

    search.addEventListener(

        "keyup",

        searchEmployee

    );

}



function searchEmployee(){

    const keyword=

    document

    .getElementById("search")

    .value

    .toLowerCase()

    .trim();



    const rows=

    document.querySelectorAll(

        "#resultTable tr"

    );



    rows.forEach(function(row){

        const text=

        row.innerText.toLowerCase();



        if(text.includes(keyword)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}



// =============================================
// SORT BY SCORE
// =============================================

function sortByScore(){

    leaderboard.sort(function(a,b){

        return Number(b.score)

        -

        Number(a.score);

    });


    leaderboard.forEach(function(item,index){

        item.rank=index+1;

    });


    populateTable();

}



// =============================================
// SORT BY NAME
// =============================================

function sortByName(){

    leaderboard.sort(function(a,b){

        return a.employeeName.localeCompare(

            b.employeeName

        );

    });

    populateTable();

}



// =============================================
// SORT BY EMPLOYEE ID
// =============================================

function sortByEmployeeId(){

    leaderboard.sort(function(a,b){

        return Number(a.employeeId)

        -

        Number(b.employeeId);

    });

    populateTable();

}
// =============================================
// LOAD ALL CHARTS
// =============================================

function loadCharts(){

    createScoreChart();

    createPassChart();

}



// =============================================
// SCORE BAR CHART
// =============================================

function createScoreChart(){

    const canvas =
    document.getElementById("scoreChart");

    if(!canvas) return;

    if(scoreChart){

        scoreChart.destroy();

    }

    const names=[];
    const scores=[];

    leaderboard.forEach(function(item){

        names.push(item.employeeName);

        scores.push(Number(item.score));

    });

    scoreChart=new Chart(

        canvas,

        {

            type:"bar",

            data:{

                labels:names,

                datasets:[{

                    label:"Quiz Score",

                    data:scores,

                    backgroundColor:[
                        "#0B4FA2",
                        "#1976D2",
                        "#42A5F5",
                        "#64B5F6",
                        "#90CAF9",
                        "#1565C0",
                        "#5C6BC0"
                    ],

                    borderRadius:10,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    duration:1800

                },

                plugins:{

                    legend:{

                        display:false

                    },

                    title:{

                        display:true,

                        text:"Employee Quiz Scores"

                    }

                },

                scales:{

                    y:{

                        beginAtZero:true,

                        suggestedMax:20

                    }

                }

            }

        }

    );

}



// =============================================
// PASS FAIL DOUGHNUT CHART
// =============================================

function createPassChart(){

    const canvas =
    document.getElementById("passChart");

    if(!canvas) return;

    if(passChart){

        passChart.destroy();

    }

    let pass=0;

    let fail=0;

    leaderboard.forEach(function(item){

        let p=Number(

            String(item.percentage)

            .replace("%","")

        );

        if(p>=60){

            pass++;

        }

        else{

            fail++;

        }

    });

    passChart=new Chart(

        canvas,

        {

            type:"doughnut",

            data:{

                labels:[

                    "Pass",

                    "Fail"

                ],

                datasets:[{

                    data:[

                        pass,

                        fail

                    ],

                    backgroundColor:[

                        "#4CAF50",

                        "#F44336"

                    ],

                    borderWidth:2

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    animateRotate:true,

                    duration:1800

                },

                plugins:{

                    legend:{

                        position:"bottom"

                    }

                }

            }

        }

    );

}



// =============================================
// TOP 5 PERFORMERS
// =============================================

function loadTopPerformers(){

    const container=

    document.getElementById(

        "topFiveList"

    );

    if(!container) return;

    container.innerHTML="";

    leaderboard

    .slice(0,5)

    .forEach(function(item,index){

        let medal="🏅";

        if(index===0) medal="🥇";

        if(index===1) medal="🥈";

        if(index===2) medal="🥉";

        container.innerHTML+=`

        <div class="top-player">

            <div>

                <strong>

                ${medal}

                ${item.employeeName}

                </strong>

                <br>

                Employee ID :

                ${item.employeeId}

            </div>

            <div>

                ⭐ ${item.score}/${item.totalQuestions}

            </div>

        </div>

        `;

    });

}



// =============================================
// RECENT ACTIVITY
// =============================================

function loadRecentActivity(){

    const activity=

    document.getElementById(

        "recentActivity"

    );

    if(!activity) return;

    activity.innerHTML="";

    leaderboard

    .slice(0,5)

    .forEach(function(item){

        activity.innerHTML+=`

        <p>

        ✅ <strong>

        ${item.employeeName}

        </strong>

        scored

        <strong>

        ${item.score}/${item.totalQuestions}

        </strong>

        on

        ${new Date(item.dateTime)

        .toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        })

        }

        </p>

        `;

    });

}



// =============================================
// DASHBOARD SUMMARY
// =============================================

function getAverageScore(){

    if(leaderboard.length===0)

        return 0;

    let total=0;

    leaderboard.forEach(function(item){

        total+=Number(item.score);

    });

    return (

        total/

        leaderboard.length

    ).toFixed(2);

}



function getPassPercentage(){

    if(leaderboard.length===0)

        return 0;

    let pass=0;

    leaderboard.forEach(function(item){

        if(

            Number(

            String(item.percentage)

            .replace("%","")

            )>=60

        ){

            pass++;

        }

    });

    return (

        pass*100/

        leaderboard.length

    ).toFixed(1);

}
