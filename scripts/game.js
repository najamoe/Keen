import { drawMap, gameMap, playerPosition } from './map.js'; 
import { loadBackgroundSound, loadPlayerMoveSound, loadPointSound, loadEnemySound, loadWonSound, loadLostSound, toggleBackgroundMute, toggleSoundMute } from './sound.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const canvasWidth = 450;
const canvasHeight = 450;
const tileSize = 30;
const mapWidth = canvasWidth / tileSize;
const mapHeight = canvasHeight / tileSize;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let backgroundSound;
let playerMoveSound;
let pointSound;
let enemySound;
let wonSound;
let lostSound;
let isBackgroundMuted = false;
let isSoundMuted = false;

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', async () => {
    backgroundSound = await loadBackgroundSound();
    backgroundSound.loop = true;
    backgroundSound.volume = 0.1;
    backgroundSound.play();

    playerMoveSound = await loadPlayerMoveSound();
    pointSound = await loadPointSound();
    enemySound = await loadEnemySound();
    wonSound = await loadWonSound();
    lostSound = await loadLostSound();
});

let isPaused = false;
let points = 0;

const pauseGame = document.getElementById('pauseIcon');
pauseGame.addEventListener('click', async () => {
    isPaused = !isPaused;
    togglePlayPauseIcon();
    if (isPaused) {
        if (backgroundSound) {
            backgroundSound.pause();
        }
    } else {
        if (!isBackgroundMuted && backgroundSound) {
            backgroundSound.play();
        }
    }
});

const stopGame = document.getElementById('stopIcon');
stopGame.addEventListener('click', async () => {
    isPaused = true;
    togglePlayPauseIcon();
    if (backgroundSound) {
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
    }
});

function togglePlayPauseIcon() {
    const pauseIcon = document.getElementById('pauseIcon');
    const playIcon = document.getElementById('playIcon');
    if (isPaused) {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline-block';
    } else {
        pauseIcon.style.display = 'inline-block';
        playIcon.style.display = 'none';
    }
}

function updatePointsDisplay() {
    const pointsValue = document.getElementById('pointsValue');
    pointsValue.textContent = points;
}

function addPoints(value) {
    points += value;
    updatePointsDisplay();
}

function gameLost() {
    lostSound.play();
    backgroundSound.pause();
    alert("Game Over! You've run out of points.");
    resetGame();
}

function gameWon() {
  backgroundSound.pause();
    wonSound.play();
    alert("Congratulations! You've turned the entire map black.");
    resetGame();
}

function resetGame() {
  backgroundSound.pause();
  points = 0;
  updatePointsDisplay();
  playerPosition.x = Math.floor(Math.random() * mapWidth);
  playerPosition.y = Math.floor(Math.random() * mapHeight);
  for (let y = 0; y < gameMap.length; y++) {
      for (let x = 0; x < gameMap[y].length; x++) {
          gameMap[y][x] = 'background';
      }
  }
  placeRandomTiles('point', 10);
  placeRandomTiles('enemy', 5);
  gameMap[playerPosition.y][playerPosition.x] = 'player';
  
  // Start the game loop again
  gameLoop(ctx);
}



function placeRandomTiles(tile, count) {
  for (let i = 0; i < count; i++) {
      let x, y;
      do {
          x = Math.floor(Math.random() * mapWidth);
          y = Math.floor(Math.random() * mapHeight);
      } while (gameMap[y][x] !== 'background');
      gameMap[y][x] = tile;
  }
}

function gameLoop(ctx) {
    if (!isPaused) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawMap(ctx);
        if (!isBackgroundMuted && backgroundSound) {
            backgroundSound.play();
        }
    }
    requestAnimationFrame(() => gameLoop(ctx));
}

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    if (isPaused) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (event.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        default:
            return;
    }

    if (newX >= 0 && newY >= 0 && newX < mapWidth && newY < mapHeight) {
        const tile = gameMap[newY][newX];
        if (tile === 'point') {
            addPoints(1);
            pointSound.play();
        } else if (tile === 'enemy') {
            addPoints(-1);
            enemySound.play();
            if (points <= 0) {
                gameLost();
                return;
            }
        }

        gameMap[playerPosition.y][playerPosition.x] = 'path';
        playerPosition.x = newX;
        playerPosition.y = newY;
        gameMap[newY][newX] = 'player';

        drawMap(context);

        if (isMapCompletelyBlack()) {
            gameWon();
        }
    }
}

function isMapCompletelyBlack() {
    return gameMap.every(row => row.every(tile => tile === 'path' || tile === 'player'));
}

// Start the game loop
requestAnimationFrame(() => gameLoop(context));
