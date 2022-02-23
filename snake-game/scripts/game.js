import {
  snake,
  drawSnake,
  updateSnakePosition,
  eatTail,
  score,
} from "./snake.js";
import { drawFood } from "./food.js";

const gameBoard = document.querySelector(".game-board");
const scoreBoard = document.querySelector(".score-numbers");
let startTimeStamp = null;
let gameOverStatus = false;
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
  // check for game over status
  if (gameOverStatus) {
    location.reload();
  }

  window.requestAnimationFrame(gameLoop); // render
  let timeSpent = (timeStamp - startTimeStamp) / 1000; // get seconds
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
  drawFood(gameBoard);
  updateSnakePosition();
  gameOver();
  scoreBoard.textContent = score;
};

const gameOver = () => {
  gameOverStatus = eatTail();
};
