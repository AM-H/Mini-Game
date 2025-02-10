class Scout {
    constructor(game) {
        this.game = game;
        
        
        this.sprite = ASSET_MANAGER.getAsset("./Scout.png");
        
        // Position and dimensions
        this.width = 64;
        this.height = 64;
        this.x = game.surfaceWidth / 2 - this.width / 2;
        this.y = game.surfaceHeight - this.height - 50;
        
        // Movement
        this.speed = 300;
        this.velocity = { x: 0, y: 0 };
        
        // Shooting
        this.lastShot = 0;
        this.shootCooldown = 250; // milliseconds
        
        this.removeFromWorld = false;
    }

    update() {

        if (!this.game.gameStarted) return;

        const TICK = this.game.clockTick;

        // Reset velocity
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Movement
        if (this.game.left) this.velocity.x = -this.speed;
        if (this.game.right) this.velocity.x = this.speed;
        if (this.game.up) this.velocity.y = -this.speed;
        if (this.game.down) this.velocity.y = this.speed;

        // Update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

        // Keep in bounds
        this.x = Math.max(0, Math.min(this.x, this.game.surfaceWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, this.game.surfaceHeight - this.height));

        // Shooting
        if (this.game.shoot) {
            const now = Date.now();
            if (now - this.lastShot >= this.shootCooldown) {
                this.shoot();
                this.lastShot = now;
            }
        }
    }

    shoot() {
        // Create bullet that goes straight up
        const bullet = new Bullet(
            this.game,
            this.x + this.width / 2,  
            this.y,                    
            -Math.PI/2,              
            500                       
        );
        this.game.addEntity(bullet);
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        
        if (params.debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}