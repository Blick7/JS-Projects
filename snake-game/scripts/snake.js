import { setDirection } from "./controls.js";

export let snake = {
  body: [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ],
  speed: 4,
};

export const drawSnake = (gameBoard) => {
  // set snake body elements positions
  snake.body.forEach((element, index) => {
    // create snake body square element
    let snakeBody = document.createElement("div");
    snakeBody.style.gridRow = element.y; // y is always a row (could be confusing for the first time)
    snakeBody.style.gridColumn = element.x;
    if (index == 0) snakeBody.classList.add("snake-head");
    snakeBody.classList.add("snake-body");
    gameBoard.append(snakeBody);
  });
};

export const updateSnakePosition = () => {
  // all elements should follow head
  for (let i = snake.body.length - 2; i >= 0; i--) {
    snake.body[i + 1] = { ...snake.body[i] };
    console.log({ ...snake.body[i] });
  }
  console.log(setDirection().x);
  setDirection();
  // move head
  snake.body[0].x += setDirection().x;
  snake.body[0].y += setDirection().y;
};
