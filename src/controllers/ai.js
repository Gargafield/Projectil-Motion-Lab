
class AI extends Controller {
    constructor(tank) {
        super();
        
        this.tank = tank;
        this.debounce = 0;
    }
    
    getOpponent() {
        return player1 === null || player1 === this ? player2 : player1;
    }
    
    doStep() {
        let opponent = this.getOpponent().tank;
        let { angle, speed } = solveTrajectory(
            createVector(
                this.tank.position.x,
                this.tank.position.y + this.tank.size.y,
            ),
            createVector(
                opponent.position.x,
                opponent.position.y,
            ),
        );
        angle += Math.PI;

        this.tank.setDirection(p5.Vector.fromAngle(angle));
        
        // Shoot
        if (this.debounce <= 0) {
            this.debounce = 2000;
            this.tank.shoot();
        }
        this.debounce = Math.max(0, this.debounce - deltaTime);
    }
    
    draw() {

    }
}