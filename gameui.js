class GameUI {
    constructor(game) {
        this.game = game;
        this.showHelp = true;  
        this.helpAlpha = 0.8;  
        
        // Add help toggle control to the canvas
        this.game.ctx.canvas.addEventListener('keydown', (e) => {
            if (e.code === 'KeyH') {
                this.toggleHelp();
            }
        });
    }

    toggleHelp() {
        this.showHelp = !this.showHelp;
        
        if (!this.showHelp) {
            this.game.gameStarted = true;
        }
    }

    draw(ctx) {
        if (this.showHelp) {
            
            ctx.fillStyle = `rgba(0, 0, 0, ${this.helpAlpha})`;
            ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);

            // White border for the menu
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(50, 50, this.game.surfaceWidth - 100, this.game.surfaceHeight - 100);

            // Help menu text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            
            const centerX = this.game.surfaceWidth / 2;
            let y = this.game.surfaceHeight / 3;
            const lineHeight = 40;

            // Title
            ctx.fillText('SPACE DEFENDER CONTROLS', centerX, y);
            y += lineHeight * 1.5;

            // Controls
            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText('Movement: Arrow Keys or WASD', centerX, y);
            y += lineHeight;
            ctx.fillText('Shoot: SPACE', centerX, y);
            y += lineHeight;
            ctx.fillText('Toggle Help: H', centerX, y);
            y += lineHeight;
            ctx.fillText('Debug Mode: P', centerX, y);
            y += lineHeight * 1.5;
            
            // Instructions
            ctx.fillStyle = '#ffd700';
            ctx.font = '22px Arial';
            ctx.fillText('Press H to start the game!', centerX, y);
        }
    }
}