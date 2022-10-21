const mainCharacter = document.querySelector(".mainCharacter");
const gameObsticles = document.querySelector(".gameObsticles");
const alert = document.getElementById("alert");
const score = document.getElementById("score");
const popup = document.getElementById("game-message");
const notification = document.getElementById("notification-container");
const loser = document.getElementById("losing-container");
var score2 = 0;
let jumping = false;
let gameGravity = 0.9;
let isGameOver = true;
score.innerHTML = "Score: 0";

// button that starts the game
$("#play-button").click(function () {
  popup.style.display = "none";
  isGameOver = false;
  makeObstacles();
});

// end-game button to main menu
$("#main-menu").click(function () {
  window.location = "index.html";
});

// scoring && jumping keycode
function mainGame(event) {
  //space bar
  if (event.keyCode === 32) {
    if (jumping != true) {
      jumping = true;
      jump();
    }
    score.innerHTML = "Score: " + score2++;
  }
}
document.addEventListener("keyup", mainGame);

// starting point
let position = 0;
function jump() {
  let count = 0;
  let timerId = setInterval(function () {
    // move character down
    if (count === 10) {
      clearInterval(timerId);
      let down = setInterval(function () {
        if (count === 0) {
          clearInterval(down);
          jumping = false;
        }
        position -= 8;
        count--;
        position = position * gameGravity;
        mainCharacter.style.bottom = position + "px";
      }, 20);
    }
    // character jump
    position += 60;
    count++;
    position = position * gameGravity;
    mainCharacter.style.bottom = position + "px";
  }, 20);
}

// create each obstical
function makeObstacles() {
  let timeTick = Math.random() * 4000;
  let obstaclePosition = 1250;
  const enemy = document.createElement("div");
  if (isGameOver != true) {
    enemy.classList.add("enemy");
  }
  gameObsticles.appendChild(enemy);
  enemy.style.left = obstaclePosition + "px";
  let timerId = setInterval(function () {
    if (obstaclePosition > 0 && obstaclePosition < 90 && position < 90) {
      clearInterval(timerId);
      winner();
      isGameOver = true;
      // remove all child divs
      while (gameObsticles.firstChild) {
        gameObsticles.removeChild(gameObsticles.lastChild);
      }
    }

    obstaclePosition -= 10;
    enemy.style.left = obstaclePosition + "px";

    function winner() {
      loser.style.display = "flex";
    }
  }, 20);
  // check if game is over
  if (!isGameOver) {
    setTimeout(makeObstacles, timeTick);
  }
}