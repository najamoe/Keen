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

  // Reset the game map
  for (let y = 0; y < gameMap.length; y++) {
      for (let x = 0; x < gameMap[y].length; x++) {
          gameMap[y][x] = 'background';
      }
  }

  // Place points and enemies
  placeRandomTiles('point', 10);
  placeRandomTiles('enemy', 5);

  // Place the player
  const playerX = Math.floor(Math.random() * mapWidth);
  const playerY = Math.floor(Math.random() * mapHeight);
  gameMap[playerY][playerX] = 'player';
  playerPosition.x = playerX;
  playerPosition.y = playerY;

  drawMap(context);
}

function placeRandomTiles(tile, count) {
  const visited = new Set();
  const queue = [];

  // Start with the player's position
  const startX = playerPosition.x;
  const startY = playerPosition.y;
  visited.add(`${startX},${startY}`);
  queue.push({ x: startX, y: startY });

  while (queue.length > 0 && count > 0) {
      const { x, y } = queue.shift();
      gameMap[y][x] = tile;
      count--;

      // Shuffle the directions to visit neighbors randomly
      const directions = [
          { dx: 1, dy: 0 },  // Right
          { dx: -1, dy: 0 }, // Left
          { dx: 0, dy: 1 },  // Down
          { dx: 0, dy: -1 }  // Up
      ].sort(() => Math.random() - 0.5);

      for (const { dx, dy } of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && ny >= 0 && nx < mapWidth && ny < mapHeight) {
              const key = `${nx},${ny}`;
              if (!visited.has(key)) {
                  visited.add(key);
                  queue.push({ x: nx, y: ny });
              }
          }
      }
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
