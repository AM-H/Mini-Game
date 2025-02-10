class Bullet {
    constructor(game, x, y, angle, speed) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        
        this.width = 4;
        this.height = 12;  
        
        // Calculate velocity components
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        
        this.removeFromWorld = false;
    }

    update() {
        const TICK = this.game.clockTick;

        // Move bullet 
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

        // Check collision with enemies
        this.game.entities.forEach(entity => {
            if (entity instanceof Enemy) {
                if (this.x < entity.x + entity.width &&
                    this.x + this.width > entity.x &&
                    this.y < entity.y + entity.height &&
                    this.y + this.height > entity.y) {
                    // Collision detected
                    entity.removeFromWorld = true;  // Kill enemy
                    this.removeFromWorld = true;    // Remove bullet
                }
            }
        });

        
        if (this.y < -this.height || 
            this.y > this.game.surfaceHeight ||
            this.x < -this.width ||
            this.x > this.game.surfaceWidth) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
      
        ctx.save();
        
        
        ctx.translate(this.x, this.y);
        
        
        ctx.fillStyle = '#ff0';
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        ctx.restore();
        
        if (params.debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
    }
}