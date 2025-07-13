const directions = ["up", "down", "left", "right"];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;

const info = document.getElementById("info");
const gameAreaText = document.getElementById("gameText");
const arrow = document.querySelector(".arrow");
const gameArea = document.querySelector(".gameArea");

function getRandomDirection() {
  return directions[Math.floor(Math.random() * directions.length)];
}

function startGame() {
  gamePattern = [];
  userPattern = [];
  gameStarted = true;
  gameAreaText.textContent = "";
  info.textContent = "Watch the pattern...";
  addNextDirection();
}

function addNextDirection() {
  const next = getRandomDirection();
  gamePattern.push(next);
  showPattern();
}

function showPattern() {
  let index = 0;
  const interval = setInterval(() => {
    animateArrow(gamePattern[index]);
    index++;
    if (index >= gamePattern.length) {
      clearInterval(interval);
      userPattern = [];
      gameAreaText.textContent = "";
      info.textContent = "Now repeat the pattern";
    }
  }, 1000);
}

function animateArrow(direction) {
  arrow.classList.remove("up", "down", "left", "right"); // remove previous
  void arrow.offsetWidth; // force reflow to restart animation
  arrow.classList.add(direction); // add new
}

function handleInput(direction) {
  if (!gameStarted) return;

  userPattern.push(direction);
  animateArrow(direction);

  const index = userPattern.length - 1;
  if (userPattern[index] !== gamePattern[index]) {
    gameOver();
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(() => {
      addNextDirection();
    }, 800);
  }
}

function gameOver() {
  info.textContent = "❌ Wrong! Game Over!";
  gameAreaText.textContent = "Game Over!";
  gameStarted = false;
}

// Swipes Deduct
let startX, startY;

  function getSwipeDirection(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left";
    } else {
      return dy > 0 ? "down" : "up";
    }
  }

  gameArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  gameArea.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      handleInput(getSwipeDirection(dx, dy));
    }
  });

  gameArea.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });

  gameArea.addEventListener("mouseup", (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      handleInput(getSwipeDirection(dx, dy));
    }
  });

  // Keyboard arrow input
  document.addEventListener("keydown", (e) => {
    if (!gameStarted) return;
    switch (e.key) {
      case "ArrowUp": handleInput("up"); break;
      case "ArrowDown": handleInput("down"); break;
      case "ArrowLeft": handleInput("left"); break;
      case "ArrowRight": handleInput("right"); break;
    }
  });
//   Swipe Deduct over