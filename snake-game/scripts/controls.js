let direction = {
  x: 0,
  y: 0,
};
let previousDirection = direction;
const controls = (event) => {
  //
  switch (event.code) {
    case "ArrowDown":
      if (previousDirection.y == -1) return; // remove reverse move
      direction = { x: 0, y: 1 };
      console.log("dsd");
      break;
    case "ArrowUp":
      if (previousDirection.y == 1) return; // remove reverse move
      direction = { x: 0, y: -1 };
      break;
    case "ArrowRight":
      if (previousDirection.x == -1) return; // remove reverse move
      direction = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      if (previousDirection.x == 1) return; // remove reverse move
      direction = { x: -1, y: 0 };
      break;
  }
  previousDirection = direction;
};

document.addEventListener("keydown", controls);

export const setDirection = () => {
  return direction;
};
