class Enemy {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 48;
        

        //Images are flickering

        // Movement
        this.speed = 100;
        this.direction = 1; // 1 for right, -1 for left
        
        // Shooting
        this.lastShot = 0;
        this.shootCooldown = 2000; // Time between shots in milliseconds
        
  
        this.sprite = ASSET_MANAGER.getAsset("./Enemy.png");
        this.animator = new Animator(this.sprite, 0, 0, 48, 48, 1, 0.1);
        
        this.removeFromWorld = false;
    }

    update() {

        if (!this.game.gameStarted) return;


        const TICK = this.game.clockTick;
        
        //fix behavior later  
        // Basic movement - side to side
        this.x += this.speed * this.direction * TICK;

        // Reverse direction at screen edges fixing later to add more stuff and a major boss
        if (this.x <= 0 || this.x >= this.game.surfaceWidth - this.width) {
            this.direction *= -1;
        }           
            
        // Shooting logic
        const now = Date.now();
        if (now - this.lastShot >= this.shootCooldown) {
            this.shoot();
            this.lastShot = now;
        }
    }

    shoot() {
        // Create enemy bullet
        const bullet = new EnemyBullet(
            this.game,
            this.x + this.width / 2,
            this.y + this.height,
            500 // Bullet speed
        );
        this.game.addEntity(bullet);
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        
        if (params.debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

class EnemyBullet {
    constructor(game, x, y, speed) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = speed;
        
        this.width = 4;
        this.height = 10;
        
        this.removeFromWorld = false;
    }

    update() {
        const TICK = this.game.clockTick;

        // Move bullet down
        this.y += this.speed * TICK;

        // Remove if off screen
        if (this.y > this.game.surfaceHeight) {
            this.removeFromWorld = true;
        }

        // Check collision with player
        const player = this.game.entities.find(entity => entity instanceof Scout);
        if (player) {
            if (this.x < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y < player.y + player.height &&
                this.y + this.height > player.y) {
                // Hit player
                console.log("Player hit!");
                this.removeFromWorld = true;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
        
        if (params.debug) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.width/2, this.y, this.width, this.height);
        }
    }
}