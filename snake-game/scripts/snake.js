import { setDirection } from "./controls.js";
import { updateFoodPosition, food } from "./food.js";
export let snake = {
  body: [{ x: 10, y: 10 }],
  speed: 6,
};
export let score = 0;
export const drawSnake = (gameBoard) => {
  // set snake body elements positions
  snake.body.forEach((element, index) => {
    // create snake body square element
    let snakeBody = document.createElement("div");
    snakeBody.style.gridRow = element.y; // ? y is always a row (could be confusing for the first time)
    snakeBody.style.gridColumn = element.x;
    // check for head
    if (index == 0) snakeBody.classList.add("snake-head");
    snakeBody.classList.add("snake-body");
    gameBoard.append(snakeBody);
  });
};

export const updateSnakePosition = () => {
  eatFood();
  // all elements should follow head
  for (let i = snake.body.length - 2; i >= 0; i--) {
    snake.body[i + 1] = { ...snake.body[i] }; // fill the rest elements
  }
  borderMove();
  // move head
  snake.body[0].x += setDirection().x;
  snake.body[0].y += setDirection().y;
};

export const borderMove = () => {
  // if snake is going out of the border move it to the opposite side
  if (snake.body[0].x < 0) snake.body[0].x = 21;
  if (snake.body[0].x > 21) snake.body[0].x = 0;
  if (snake.body[0].y < 0) snake.body[0].y = 21;
  if (snake.body[0].y > 21) snake.body[0].y = 0;
};

const eatFood = () => {
  if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
    updateFoodPosition();
    expandSnake();
    score += food.value;
  }
};

const expandSnake = () => {
  for (let i = 0; i < food.value; i++) {
    snake.body.push(snake.body[snake.body.length - 1]);
  }
};

export const eatTail = () => {
  for (let i = 1; i < snake.body.length - 1; i++) {
    if (
      snake.body[0].x == snake.body[i].x &&
      snake.body[0].y == snake.body[i].y
    ) {
      return true;
    }
  }
};
