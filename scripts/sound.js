// sound.js

// Define a function to load a sound file
function loadSound(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => resolve(audio));
        audio.addEventListener('error', reject);
        audio.src = url;
    });
}

async function loadBackgroundSound() {
    return await loadSound('./sounds/bgsound.wav');
}

async function loadPlayerMoveSound() {
    return await loadSound('./sounds/player.wav');
}

async function loadPointSound() {
    return await loadSound('./sounds/point.wav');
}

async function loadEnemySound() {
    return await loadSound('./sounds/enemy.wav');
}

async function loadWonSound() {
    return await loadSound('./sounds/won.wav');
}

async function loadLostSound() {
    return await loadSound('./sounds/lost.wav');
}



export { loadBackgroundSound ,loadPlayerMoveSound, loadPointSound, loadEnemySound, loadWonSound, loadLostSound };
