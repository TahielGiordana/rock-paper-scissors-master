const scoreText = document.getElementById("totalScore");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const lizardBtn = document.getElementById("lizardBtn");
const spockBtn = document.getElementById("spockBtn");

const resultText = document.getElementById("resultText");
const replayBtn = document.getElementById("replayBtn");

const playerChoiceImg = document.getElementById("playerChoice");
const houseChoiceImg = document.getElementById("houseChoice");

const rulesBtn = document.getElementById("rulesBtn");
const closeRulesBtn = document.getElementById("closeRules");
const rulesInfo = document.querySelector(".rules__info");

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");

const options = ["rock", "paper", "scissors", "lizard", "spock"];

let playerChoice;
let houseChoice;

//Leer el puntaje almacenado
if (localStorage.getItem("score") == null) {
  scoreText.innerText = 0;
  localStorage.setItem("score", 0);
} else {
  scoreText.innerText = localStorage.getItem("score");
}

const optionBtns = document.querySelectorAll(".option__btn");
optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    playerChoice = btn.value;
    showResultScreen();
  });
});

const calcHomeChoice = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(options[Math.floor(Math.random() * 5)]);
    }, 1000);
  });

  let result = await promise;
  return result;
};

const showResultScreen = async () => {
  resetResultScreen();
  playerChoiceImg.src = "images/icon-" + playerChoice + ".svg";
  playerChoiceImg.parentElement.classList.add(playerChoice + "-style");

  resultScreen.style.visibility = "visible";
  resultScreen.style.position = "relative";
  resultScreen.style.opacity = 1;
  gameScreen.style.visibility = "hidden";
  gameScreen.style.position = "absolute";
  gameScreen.style.opacity = 0;

  houseChoice = await calcHomeChoice();
  houseChoiceImg.src = "images/icon-" + houseChoice + ".svg";
  houseChoiceImg.parentElement.classList.add(houseChoice + "-style");

  let result = getResult(playerChoice + houseChoice);
  showResult(result);
  resultText.parentElement.style.maxWidth = "300px";
  resultText.innerText = result;
  resultText.style.position = "relative";

  setTimeout(() => {
    resultText.style.visibility = "visible";
    resultText.style.opacity = 1;
  }, 1000);

  replayBtn.style.position = "relative";

  setTimeout(() => {
    showReplayBtn();
  }, 1500);
};

const showReplayBtn = () => {
  replayBtn.style.visibility = "visible";
  replayBtn.style.opacity = 1;
};

let winnerDiv;
const showResult = (result) => {
  if (result == "You win") {
    if (parseInt(scoreText.innerText) < 999999) {
      scoreText.innerText = parseInt(scoreText.innerText) + 1;
      localStorage.setItem("score", parseInt(scoreText.innerText));
    }
    playerChoiceImg.parentElement.classList.add("winner");
  } else if (result == "You lose") {
    if (parseInt(scoreText.innerText) > 0) {
      scoreText.innerText = parseInt(scoreText.innerText) - 1;
      localStorage.setItem("score", parseInt(scoreText.innerText));
    }
    houseChoiceImg.parentElement.classList.add("winner");
  }
};

//Show game screen
const showGameScreen = () => {
  gameScreen.style.visibility = "visible";
  gameScreen.style.position = "relative";
  gameScreen.style.opacity = 1;
  resultScreen.style.visibility = "hidden";
  resultScreen.style.position = "absolute";
  resultScreen.style.opacity = 0;
};

const resetResultScreen = () => {
  playerChoiceImg.parentElement.classList.remove("winner");
  houseChoiceImg.parentElement.classList.remove("winner");
  let actualPlayerChoice = playerChoiceImg.parentElement.classList.item(1);
  playerChoiceImg.parentElement.classList.remove(actualPlayerChoice);
  let actualHouseChoice = houseChoiceImg.parentElement.classList.item(1);
  houseChoiceImg.parentElement.classList.remove(actualHouseChoice);
  playerChoiceImg.src = "";
  playerChoiceImg.alt = "";
  houseChoiceImg.src = "";
  houseChoiceImg.alt = "";
  resultText.innerText = "";
  replayBtn.style.visibility = "hidden";
  replayBtn.style.position = "absolute";
  replayBtn.style.opacity = 0;
  resultText.style.visibility = "hidden";
  resultText.style.position = "absolute";
  resultText.style.opacity = 0;
  resultText.parentElement.style.maxWidth = 0;
};

const getResult = (choices) => {
  console.log(choices);
  switch (choices) {
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
    case "lizardlizard":
    case "spockspock":
      return "Draw";
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
    case "rocklizard":
    case "lizardspock":
    case "spockscissors":
    case "scissorslizard":
    case "paperspock":
    case "lizardpaper":
    case "spockrock":
      return "You win";
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
    case "lizardrock":
    case "spocklizard":
    case "scissorsspock":
    case "lizardscissors":
    case "spockpaper":
    case "paperlizard":
    case "rockspock":
      return "You lose";
  }
};

replayBtn.addEventListener("click", () => {
  gameScreen.style.visibility = "visible";
  gameScreen.style.position = "relative";
  gameScreen.style.opacity = 1;
  resultScreen.style.visibility = "hidden";
  resultScreen.style.position = "absolute";
  resultScreen.style.opacity = 0;
  resetResultScreen();
});

rulesBtn.addEventListener("click", () => {
  rulesInfo.classList.remove("hidden");
});

closeRulesBtn.addEventListener("click", () => {
  rulesInfo.classList.add("hidden");
});
