'use strict';

/*?higher average speed > more to the right + bg moves (even) faster*/
// clearInterval(p1.ticker); or clearInterval(tickerInterval1);?

let timeCount = 0;

let runner1 = document.querySelector('#runner1');
let runner2 = document.querySelector('#runner2');

class Player {
    constructor(nr, stepCount) {
        this.nr = nr;
        this.name = prompt(`Player${nr}'s name?`, `Player${nr}`);
        this.stepCount = 0;
    }
    insertPlayersName = () => {
        document.querySelector(`#p${this.nr}name`).innerText = `Player${this.nr}`;
    };

    setAnimals() {
        // document.createElement('button')?

        document.querySelectorAll(`.djur${this.nr}`).forEach(button => {
            button.onclick = () => {
                document.querySelector(`#runner${this.nr}`).innerText = button.dataset.djur;
                button.style.backgroundColor = 'yellowgreen';
                button.classList.add('selected');
                document
                    .querySelectorAll(`button.djur${this.nr}:not(.selected)`)
                    .forEach(function(button) {
                        button.style.backgroundColor = 'white';
                    });
                button.classList.remove('selected');
            };
        });
    }

    ticker = () => {
        timeCount++;
        document.querySelector(
            `#score${this.nr}`,
        ).innerHTML = `Player${this.nr}'s Score: ${this.stepCount}`;
        document.querySelector(`#speed${this.nr}`).innerHTML = `Player${
            this.nr
        }'s Speed: ${Math.round((this.stepCount * 1000) / timeCount)}`;
        if (this.stepCount >= 97) {
            let pos = 97;
            document.querySelector(`#runner${this.nr}`).style.right = '0vw';
        } else {
            document.querySelector(`#runner${this.nr}`).style.left = `${this.stepCount}vw`;
        }
    };

    cheat = () => {
        document.querySelector(`#runner${this.nr}`).addEventListener('mouseover', event => {
            document.querySelector(`#runner${this.nr}`).innerText += '🚫';
            this.stepCount = 0;
            let speed = document.querySelector(`#speed${this.nr}`);
            let noCheat = document.createElement('p');
            noCheat.innerHTML = `Player${this.nr}! 🚫 CHEATING!`;
            document.querySelector('.auto').insertBefore(noCheat, speed);
            if (
                (document.querySelector(`#runner${this.nr}`).innerText.match(/🚫/g) || [])
                    .length === 9
            ) {
                console.log(
                    (document.querySelector(`#runner${this.nr}`).innerText.match(/🚫/g) || [])
                        .length,
                );
                document.querySelector(`#runner${this.nr}`).innerText = '🏳';
                document
                    .querySelector(`#runner${this.nr}`)
                    .removeEventListener('mouseover', cheating);
                document.querySelector(`#runner${this.nr}`).classList.remove('cancheat');
            }
        });
    };
}

function pauseResume() {
    if (document.querySelector('#pauseResume').textContent === 'Pause!') {
        document.querySelectorAll('.runner').forEach(runners => {
            runners.classList.remove('running');
        });
        p1.ticker();
        p2.ticker();
        document.querySelector('#pauseResume').textContent = 'Resume!';
        document.querySelector('.movingbg').className = 'bg';
        clearInterval(p1.ticker);
        clearInterval(p2.ticker);
        //document.querySelector('.runner').style.transform="rotateX(180deg)";
    } else {
        document.querySelectorAll('.runner').forEach(runners => {
            runners.classList.add('running');
        });
        p1.ticker();
        p2.ticker();
        document.querySelector('#pauseResume').innerText = 'Pause!';
        document.querySelector('.bg').className += ' movingbg';
        //document.querySelector('.runner').style.transform="rotateX(0deg)";
    }
}

const whoWins = () => {
    if (p1.stepCount >= 97) {
        clearInterval(tickerInterval1);
        if (document.querySelector('#runner1').innerText.includes('🚫')) {
            alert(`Wow! ${p1.name} has cheated & won!`);
        } else {
            alert(`Wow! ${p1.name} has won!`);
        }
    } else if (p2.stepCount >= 97) {
        clearInterval(tickerInterval2);
        if (document.querySelector('#runner2').innerText.includes('🚫')) {
            alert(`Wow! ${p2.name} has cheated & won!`);
        } else {
            alert(`Woo! ${p2.name} has won!`);
        }
    }
};

let p1 = new Player('1');
let p2 = new Player('2');

let tickerInterval1 = setInterval(p1.ticker, 100);
let tickerInterval2 = setInterval(p2.ticker, 100);

document.addEventListener('DOMContentLoaded', () => {
    p1.insertPlayersName();
    p2.insertPlayersName();

    alert('How to Run: \nPlayer 1: press A & D\nPlayer 2: press J & L');

    p1.setAnimals();
    p2.setAnimals();

    document.addEventListener('keydown', event => {
        event.preventDefault();
        if (event.key === 's') {
            document.addEventListener('keydown', event => {
                event.preventDefault();
                if (event.key === 'h')
                    document.addEventListener('keydown', event => {
                        event.preventDefault();
                        if (event.key === 'p') {
                            document.querySelector('#runner1').innertext = '🐑';
                        }
                    });
            });
        } else if (event.key === 'r') {
            document.addEventListener('keydown', event => {
                event.preventDefault();
                if (event.key === 'b')
                    document.addEventListener('keydown', event => {
                        event.preventDefault();
                        if (event.key === 't') {
                            document.querySelector('#runner2').innerHTML = '🐇';
                        }
                    });
            });
        }
    });

    document.querySelector('#pauseResume').onclick = pauseResume;

    p1.ticker();
    p2.ticker();

    p1.cheat();
    p2.cheat();

    whoWins();

    document.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.key === 'a' || event.key === 'A' || event.key === 'd' || event.key === 'D') {
            p1.stepCount++;
        } else if (
            event.key === 'j' ||
            event.key === 'J' ||
            event.key === 'l' ||
            event.key === 'L'
        ) {
            p2.stepCount++;
        }
    });
});
