const scoreText = document.getElementById("totalScore");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

const resultText = document.getElementById("resultText");
const replayBtn = document.getElementById("replayBtn");

const playerChoiceImg = document.getElementById("playerChoice");
const houseChoiceImg = document.getElementById("houseChoice");

const rulesBtn = document.getElementById("rulesBtn");

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");

const options = ["rock", "paper", "scissors"];

const calcHomeChoice = () => {
  return options[Math.floor(Math.random() * 3)];
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
      return "Draw";
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      if (parseInt(scoreText.innerText) < 999999) {
        scoreText.innerText = parseInt(scoreText.innerText) + 1;
      }
      return "You win";
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      return "You lose";
  }
};

const showResult = (playerChoice, houseChoice, result) => {
  gameScreen.classList.toggle("hidden");
  resultScreen.classList.toggle("hidden");

  //Se seleccionan las imágenes correspondientes
  playerChoiceImg.src = "images/icon-" + playerChoice + ".svg";
  let actualPlayerChoice = playerChoiceImg.parentElement.classList.item(1);
  playerChoiceImg.parentElement.classList.replace(
    "" + actualPlayerChoice,
    "option__" + playerChoice
  );

  houseChoiceImg.src = "images/icon-" + houseChoice + ".svg";
  let actualHouseChoice = houseChoiceImg.parentElement.classList.item(1);
  houseChoiceImg.parentElement.classList.replace(
    "" + actualHouseChoice,
    "option__" + houseChoice
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
  gameScreen.classList.toggle("hidden");
  resultScreen.classList.toggle("hidden");
});
