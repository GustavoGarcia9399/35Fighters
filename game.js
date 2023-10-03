const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const startBell = new Audio("./sources/music/start_bell.mp3");
const epicMusic = new Audio("./sources/music/MUSICA_EPICA.mp3");
const dyingMoan = new Audio("./sources/music/dying_moan.mp3");
const punch = new Audio("./sources/music/punch.mp3");
const gravity = 1;
const backgroundMusic = new Audio("./sources/music/background_music.mp3");

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./sources/img/backgrounds/background_1024x576.png",
});
const frontground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./sources/img/backgrounds/chairs.png",
});

const armando = new Fighter({
  position: {
    x: 300,
    y: 150,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./sources/img/players/armando/Armando_idle.png",
  framesMax: 4,
  scale: 3,
  offset: {
    x: 30,
    y: 90,
  },
  sprites: {
    idle: {
      imageSrc: "./sources/img/players/armando/Armando_idle.png",
      framesMax: 4,
    },
    walk: {
      imageSrc: "./sources/img/players/armando/Armando_walk.png",
      framesMax: 4,
    },
    punch: {
      imageSrc: "./sources/img/players/armando/Armando_punch.png",
      framesMax: 4,
    },
    hit: {
      imageSrc: "./sources/img/players/armando/Armando_hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./sources/img/players/armando/Armando_death.png",
      framesMax: 4,
    },
  },
  punchBox: {
    offset: {
      x: 75,
      y: 40,
    },
    width: 85,
    height: 10,
  },
});

const lescano = new Fighter({
  position: {
    x: 654,
    y: 150,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  color: "blue",
  imageSrc: "./sources/img/players/lescano/Lescano_idle.png",
  framesMax: 4,
  scale: 3,
  offset: {
    x: 90,
    y: 90,
  },
  sprites: {
    idle: {
      imageSrc: "./sources/img/players/lescano/Lescano_idle.png",
      framesMax: 4,
    },
    walk: {
      imageSrc: "./sources/img/players/lescano/Lescano_walk.png",
      framesMax: 4,
    },
    punch: {
      imageSrc: "./sources/img/players/lescano/Lescano_punch.png",
      framesMax: 4,
    },
    hit: {
      imageSrc: "./sources/img/players/lescano/Lescano_hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./sources/img/players/lescano/Lescano_death.png",
      framesMax: 4,
    },
  },
  punchBox: {
    offset: {
      x: -87,
      y: 40,
    },
    width: 87,
    height: 10,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  A: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  D: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  J: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  Enter: {
    pressed: false,
  },
};

c.fillRect(0, 0, canvas.width, canvas.height);
animate();

function punchingCollision({ arm, body }) {
  return (
    arm.punchBox.position.x + arm.punchBox.width >= body.position.x &&
    arm.punchBox.position.x <= body.position.x + body.width &&
    arm.punchBox.position.y + arm.punchBox.height >= body.position.y &&
    arm.punchBox.position.y <= body.position.y + body.height
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  armando.update();
  lescano.update();
  frontground.update();
  // c.fillRect(
  //   armando.punchBox.position.x,
  //   armando.punchBox.position.y,
  //   armando.punchBox.width,
  //   armando.punchBox.height
  // );
  // c.fillRect(
  //   lescano.punchBox.position.x,
  //   lescano.punchBox.position.y,
  //   lescano.punchBox.width,
  //   lescano.punchBox.height
  // );
  // c.fillRect(
  //   armando.position.x,
  //   armando.position.y,
  //   armando.width,
  //   armando.height
  // );
  // c.fillRect(
  //   lescano.position.x,
  //   lescano.position.y,
  //   lescano.width,
  //   lescano.height
  // );

  armando.velocity.x = 0;
  lescano.velocity.x = 0;

  // Armando movement
  if (keys.a.pressed && armando.lastKey === "a" && armando.position.x > 120) {
    armando.velocity.x = -5;
    armando.switchSprite("walk");
  } else if (
    keys.d.pressed &&
    armando.lastKey === "d" &&
    armando.position.x < lescano.position.x - 100
  ) {
    armando.velocity.x = 5;
    armando.switchSprite("walk");
  } else {
    armando.switchSprite("idle");
  }

  // Lescano movement
  if (
    keys.ArrowLeft.pressed &&
    lescano.lastKey === "ArrowLeft" &&
    lescano.position.x > armando.position.x + 100
  ) {
    lescano.velocity.x = -5;
    lescano.switchSprite("walk");
  } else if (
    keys.ArrowRight.pressed &&
    lescano.lastKey === "ArrowRight" &&
    lescano.position.x < 824
  ) {
    lescano.velocity.x = 5;
    lescano.switchSprite("walk");
  } else {
    lescano.switchSprite("idle");
  }

  //Armando colitions
  if (
    punchingCollision({ arm: armando, body: lescano }) &&
    armando.isPunching &&
    armando.framesCurrent === 2
  ) {
    lescano.hit();
    armando.isPunching = false;
    document.querySelector("#lescanoHealth").style.width = lescano.health + "%";
  }
  if (armando.isPunching && armando.framesCurrent === 2) {
    armando.isPunching = false;
  }

  // Lescano colitions
  if (
    punchingCollision({ arm: lescano, body: armando }) &&
    lescano.isPunching &&
    armando.framesCurrent === 2
  ) {
    armando.hit();
    lescano.isPunching = false;
    document.querySelector("#armandoHealth").style.width = armando.health + "%";
  }
  if (lescano.isPunching && lescano.framesCurrent === 2) {
    lescano.isPunching = false;
  }
}
function muting() {
  if (!epicMusic.paused) {
    backgroundMusic.volume = 0;
  }
  if (document.getElementById("backgroundMusic").className === "musicOff") {
    document.getElementById("backgroundMusic").className = "musicOn";
    backgroundMusic.play();
    epicMusic.volume = 0.5;
  } else if (
    document.getElementById("backgroundMusic").className === "musicOn"
  ) {
    document.getElementById("backgroundMusic").className = "musicOff";
    epicMusic.volume = 0;
    backgroundMusic.pause();
  }
}
document.getElementById("backgroundMusic").addEventListener("click", muting);

function sayWinner({ armando, lescano, timerId }) {
  document.querySelector("#displayWinner").style.display = "flex";
  if (armando.health === lescano.health) {
    document.querySelector("#displayWinner").innerHTML = "EMPATE";
  } else if (armando.health > lescano.health) {
    document.querySelector("#displayWinner").innerHTML = "ARMANDO WINS";
  } else if (lescano.health > armando.health) {
    document.querySelector("#displayWinner").innerHTML = "LESCANO WINS";
  }
}

let timer = 20;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    // Animation.pause();
    setTimeout(() => {
      gameOver();
    }, 3000);
  }
}
// ------------------------------------START AND GAME OVER FUNCTIONS-------------------------------------
function startGame() {
  let gameContainer = document.getElementById("contenedor-juego");
  let startScreen = document.getElementById("start-screen");
  let gameOverScreen = document.getElementById("game-over");
  this.health = 100;
  document.querySelector("#armandoHealth").style.width = "100%";
  document.querySelector("#lescanoHealth").style.width = "100%";
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  backgroundMusic.pause();
  startBell.play();
  setTimeout(() => {
    gameContainer.style.display = "block";
    document.querySelector("#displayWinner").style.display = "none";
    armando.resetPosition();
    lescano.resetPosition();
    armando.health = 100;
    lescano.health = 100;
    timer = 20;
    decreaseTimer();
    epicMusic.play();
    epicMusic.volume = 0.5;
  }, 4000);
}

function gameOver() {
  let gameContainer = document.getElementById("contenedor-juego");
  let gameOverScreen = document.getElementById("game-over");
  gameOverScreen.style.display = "block";
  gameContainer.style.display = "none";
  epicMusic.volume = 0.2;
  if (timer === 0) {
    if (armando.health === lescano.health) {
      sayWinner({ armando, lescano, timerId });
    } else if (
      armando.health < lescano.health ||
      lescano.health < armando.health
    ) {
      sayWinner({ armando, lescano, timerId });
    }
  } else {
    sayWinner({ armando, lescano, timerId });
  }
}
