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

function toggleBackgroundMute() {
    if (backgroundSound) {
      isBackgroundMuted = !isBackgroundMuted; 
      backgroundSound.volume = isBackgroundMuted ? 0 : 0.5; 
    }
  }
  

  function toggleSoundMute() {
    isSoundMuted = !isSoundMuted; 
    // Mute or unmute other sounds based on the value of isSoundMuted
    playerMoveSound.volume = isSoundMuted ? 0 : 1;
    pointSound.volume = isSoundMuted ? 0 : 1;
    enemySound.volume = isSoundMuted ? 0 : 1;
    wonSound.volume = isSoundMuted ? 0 : 1;
    lostSound.volume = isSoundMuted ? 0 : 1;
  }

export { loadBackgroundSound ,loadPlayerMoveSound, loadPointSound, loadEnemySound, loadWonSound, loadLostSound,
        toggleBackgroundMute, toggleSoundMute
 };
