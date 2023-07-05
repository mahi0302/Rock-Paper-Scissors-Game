let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// calling function to  updateScore
updateScoreElement();

// if score is null
/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/

let isAutoPlaying = false;
let intervalId;

function resetScore() {
  const buttonElement = document.querySelector('.js-auto-play-button');
  if (buttonElement.innerHTML === "Stop Play") {
    document.querySelector('.js-rest-score-button');
    alert("Please click on Stop Play first, Thanks");
  } else {
    // Clear the result and moves on the screen
    const resultElement = document.querySelector('.js-result');
    resultElement.textContent = '';

    const movesElement = document.querySelector('.js-moves');
    movesElement.textContent = '';

    // Reset the position of the score
    const scoreElement = document.querySelector('.js-score');
    scoreElement.style.position = 'static';
  }
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  // computer take random move from pickComputerMove()
  const computerMove = pickComputerMove();

  // let's initialize result as blank
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  // take random number to use Math.random()
  const randomNumber = Math.random();

  // store computerMove with random number
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
    const buttonElement = document.querySelector('.js-auto-play-button');
    if (buttonElement.innerHTML === "Auto Play") {
      buttonElement.innerHTML = "Stop Play";
      buttonElement.classList.add('is-played');
    } else {
      buttonElement.innerHTML = "Auto Play";
      buttonElement.classList.remove('is-played');
    }
  });