function solveTrajectory(pos1, pos2) {
    // Solve for alpha (launch angle) with projectile motion
    // pos1: start position
    // pos2: target position
    
    // Constants
    const g = GRAVITY;
    const v0 = SHOOT_SPEED;
    
    const x = pos2.x - pos1.x;
    const y = pos2.y - pos1.y;
    
    console.log(x, y, g, v0);

    const a = -g * Math.pow(x, 2) / (2 * Math.pow(v0, 2));
    const b = x;
    const c = -y;

    const d = Math.pow(b, 2) - 4 * a * c;

    if (d < 0) {
        throw new Error("No real solutions exist for the given parameters.");
    }
    const tanTheta1 = (-b + Math.sqrt(d)) / (2 * a);
    const tanTheta2 = (-b - Math.sqrt(d)) / (2 * a);

    const angle1 = Math.atan(tanTheta1);
    const angle2 = Math.atan(tanTheta2);
    
    console.log(angle1, angle2);
    
    let angle = Math.max(angle1, angle2);
    
    // Adjust angle for air resistance
    if (FEATURE_AIR_RESISTANCE) {
        angle *= 1.2;
    }
    
    // angle += 0.25 * Math.PI;
    return { angle, speed: SHOOT_SPEED };
}
