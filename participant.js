function saveParticipant(){

    let name = document.getElementById("participantName").value.trim();


    if(name==""){

        alert("Please enter your name");

        return;

    }


    localStorage.setItem("employeeName", name);


    window.location.href="quiz.html";

}
