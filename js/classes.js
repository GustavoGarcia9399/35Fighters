class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

// ------------------------------------ class fighter------------------------------------
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    punchBox = {
      offset: {},
      width: undefined,
      height: undefined,
    },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.velocity = velocity;
    this.width = 75;
    this.height = 250;
    this.lastKey;

    this.punchBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: punchBox.offset,
      width: punchBox.width,
      height: punchBox.height,
    };
    (this.initialPosition = {
      x: this.position.x,
      y: this.position.y,
    }),
      (this.color = color);
    this.isPunching;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.dead = false;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    this.punchBox.position.x = this.position.x + this.punchBox.offset.x;
    this.punchBox.position.y = this.position.y + this.punchBox.offset.y;
    // c.fillRect(
    //   this.punchBox.position.x,
    //   this.punchBox.position.y,
    //   this.punchBox.width,
    //   this.punchBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 90) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
  punch() {
    if (timer > 0) {
      this.switchSprite("punch");
      this.isPunching = true;
    }
  }

  hit() {
    this.health -= 5;
    if (!this.dead) {
      if (this.health <= 0) {
        this.switchSprite("death");
        dyingMoan.play();
        setTimeout(() => {
          gameOver();
        }, 3000);
      } else {
        this.switchSprite("hit");
        punch.play();
      }
    }
  }
  resetPosition() {
    this.image = this.sprites.idle.image;
    // this.switchSprite("idle");
    this.health = 100;
    this.dead = false;
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;
  }
  // ------------------------------------------------------------------------------------------
  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      clearTimeout(timerId);
      return;
    }

    if (
      this.image === this.sprites.punch.image &&
      this.framesCurrent < this.sprites.punch.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.hit.image &&
      this.framesCurrent < this.sprites.hit.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "walk":
        if (this.image !== this.sprites.walk.image) {
          this.image = this.sprites.walk.image;
          this.framesMax = this.sprites.walk.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "punch":
        if (this.image !== this.sprites.punch.image) {
          this.image = this.sprites.punch.image;
          this.framesMax = this.sprites.punch.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "hit":
        if (this.image !== this.sprites.hit.image) {
          this.image = this.sprites.hit.image;
          this.framesMax = this.sprites.hit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
