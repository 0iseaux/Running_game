'use strict';

// loser can still cheat after race?
// runners runner anime during pause?

let timeCount = 0;
let interval1;
let interval2;

let runner1 = document.querySelector('#runner1');
let runner2 = document.querySelector('#runner2');

class Player {
    constructor(nr, stepCount) {
        this.nr = nr;
        this.name = prompt(`Player${nr}'s name?`, `Player${nr}`);
        this.stepCount = 0;
        this.cheatCount = 0;
    }
    insertPlayersName = () => {
        document.querySelector(`#p${this.nr}name`).innerText = this.name;
    };

    setAnimals() {
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

    gamePlay = () => {
        // Score & speed
        timeCount++;
        document.querySelector(`#score${this.nr}`).innerHTML = `Score: ${this.stepCount}`;
        document.querySelector(`#speed${this.nr}`).innerHTML = `Speed: ${Math.round(
            (this.stepCount * 1000) / timeCount,
        )}`;
        // position
        document.querySelector(`#runner${this.nr}`).style.left = `${this.stepCount}vw`;
        // win
        if (this.stepCount >= 88) {
            // race finished
            this.stepCount = 88;
            clearInterval(interval1);
            clearInterval(interval2);
            document.querySelectorAll('.runners').forEach(runner => {
                runner.className = 'runners';
            });
            document.querySelector('.movingbg').className = 'bg';

            // remove cheating option for all
            document.querySelector('#runner1').removeEventListener('mouseover', p1.cheat);
            document.querySelector('#runner2').removeEventListener('mouseover', p2.cheat);

            // winner
            if (this.cheatCount) {
                alert(`😑Oops! ${this.name} has cheated to win!🙄`);
            } else {
                alert(`🎉Wow! ${this.name} has won!👏`);
            }
        }
    };

    cheat = () => {
        this.cheatCount++;
        console.log(this.cheatCount);
        document.querySelector(`#runner${this.nr}`).classList.add('canCheat');
        document.querySelector('.canCheat').style.left = '88vw';
        document.querySelector(`#runner${this.nr}`).classList.remove('canCheat');
        document.querySelector(`#cheat${this.nr}`).textContent = `Player${this.nr}! 🚫 CHEATING!`;

        if (this.cheatCount > 30) {
            document
                .querySelector(`#runner${this.nr}`)
                .removeEventListener('mouseover', this.cheat);
            document.querySelector(`#runner${this.nr}`).innerText = '🏳';
            document.querySelector(`#score${this.nr}`).innerText = 'Score: 0';
            this.stepCount = 0;
        }
    };
}

const pauseResume = () => {
    if (document.querySelector('#pauseResume').textContent === 'Pause!') {
        document.querySelector('#pauseResume').textContent = 'Resume!';
        document.querySelector('.movingbg').className = 'bg';

        document.querySelectorAll('.runners').forEach(runner => {
            runner.classList.remove('running');
        });

        document.querySelector('#runner1').style.left = `${p1.stepCount}vw`;
        document.querySelector('#runner2').style.left = `${p2.stepCount}vw`;

        clearInterval(interval1);
        clearInterval(interval2);
    } else {
        document.querySelector('#pauseResume').innerText = 'Pause!';
        document.querySelector('.bg').classList.add('movingbg');

        document.querySelectorAll('.runners').forEach(runner => {
            runner.classList.add('running');
        });
        interval1 = setInterval(p1.gamePlay, 100);
        interval2 = setInterval(p2.gamePlay, 100);
    }
};

let p1 = new Player('1');
let p2 = new Player('2');

document.addEventListener('DOMContentLoaded', () => {
    alert('How to Run: \nPlayer 1: press A & D\nPlayer 2: press J & L');

    p1.insertPlayersName();
    p2.insertPlayersName();

    p1.setAnimals();
    p2.setAnimals();

    interval1 = setInterval(p1.gamePlay, 50);
    interval2 = setInterval(p2.gamePlay, 50);

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

    document.querySelector('#pauseResume').onclick = pauseResume;

    document.querySelector('#runner1').addEventListener('mouseover', p1.cheat);
    document.querySelector('#runner2').addEventListener('mouseover', p2.cheat);
});
