
class Entity {
    constructor(position, size, mass) {
        this.position = position;
        this.size = size
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = mass;
    }
    
    getVelocity() {
        return p5.Vector.add(this.velocity, this.acceleration);
    }
    
    getArea() {
        return this.size.x * this.size.y;
    }
    
    getAirResistanceCoefficient() {
        return 1.05;
    }
    
    update() {
        let vel = this.getVelocity();
        if (FEATURE_AIR_RESISTANCE && vel.magSq() > 0) {
            let dir = vel.copy().normalize();
            let drag = AIR_RESISTANCE * this.getAirResistanceCoefficient();
            
            this.applyForce(dir.mult(-1).mult(drag));
        }
        
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
        this.position.add(this.velocity);
    }
    
    applyForce(force) {
        let f = p5.Vector.div(force.copy(), this.mass);
        this.acceleration.add(f);
    }
    
    // Simple AABB collision detection
    checkCollision(other) {
        var pos1 = this.position.copy().add(this.getVelocity());
        var pos2 = other.position.copy().add(other.getVelocity());
        
        let result = pos1.x < pos2.x + other.size.x &&
               pos1.x + this.size.x > pos2.x &&
               pos1.y < pos2.y + other.size.y &&
               pos1.y + this.size.y > pos2.y;
        
        if (result && FEATURE_DEBUG_COLLISION) {
            stroke(255, 0, 0);

            rect(pos1.x, pos1.y, this.size.x, this.size.y);
            rect(pos2.x, pos2.y, other.size.x, other.size.y);
            line(pos1.x, pos1.y, pos2.x, pos2.y);
            // console.log(this.size.mag());

            stroke(0);
        }
        
        return result;
    }
    
    draw() {
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class StationaryEntity extends Entity {
    constructor(position, size) {
        super(position, size, 100000);
    }
    
    applyForce() {
        // Do nothing
    }
    
    update() {
        // Do nothing
    }
}
