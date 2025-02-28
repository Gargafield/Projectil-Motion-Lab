
class Tank extends Entity {
    constructor(position, direction) {
        super(position, createVector(30, 20), 10);
        this.direction = direction;
    }
    
    draw() {
        push();
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        // draw the turret
        translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        rotate(this.direction.heading());
        rect(0, -5, 30, 10);
        
        pop();
    }
    
    getTurretPosition() {
        return createVector(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    }
    
    getBarrelEnd() {
        return p5.Vector.add(this.getTurretPosition(), p5.Vector.mult(this.direction, 30));
    }
    
    setDirection(direction) {
        this.direction = direction;
    }
    
    shoot() {
        let bullet = new Bullet(this.getBarrelEnd(), p5.Vector.mult(this.direction, SHOOT_SPEED));
        entities.push(bullet);
    }
}
