'use strict';

/** Selecting Elements */
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

/** Initializing Values */
let scores;
let currentScore;
let activePlayer;

/** Game State / Flags */
let playing;

const init = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner', 'player--active');
  player1El.classList.remove('player--winner', 'player--active');
  player0El.classList.add('player--active');
  playing = true;
};
init();
/** Switch Player */
function switchPlayer() {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

/** Roll Dice */
const rollDice = () => {
  if (playing) {
    /** 1- Generate random number b/w 1-6 */
    const dice = Math.trunc(Math.random() * 6 + 1);

    /** 2- Display Dice image according to that number */
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    /** 3- Check for rolled 1. */
    if (dice !== 1) {
      /** Add dice to the current score */
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      /** Next Player turn */
      switchPlayer();
    }
  }
};

/** Hold CurrentScore */
const holdCurrentScore = function () {
  if (playing) {
    /** 1- Add current score to activePlayer totalScore */
    scores[activePlayer] += currentScore;
    /** Check if totalScore for currentPlayer >= 100 if yes then he WINS. */
    if (scores[activePlayer] >= 15) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    }
    /** 2- Update TotalScore for current user */
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    /** 3- Make the currentScore for currentPlayer to 0 */
    switchPlayer();
  }
};

/** Rolling Dice Functionality */
btnRoll.addEventListener('click', rollDice);

/** Holding CurrentScore */
btnHold.addEventListener('click', holdCurrentScore);

/** New Game */
btnNew.addEventListener('click', init);
