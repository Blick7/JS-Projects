const getRandomPosition = () => {
  return Math.round(Math.random() * 20);
};

export let food = {
  x: getRandomPosition(),
  y: getRandomPosition(),
  value: 5,
};
export const drawFood = (gameBoard) => {
  //
  let foodElement = document.createElement("div");
  foodElement.style.gridRow = food.y; // ? y is always a row (could be confusing for the first time)
  foodElement.style.gridColumn = food.x;
  foodElement.classList.add("food");
  // append to gameBoard
  gameBoard.append(foodElement);
};

// move food update
export const updateFoodPosition = () => {
  food.x = getRandomPosition();
  food.y = getRandomPosition();
};
