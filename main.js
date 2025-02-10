
const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// Queue downloads
ASSET_MANAGER.queueDownload("./Scout.png");
ASSET_MANAGER.queueDownload("./Enemy.png");
ASSET_MANAGER.queueDownload("./Background.png");


ASSET_MANAGER.downloadAll(() => {
    
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    
    
    canvas.focus();

   
    gameEngine.init(ctx);

    // adding sounds later
    //gameEngine.soundManager = new SoundManager();

 
    gameEngine.ui = new GameUI(gameEngine);

    
    gameEngine.addEntity(new Background(gameEngine));
3
    // Add enemies
    for (let i = 0; i < 3; i++) {
        const enemy = new Enemy(
            gameEngine,
            100 + i * 250, // Spread enemies across screen
            100 
        );
        gameEngine.addEntity(enemy);
    }

   
    const scout = new Scout(gameEngine);
    gameEngine.addEntity(scout);

    
    gameEngine.start();
});


const gameWorld = {
    width: GAME_CONSTANTS.WIDTH,
    height: GAME_CONSTANTS.HEIGHT
};
