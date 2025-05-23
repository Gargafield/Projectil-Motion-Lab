new p5();

const FEATURE_TARGET_PRACTICE = true;
const FEATURE_BULLET = false;
var FEATURE_AIR_RESISTANCE = false;
const FEATURE_DEBUG_COLLISION = false;

var AIR_RESISTANCE = 0.5;
var GRAVITY = 1;
var SHOOT_SPEED = 15;

var entities = [];
var tank1 = null;
var tank2 = null;
var bullets = [];
var speedSlider;
var gravitySlider;
var airResistanceSlider;
var airResistanceCheckbox;
var player2Dropdown;

var player1 = null;
var player2 = null;
var ai = null;

function setup() {
  createCanvas(400, 400);

  entities.push(
    new StationaryEntity(createVector(0, 300), createVector(400, 100))
  );

  tank1 = new Tank(createVector(10, 275), createVector(20, -20), 1);
  tank2 = new Tank(createVector(300, 275), createVector(-20, -20), 1);
  entities.push(tank1);
  entities.push(tank2);

  speedSlider = createSlider(0, 40, SHOOT_SPEED, 1);
  speedSlider.position(10, 410);

  gravitySlider = createSlider(0, 10, GRAVITY, 1);
  gravitySlider.position(10, 430);

  airResistanceSlider = createSlider(0, 1, AIR_RESISTANCE, 0.1);
  airResistanceSlider.position(10, 450);

  if (FEATURE_AIR_RESISTANCE) {
    airResistanceSlider.show();
  } else {
    airResistanceSlider.hide();
  }

  airResistanceCheckbox = createCheckbox(
    "Air Resistance",
    FEATURE_AIR_RESISTANCE
  );
  airResistanceCheckbox.position(10, 470);

  player1 = new Player(tank1, PLAYER_1_CONTROLS);
  player2 = new Player(tank2, PLAYER_2_CONTROLS);
  ai = new AI(tank2);

  player2Dropdown = createSelect();
  player2Dropdown.position(348, 410);
  player2Dropdown.option("Player");
  player2Dropdown.option("AI");
  player2Dropdown.selected("Player");

  noiseSeed(random());
  background(220);
}

function draw() {
  background(220);

  // Gather user input
  SHOOT_SPEED = speedSlider.value();
  GRAVITY = gravitySlider.value();
  AIR_RESISTANCE = airResistanceSlider.value();
  FEATURE_AIR_RESISTANCE = airResistanceCheckbox.checked();

  if (FEATURE_AIR_RESISTANCE) {
    airResistanceSlider.show();
  } else {
    airResistanceSlider.hide();
  }

  let gravity = createVector(0, GRAVITY);

  if (FEATURE_TARGET_PRACTICE) {
    circle(mouseX, mouseY, 5);
  }

  // Kill any old bullets
  bullets = bullets.filter(({ bullet, time }) => {
    if (millis() - time > 5000) {
      entities = entities.filter((entity) => entity !== bullet);
      return false;
    }

    return true;
  });

  // Sort entities by y position, so that we can resolve collisions in the correct order
  entities.sort(
    (a, b) =>
      a.position.y + a.getVelocity().y - (b.position.y + b.getVelocity().y)
  );

  entities.forEach((entity) => {
    entity.applyForce(p5.Vector.mult(gravity, entity.mass));

    // Collision detection
    entities.forEach((other) => {
      if (entity !== other && entity.checkCollision(other)) {
        let force = p5.Vector.sub(
          p5.Vector.mult(entity.getVelocity(), entity.mass),
          p5.Vector.mult(other.getVelocity(), other.mass)
        );

        other.applyForce(force);
        entity.applyForce(force.mult(-1));
      }
    });

    entity.update();

    if (FEATURE_DEBUG_COLLISION) {
      // Visualize velocity
      line(
        entity.position.x + entity.size.x / 2,
        entity.position.y + entity.size.y / 2,
        entity.position.x + entity.velocity.x + entity.size.x / 2,
        entity.position.y + entity.velocity.y + entity.size.y / 2
      );
    }

    if (!FEATURE_DEBUG_COLLISION) {
      entity.draw();
    }
  });

  player1.doStep();
  player1.draw();

  let opponent = player2Dropdown.selected() === "Player" ? player2 : ai;

  opponent.doStep();
  opponent.draw();
}
