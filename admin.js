// ==============================================
// NSPCL POWER-UP QUIZ
// ADMIN DASHBOARD
// PART 1
// ==============================================



// ==============================================
// GOOGLE APPS SCRIPT URL
// ==============================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



// ==============================================
// GLOBAL VARIABLES
// ==============================================

let leaderboard = [];

let scoreChart = null;

let passChart = null;

let refreshTimer = null;



// ==============================================
// PAGE LOAD
// ==============================================

window.onload = function () {

    loadDashboard();

    startAutoRefresh();

};



// ==============================================
// LOAD DASHBOARD
// ==============================================

async function loadDashboard() {

    try {

        showLoading();

        const response = await fetch(
            SCRIPT_URL + "?action=leaderboard"
        );

        leaderboard = await response.json();

        console.log("Leaderboard:", leaderboard);

        hideLoading();

        updateDashboard();

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert("Unable to load dashboard.");

    }

}



// ==============================================
// UPDATE EVERYTHING
// ==============================================

function updateDashboard() {

    updateCards();

    populateTable();

    loadCharts();

    loadTopPerformers();

    loadRecentActivity();

}



// ==============================================
// UPDATE KPI CARDS
// ==============================================

function updateCards() {

    const participants =
        leaderboard.length;

    const attempts =
        leaderboard.length;

    let highest = 0;

    let certificates = 0;

    leaderboard.forEach(item => {

        if (Number(item.score) > highest) {

            highest = Number(item.score);

        }

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



// ==============================================
// COUNTER ANIMATION
// ==============================================

function animateCounter(id, target) {

    const element =
        document.getElementById(id);

    if (!element) return;

    let value = 0;

    const increment =
        Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(function () {

        value += increment;

        if (value >= target) {

            value = target;

            clearInterval(timer);

        }

        element.textContent = value;

    }, 25);

}



// ==============================================
// AUTO REFRESH
// ==============================================

function startAutoRefresh() {

    refreshTimer = setInterval(function () {

        console.log("Refreshing dashboard...");

        loadDashboard();

    }, 30000);

}



// ==============================================
// LAST UPDATED
// ==============================================

function updateLastRefresh() {

    const clock =
        document.getElementById("liveClock");

    if (!clock) return;

    clock.innerHTML =
        new Date().toLocaleString("en-IN");

}



// ==============================================
// LOADING OVERLAY
// ==============================================

function showLoading() {

    let loader =
        document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "flex";

    }

}



function hideLoading() {

    let loader =
        document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "none";

    }

}



// ==============================================
// PLACEHOLDER FUNCTIONS
// (Implemented in later parts)
// ==============================================

function populateTable() {}

function loadCharts() {}

function loadTopPerformers() {}

function loadRecentActivity() {}
