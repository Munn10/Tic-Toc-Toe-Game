let buttons = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-game");
let msgCotainer = document.querySelector(".msg-container");
let startGame = document.querySelector("#start-btn");
let msg = document.querySelector(".msg");

msgCotainer.classList.add("hide");

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let playerX = true;
let count = 0;

buttons.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerX) {
      box.innerText = "X";
      box.style.color = "#f21b3f";
      playerX = false;
    } else {
      box.innerText = "O";
      box.style.color = "#29bf12";
      playerX = true;
    }
    box.disabled = true;
    count++;
    // console.log(count);
    let winner = checkWinner();

    if (count === 9 && !winner) {
      drawGame();
    }
  });
});

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pattern1 = buttons[pattern[0]].innerText;
    let pattern2 = buttons[pattern[1]].innerText;
    let pattern3 = buttons[pattern[2]].innerText;
    if (pattern1 !== "" && pattern2 !== "" && pattern3 !== "") {
      if (pattern1 === pattern2 && pattern2 === pattern3) {
        // console.log("winner ", pattern1);
        showWinner(pattern1);
        return true;
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `<h1>Congratulations Winner : ${winner}</h1>`;
  msgCotainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let button of buttons) {
    button.disabled = true;
  }
};

const enableBoxes = () => {
  for (let button of buttons) {
    button.disabled = false;
    button.innerText = "";
  }
};

const resetGame = () => {
  playerX = true;
  count = 0;
  enableBoxes();
  msgCotainer.classList.add("hide");
};

const drawGame = () => {
  msg.innerHTML = "<h1>Game was Draw...</h1>";
  msgCotainer.classList.remove("hide");
  disableBoxes();
};

resetBtn.addEventListener("click", resetGame);
startGame.addEventListener("click", resetGame);
