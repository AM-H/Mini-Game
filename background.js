class Background {
    constructor(game) {
        this.game = game;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./background.png");
    
        
        this.x = 0;
        this.y = 0;
        this.y2 = -this.game.surfaceHeight;
        this.scrollSpeed = 100;
    }

    update() {
        this.y += this.scrollSpeed * this.game.clockTick;
        this.y2 += this.scrollSpeed * this.game.clockTick;

        if (this.y >= this.game.surfaceHeight) {
            this.y = this.y2 - this.game.surfaceHeight;
        }
        if (this.y2 >= this.game.surfaceHeight) {
            this.y2 = this.y - this.game.surfaceHeight;
        }
    }

    draw(ctx) {
        
        ctx.drawImage(this.spritesheet, 0, this.y, this.game.surfaceWidth, this.game.surfaceHeight);
        ctx.drawImage(this.spritesheet, 0, this.y2, this.game.surfaceWidth, this.game.surfaceHeight);
    }
}