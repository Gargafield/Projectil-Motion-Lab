
const BULLET_RADIUS = 5;
const BULLET_MASS = 1;
const BULLET_AIR_RESISTANCE = 0.5;
const BULLET_AREA = BULLET_RADIUS ^ 2 * Math.PI;

class Bullet extends Entity {
    constructor(position, velocity) {
        super(position, createVector(BULLET_RADIUS * 2, BULLET_RADIUS * 2), BULLET_MASS);
        this.velocity = velocity;
    }
    
    getArea() {
        return BULLET_AREA;
    }
    
    getAirResistanceCoefficient() {
        return BULLET_AIR_RESISTANCE;
    }
    
    draw() {
        ellipse(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, this.size.x);
    }
}
