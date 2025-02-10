class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.gameStarted = false;  
        
        // Input states
        this.keys = {};
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.shoot = false;
    }

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    }

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    }

    startInput() {
        const canvas = this.ctx.canvas;

        canvas.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.down = true;
                    break;
                case "Space":
                    this.shoot = true;
                    break;
            }
            e.preventDefault();
        });

        canvas.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.down = false;
                    break;
                case "Space":
                    this.shoot = false;
                    break;
            }
            e.preventDefault();
        });
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);

        
        this.entities.filter(entity => entity instanceof Background)
            .forEach(entity => entity.draw(this.ctx, this));

       
        this.entities.filter(entity => entity instanceof Enemy)
            .forEach(entity => entity.draw(this.ctx, this));

        
        this.entities.filter(entity => entity instanceof Bullet || entity instanceof EnemyBullet)
            .forEach(entity => entity.draw(this.ctx, this));

        
        this.entities.filter(entity => entity instanceof Scout)
            .forEach(entity => entity.draw(this.ctx, this));

        
        if (this.ui) {
            this.ui.draw(this.ctx);
        }
    }

    update() {
        // Update all entities
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        // Remove entities marked for deletion
        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }
}