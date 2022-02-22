import { snake, drawSnake, updateSnakePosition } from "./snake.js";

const gameBoard = document.querySelector(".game-board");
let startTimeStamp = null;
let gameBoardWidth = 20;
// create background dots
const createDots = () => {
  for (let i = 0; i < 400; i++) {
    let bgDot = document.createElement("div");
    bgDot.classList.add("circle");
    gameBoard.append(bgDot);
  }
};
createDots();

// start game loop
const gameLoop = (timeStamp) => {
  window.requestAnimationFrame(gameLoop);
  let timeSpent = (timeStamp - startTimeStamp) / 1000; // get seconds
  /* Logging the time spent in the game loop. */
  //   console.log(timeSpent);
  if (timeSpent < 1 / snake.speed) return;

  startTimeStamp = timeStamp;
  gameUpdate();
};
window.requestAnimationFrame(gameLoop);

const gameUpdate = () => {
  //
  gameBoard.innerHTML = "";
  createDots();
  drawSnake(gameBoard);
  updateSnakePosition();
};
