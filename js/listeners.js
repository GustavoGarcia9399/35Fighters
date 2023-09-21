window.addEventListener("keydown", (event) => {
  if (!armando.dead) {
    switch (event.key) {
      case "a":
        keys.a.pressed = true;
        armando.lastKey = "a";
        break;

      case "d":
        keys.d.pressed = true;
        armando.lastKey = "d";
        break;

      case "j":
        armando.punch();
        break;
    }
  }
  if (!lescano.dead) {
    switch (event.key) {
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        lescano.lastKey = "ArrowLeft";
        break;

      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        lescano.lastKey = "ArrowRight";
        break;

      case "u":
        lescano.punch();
        break;
    }
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Armando keys
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;

    // Lascano keys
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
  console.log(event.key);
});
