let lastPaintTime = 0;
const speed = 5;
let snakeArr = [{ x: 13, y: 13 }];
let food = { x: 5, y: 5 };
let vector = { x: 0, y: 0 };
let score = 0;
const a = 2;
const b = 18;
const xBound = 20;
const yBound = 20;
let prevKey = "";
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide() {
  for (i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  if (
    0 >= snakeArr[0].x ||
    snakeArr[0].x >= xBound ||
    0 >= snakeArr[0].y ||
    snakeArr[0].y >= yBound
  ) {
    return true;
  }
}
function generateFood() {
  let food = {
    x: Math.floor(Math.random() * (b - a) + a),
    y: Math.floor(Math.random() * (b - a) + a),
  };

  // Check if the generated coordinates are already in snakeArr
  while (isCoordinateInSnake(food)) {
    food = {
      x: Math.floor(Math.random() * (b - a) + a),
      y: Math.floor(Math.random() * (b - a) + a),
    };
  }

  return food;
}

function isCoordinateInSnake(coord) {
  for (let i = 0; i < snakeArr.length; i++) {
    if (snakeArr[i].x === coord.x && snakeArr[i].y === coord.y) {
      return true;
    }
  }
  return false;
}
function gameEngine() {
  if (isCollide()) {
    snakeArr = [{ x: 13, y: 13 }];
    vector = { x: 0, y: 0 };
    alert("Game Over!");
    score = 0;
    prevKey = "";
    scoreBox.innerHTML = "Score: " + score;
  }
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += vector.x;
  snakeArr[0].y += vector.y;
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + vector.x,
      y: snakeArr[0].y + vector.y,
    });
    // snakeArr.unshift({ x: food.x, y: food.y });
    let foodCoordinates = generateFood();
    food.y = foodCoordinates.y;
    food.x = foodCoordinates.x;
  }
  board = document.getElementsByClassName("grids")[0];
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("tail");
    board.appendChild(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (prevKey != "ArrowDown") {
        vector.x = 0;
        vector.y = -1;

        prevKey = e.key;
      }
      break;

    case "ArrowDown":
      if (prevKey != "ArrowUp") {
        vector.x = 0;
        vector.y = 1;
        prevKey = e.key;
      }
      break;

    case "ArrowLeft":
      if (prevKey != "ArrowRight") {
        vector.x = -1;
        vector.y = 0;
        prevKey = e.key;
      }
      break;

    case "ArrowRight":
      if (prevKey != "ArrowLeft") {
        vector.x = 1;
        vector.y = 0;
        prevKey = e.key;
      }
      break;
    default:
      break;
  }
});
