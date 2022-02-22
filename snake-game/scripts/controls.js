let direction = {
  x: 0,
  y: 0,
};

const controls = (event) => {
  //
  switch (event.code) {
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
  }
};

document.addEventListener("keydown", controls);

export const setDirection = () => {
  return direction;
};
