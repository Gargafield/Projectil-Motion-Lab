function findLaunchAngleWithAirResistance(
  initialVelocity,
  distance,
  targetHeight,
  dragCoefficient,
  projectileMass,
  projectileArea,
  airDensity = 1.225,
  gravity = 9.81,
  timeStep = 0.01
) {
  const radiansToDegrees = (radians) => (radians * 180) / Math.PI;
  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  // Function to simulate the projectile motion with air resistance
  function simulateMotion(angleRadians) {
    console.log(angleRadians);
    var entity = new Bullet(
      createVector(0, 0),
      createVector(
        cos(angleRadians) * initialVelocity,
        sin(angleRadians) * initialVelocity
      )
    );

    let t = 0;

    while (t < 50) {
      t += timeStep;
      entity.applyForce(createVector(0, GRAVITY * BULLET_MASS));
      entity.update();

      if (
        Math.abs(entity.position.y - distance) <= 1 &&
        Math.abs(entity.position.y - targetHeight) <= 1
      ) {
        return true; // Target hit
      }
    }

    return false; // Target missed
  }

  // Iterate over angles to find the one that hits the target
  for (let angleDegrees = 0; angleDegrees <= 90; angleDegrees += 0.1) {
    const angleRadians = degreesToRadians(angleDegrees);
    if (simulateMotion(angleRadians)) {
      return radiansToDegrees(angleRadians); // Return the successful angle
    }
  }

  return null; // No angle found
}

function solveTrajectory(pos1, pos2) {
  // Solve for alpha (launch angle) with projectile motion
  // pos1: start position
  // pos2: target position

  // Constants
  const g = GRAVITY;
  const v0 = SHOOT_SPEED;

  const x = pos2.x - pos1.x;
  const y = pos2.y - pos1.y;

  if (FEATURE_AIR_RESISTANCE) {
    let angle = findLaunchAngleWithAirResistance(
      v0,
      x,
      y,
      BULLET_AIR_RESISTANCE,
      0,
      BULLET_AREA,
      AIR_RESISTANCE,
      GRAVITY,
      0.01
    );

    if (angle !== null && angle !== false) {
      return { angle: angle, speed: v0 };
    }
  }

  console.log(x, y, g, v0);

  const a = (-g * Math.pow(x, 2)) / (2 * Math.pow(v0, 2));
  const b = x;
  const c = -y;

  const d = Math.pow(b, 2) - 4 * a * c;

  if (d < 0) {
    return 0.25 * Math.PI;
  }
  const tanTheta1 = (-b + Math.sqrt(d)) / (2 * a);
  const tanTheta2 = (-b - Math.sqrt(d)) / (2 * a);

  const angle1 = Math.atan(tanTheta1);
  const angle2 = Math.atan(tanTheta2);

  console.log(angle1, angle2);

  let angle = Math.max(angle1, angle2);

  // Adjust angle for air resistance
  // if (FEATURE_AIR_RESISTANCE) {
  //     angle *= 1.2;
  // }

  // angle += 0.25 * Math.PI;
  return { angle, speed: SHOOT_SPEED };
}
