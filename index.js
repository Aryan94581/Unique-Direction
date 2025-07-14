// Allowed directions
const directions = ["up", "down", "left", "right"];

// Game state
let gamePattern = [];
let userPattern = [];
let gameStarted = false;

// DOM elements
const info = document.getElementById("info");
const gameText = document.getElementById("gameText");
const arrow = document.querySelector(".arrow");
// const gameArea = document.querySelector(".gameArea");
const wrapper = document.querySelector(".wrapper")

// Utility: Pick a random direction
function getRandomDirection() {
  const index = Math.floor(Math.random() * directions.length);
  return directions[index];
}

// Start or restart the game
function startGame() {
  gamePattern = [];
  userPattern = [];
  gameStarted = true;

  info.textContent = "Watch the pattern...";
  gameText.textContent = "";

  addNextDirection();
}

// Add the next random direction to the pattern
function addNextDirection() {
  const direction = getRandomDirection();
  gamePattern.push(direction);
  showPattern();
}

// Show the full pattern to the user step by step
function showPattern() {
  let i = 0;

  const intervalId = setInterval(() => {
    animateArrow(gamePattern[i]);
    i++;

    if (i >= gamePattern.length) {
      clearInterval(intervalId);

      userPattern = [];
      info.textContent = "Now repeat the pattern";
      gameText.textContent = "";
    }
  }, 1000);
}

function animateArrow(direction, color = "") {
  // Reset to base class
  arrow.className = "arrow";

  // Force reflow to reset animation
  void arrow.offsetWidth;

  // Add direction class
  arrow.classList.add(direction);

  // Optionally change color class
  if (color === "green") {
    arrow.classList.add("green");
    // Remove green after animation ends
    setTimeout(() => {
      arrow.classList.remove("green");
    }, 800);
  }
}


function handleInput(direction) {
  if (!gameStarted) return;

  userPattern.push(direction);
  animateArrow(direction, "green"); // ✅ green for user input

  const currentIndex = userPattern.length - 1;

  if (userPattern[currentIndex] !== gamePattern[currentIndex]) {
    return gameOver();
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(addNextDirection, 800);
  }
}


// End the game
function gameOver() {
  info.textContent = "❌ Wrong! Game Over!";
  gameText.textContent = "Game Over!";
  gameStarted = false;
}

// Calculate swipe direction based on movement delta
function getSwipeDirection(dx, dy) {
  return Math.abs(dx) > Math.abs(dy)
    ? dx > 0 ? "right" : "left"
    : dy > 0 ? "down" : "up";
}

// Touch input handlers
let startX = 0;
let startY = 0;

wrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

wrapper.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
    const direction = getSwipeDirection(dx, dy);
    handleInput(direction);
  }
});

// Keyboard arrow key support
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;

  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };

  const direction = keyMap[e.key];
  if (direction) {
    handleInput(direction);
  }
});
