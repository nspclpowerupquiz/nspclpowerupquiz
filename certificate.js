// =================================
// NSPCL Certificate Generator
// =================================



let name =

localStorage.getItem("NSPCL_User")
||
"Participant";



let leaderboard =

JSON.parse(

localStorage.getItem("leaderboard")

)||[];




let latest =

leaderboard[leaderboard.length-1];





document.getElementById(
"certificateName"
).innerHTML=name;





if(latest){


document.getElementById(
"certificateScore"
).innerHTML=

`
Score: ${latest.score} <br>
Percentage: ${latest.percentage}%
`;



}





document.getElementById(
"certificateDate"
).innerHTML=

"Completed on: "

+

new Date().toLocaleDateString();
