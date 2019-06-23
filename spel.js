"use strict"

let runner1 = prompt('Player1?')
let runner2 = prompt('Player2?')

let stepCount1 = 0; 
let stepCount2 = 0; 
let timeCount = 0;

let tickerInterval = setInterval(ticker, 33); 

function setPlayers() {
    document.querySelector('#runner1').innerText += runner1;
    document.querySelector('#runner2').innerText += runner2;
}

function stopStart() {
    if (document.querySelector('#stopstart').innerText === "STOP!") {
        document.querySelectorAll('.runner').forEach(function (runners) {
            runners.classList.remove('running')
        });;
        ticker();
        document.querySelector('#stopstart').innerText = "START/RESUME!";
        document.querySelector('.bg').classList.remove('movingbg'); //???????
        clearInterval(ticker);
        //document.querySeelector('.runner').style.transform="rotateX(180deg)";
    } else {
        document.querySelectorAll('.runner').forEach(function (runners) {
            runners.classList.add('running')
        });
        document.querySelector('#stopstart').innerText = "STOP!";
        document.querySelector('.bg').classList.add('movingbg');
        //document.querySeelector('.runner').style.transform="rotateX(0deg)";
    }
};

function ticker() {
    timeCount++;
    document.querySelector("#score1").innerHTML = `🐑${runner1}'s Score: ${stepCount1}`;
    document.querySelector("#speed1").innerHTML = `🐑${runner1}'s Speed: ${Math.round(stepCount1 * 1000 / timeCount)}`;
    document.querySelector("#runner1").style.left = `${stepCount1}%`;
    document.querySelector("#score2").innerHTML = `🐇${runner2}'s Score: ${stepCount2}`;
    document.querySelector("#speed2").innerHTML = `🐇${runner2}'s Speed: ${Math.round(stepCount2 * 1000 / timeCount)}`;
    document.querySelector("#runner2").style.left = `${stepCount2}%`;
    if (stepCount1 >= 101) {
        clearInterval(tickerInterval);
        alert(`Wow!🐑${runner1} has won!`) 
    }
    if (stepCount2 >= 101) {
        clearInterval(tickerInterval);
        alert(`Woo!🐇${runner2} has won!`)
        
    }   
}


document.addEventListener("DOMContentLoaded", () => {

    setPlayers();

    document.querySelector("#stopstart").onclick = stopStart;

    ticker();

    document.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "a" || event.key === "A" || event.key === "d" || event.key === "D") {
            stepCount1++;
        } else if (event.key === "j" || event.key === "J" || event.key === "l" || event.key === "L") {
            stepCount2++;
        } else {
            alert('Player 1 / 2: press A & D / J & L to RUN!')
        }
    }

    )
})




/*?higher average speed > more to the right + bg moves (even) faster*/
