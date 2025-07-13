










































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