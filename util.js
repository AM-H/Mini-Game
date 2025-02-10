// Parameters and debug settings
const params = {
    debug: false
};

// Timer class
class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    }

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    }
}

// Animation frame request
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Utility functions
const randomInt = n => Math.floor(Math.random() * n);

const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// Constants for game world
const GAME_CONSTANTS = {
    WIDTH: 800,
    HEIGHT: 900,
    PLAYER_SPEED: 300,
    BULLET_SPEED: 500,
    ENEMY_SPEED: 150
};