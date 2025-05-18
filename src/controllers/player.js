
const AIM_VEC_UP = createVector(0, -0.05);
const AIM_VEC_DOWN = createVector(0, 0.05);

const MOVE_VEC_LEFT = createVector(-1, 0);
const MOVE_VEC_RIGHT = createVector(1, 0);

const PLAYER_1_CONTROLS = [
    // WASD
    87, 65, 83, 68,
    // Space
    32,
]

const PLAYER_2_CONTROLS = [
    // Arrow keys
    UP_ARROW, LEFT_ARROW, DOWN_ARROW, RIGHT_ARROW,
    // Enter
    13,
]

class Player extends Controller {
    constructor(tank, controls) {
        super();
        
        this.tank = tank;
        this.controls = controls;
        this.direction = this.tank.direction.copy();
        this.debounce = 0;
    }
    
    doStep() {
        // Up
        if (keyIsDown(this.controls[0])) {
            this.direction = p5.Vector.add(this.tank.direction, AIM_VEC_UP);
        }
        // Down
        if (keyIsDown(this.controls[2])) {
            this.direction = p5.Vector.add(this.tank.direction, AIM_VEC_DOWN);
        }
        
        // Left
        if (keyIsDown(this.controls[1])) {
            this.tank.position = p5.Vector.add(this.tank.position, MOVE_VEC_LEFT);
        }
        // Right
        if (keyIsDown(this.controls[3])) {
            this.tank.position = p5.Vector.add(this.tank.position, MOVE_VEC_RIGHT);
        }
        
        this.tank.setDirection(this.direction.copy().normalize());
        
        // Shoot
        if (keyIsDown(this.controls[4]) && this.debounce <= 0) {
            this.debounce = 2000;
            this.tank.shoot();
        }
        this.debounce = Math.max(0, this.debounce - deltaTime);
    }
    
    draw() {
        // Draw aim line
        let angle = Math.atan2(this.direction.y, this.direction.x);
        let lastPos = this.tank.getBarrelEnd();
        for (let i = 1; i < 20; i++) {
            let pos;
            
            // We use 0.54 to make up with some discrepancy in the physics engine
            pos = createVector(
                this.tank.getBarrelEnd().x + SHOOT_SPEED * Math.cos(angle) * i,
                this.tank.getBarrelEnd().y + 0.54 * GRAVITY * Math.pow(i, 2) + SHOOT_SPEED * Math.sin(angle) * i
            )
            
            line(lastPos.x, lastPos.y, pos.x, pos.y);
            lastPos = pos;
        }
    }
}