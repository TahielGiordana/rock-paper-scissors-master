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

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");

const options = ["rock", "paper", "scissors", "lizard", "spock"];

if (localStorage.getItem("score") == null) {
  scoreText.innerText = 0;
  localStorage.setItem("score", 0);
} else {
  scoreText.innerText = localStorage.getItem("score");
}

const calcHomeChoice = () => {
  return options[Math.floor(Math.random() * 5)];
};

const optionBtns = document.querySelectorAll(".option__btn");
optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let playerChoice = btn.value;
    let houseChoice = calcHomeChoice();
    let result = getResult(playerChoice + houseChoice);
    showResult(playerChoice, houseChoice, result);
  });
});

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
      if (parseInt(scoreText.innerText) < 999999) {
        scoreText.innerText = parseInt(scoreText.innerText) + 1;
        localStorage.setItem("score", parseInt(scoreText.innerText));
      }
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
      if (parseInt(scoreText.innerText) > 0) {
        scoreText.innerText = parseInt(scoreText.innerText) - 1;
        localStorage.setItem("score", parseInt(scoreText.innerText));
      }
      return "You lose";
  }
};

const showResult = (playerChoice, houseChoice, result) => {
  showResultScreen(true);
  /*
  gameScreen.classList.toggle("hidden");
  resultScreen.classList.toggle("hidden");
  */
  //Se seleccionan las imágenes correspondientes
  playerChoiceImg.src = "images/icon-" + playerChoice + ".svg";
  let actualPlayerChoice = playerChoiceImg.parentElement.classList.item(1);
  playerChoiceImg.parentElement.classList.replace(
    "" + actualPlayerChoice,
    playerChoice + "-style"
  );

  houseChoiceImg.src = "images/icon-" + houseChoice + ".svg";
  let actualHouseChoice = houseChoiceImg.parentElement.classList.item(1);
  houseChoiceImg.parentElement.classList.replace(
    "" + actualHouseChoice,
    houseChoice + "-style"
  );

  //Se agrega el estilo al ganador
  playerChoiceImg.parentElement.classList.remove("winner");
  houseChoiceImg.parentElement.classList.remove("winner");
  resultText.innerText = result;
  if (result == "You win") {
    playerChoiceImg.parentElement.classList.add("winner");
  } else if (result == "You lose") {
    houseChoiceImg.parentElement.classList.add("winner");
  }
};

//Se oculta el resultado para volver a jugar
replayBtn.addEventListener("click", () => {
  showResultScreen(false);
  /*
  gameScreen.classList.toggle("hidden");
  resultScreen.classList.toggle("hidden");
  */
});

const showResultScreen = (bool) => {
  if (!bool) {
    gameScreen.style.visibility = "visible";
    gameScreen.style.position = "relative";
    gameScreen.style.opacity = 1;
    resultScreen.style.visibility = "hidden";
    resultScreen.style.position = "absolute";
    resultScreen.style.opacity = 0;
  } else {
    resultScreen.style.visibility = "visible";
    resultScreen.style.position = "relative";
    resultScreen.style.opacity = 1;
    gameScreen.style.visibility = "hidden";
    gameScreen.style.position = "absolute";
    gameScreen.style.opacity = 0;
  }
};
