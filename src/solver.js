function solveTrajectory(pos1, pos2) {
  // Constants
  const g = GRAVITY;
  const v0 = SHOOT_SPEED;

  const x = pos2.x - pos1.x;
  const y = pos2.y - pos1.y;

  const a = (g * Math.pow(x, 2)) / (2 * Math.pow(v0, 2));
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

  console.log(d, angle1, angle2);

  let angle = angle1;

  return { angle, speed: SHOOT_SPEED };
}
