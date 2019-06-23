"use strict"

let player1 = prompt('Player1?', 'Player1');
let player2 = prompt('Player2?', 'Player2');

let stepCount1 = 0; 
let stepCount2 = 0; 
let timeCount = 0;

let tickerInterval = setInterval(ticker, 100); 

let runner1 = document.querySelector("#runner1");

function insertPlayersName() {
    document.querySelector('#p1name').innerText = player1;
    document.querySelector('#p2name').innerText = player2;
}


function setAnimals() {
    document.querySelectorAll('.djur1').forEach(function (button) {
        button.onclick = function () {
            document.querySelector('#runner1').innerText = button.dataset.djur;
            button.style.backgroundColor = "yellowgreen";
            button.classList.add("selected");
            document.querySelectorAll("button.djur1:not(.selected)").forEach(function (button) {button.style.backgroundColor = "white"; });
            button.classList.remove("selected");
        };
    document.querySelectorAll('.djur2').forEach(function (button) {
        button.onclick = function () {
            document.querySelector('#runner2').innerText = button.dataset.djur;
            button.style.backgroundColor = "orange";
            button.classList.add("selected");
            document.querySelectorAll("button.djur2:not(.selected)").forEach(function (button) {button.style.backgroundColor = "white"; });
            button.classList.remove("selected");
            };
        })
    })
}

function pauseResume() {
    if (document.querySelector('#pauseResume').innerText === "PAUSE!") {
        document.querySelectorAll('.runner').forEach(function (runners) {
            runners.classList.remove('running')
        });;
        ticker();
        document.querySelector('#pauseResume').innerText = "Resume!";
        document.querySelector('.bg').classList.remove('movingbg'); //???????
        clearInterval(ticker);
        //document.querySeelector('.runner').style.transform="rotateX(180deg)";
    } else {
        document.querySelectorAll('.runner').forEach(function (runners) {
            runners.classList.add('running')
        });
        document.querySelector('#pauseResume').innerText = "Pause!";
        document.querySelector('.bg').classList.add('movingbg');
        //document.querySeelector('.runner').style.transform="rotateX(0deg)";
    }
};

function ticker() {
    timeCount++;
    document.querySelector("#score1").innerHTML = `${player1}'s Score: ${stepCount1}`;
    document.querySelector("#speed1").innerHTML = `${player1}'s Speed: ${Math.round(stepCount1 * 1000 / timeCount)}`;
    document.querySelector("#runner1").style.left = `${stepCount1}%`;
    document.querySelector("#score2").innerHTML = `${player2}'s Score: ${stepCount2}`;
    document.querySelector("#speed2").innerHTML = `${player2}'s Speed: ${Math.round(stepCount2 * 1000 / timeCount)}`;
    document.querySelector("#runner2").style.left = `${stepCount2}%`;

    if (stepCount1 >= 101) {
        clearInterval(tickerInterval);
        if (document.querySelector("#runner1").innerText.includes("🚫")) {
            alert(`Wow! ${player1} has cheated & won!`)
        } else {
            alert(`Wow! ${player1} has won!`)
        };
    }
    else if (stepCount2 >= 101) {
        clearInterval(tickerInterval);
        if (document.querySelector("#runner2").innerText.includes("🚫")) {
            alert(`Wow! ${player2} has cheated & won!`)
        } else {
            alert(`Woo! ${player2} has won!`)
        }
    }
}


function cheat() {
    document.querySelector("#runner1").addEventListener("mouseover", function (dq) {
        document.querySelector("#runner1").innerText += "!🚫";
        stepCount1 = 0;
        let speed1 = document.querySelector("#speed1");
        let noCheat1 = document.createElement("p")
        noCheat1.innerHTML=`${player1}! 🚫 CHEATING!`;
        document.querySelector(".auto").insertBefore(noCheat1,speed1);
    });
    document.querySelector("#runner2").addEventListener("mouseover", function (dq) {
        document.querySelector("#runner2").innerText += "!🚫";
        stepCount2 = 0;
        let speed2 = document.querySelector("#speed2");
        let noCheat2 = document.createElement("p")
        noCheat2.innerHTML=`${player2}! 🚫 CHEATING!`;
        document.querySelector(".auto").insertBefore(noCheat2,speed2);
    });
}

//hidden animals

/*
class runner {
    constructor(playerName) {
        this.name = playerName
        document.querySelector('#p1name').innerText=
    }

    addStepCount() {
        this.stepCount++
    }
}


let r1 = new runner(player1)
let r2 = new runner(player2)
*/

document.addEventListener("DOMContentLoaded", () => {

    insertPlayersName();

    alert('How to Run: \n\Player 1: press A & D\n\Player 2: press J & L');

    setAnimals();

    document.querySelector("#pauseResume").onclick = pauseResume;

    ticker();

    cheat();

    document.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "a" || event.key === "A" || event.key === "d" || event.key === "D") {
            stepCount1++;
        } else if (event.key === "j" || event.key === "J" || event.key === "l" || event.key === "L") {
            stepCount2++;
        }
    });
})




/*?higher average speed > more to the right + bg moves (even) faster*/
