import { drawMap, imageNames, gameMap } from './map.js'; 
import { loadBackgroundSound ,loadPlayerMoveSound, loadPointSound, loadEnemySound, loadWonSound, loadLostSound, toggleBackgroundMute, toggleSoundMute } from './sound.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Define canvas size and tile size
const canvasWidth = 450;
const canvasHeight = 450;

// Set canvas size
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
  togglePlayPauseIcon(); // Toggle play/pause icon
  if (isPaused) {
    // Pause the game logic or animations
    // Stop background music
    if (backgroundSound) {
      backgroundSound.pause();
    }
  } else {
    // Resume the game logic or animations
    // Resume background music if it was muted before
    if (!isBackgroundMuted && backgroundSound) {
      backgroundSound.play();
    }
  }
});

const stopGame = document.getElementById('stopIcon'); // Get stop icon element
stopGame.addEventListener('click', async () => {
  isPaused = true; // Pause the game
  togglePlayPauseIcon(); // Show play icon
  backgroundSound.pause();
  
  // Stop background music
  if (backgroundSound) {
    backgroundSound.pause();
    backgroundSound.currentTime = 0; // Rewind the background music to the beginning
  }
  // Additional actions to reset the game
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

function gameLost(){
  //If the pointvalue is 0, the game is lost
  
  lostSound.play();

  //Insert restart game button at the gameCanvas
}


let playerPosition = { x: 3, y: 3 }; // Set initial player position

requestAnimationFrame(() => gameLoop(context)); 

function gameLoop(ctx) { 
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawMap(ctx); 
  if (!isBackgroundMuted && backgroundSound) {
    backgroundSound.play();
}
  console.log('Gameloop running');
}

// Listen for keydown events and handle player controls
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  if (isPaused) return; // Ignore key presses if the game is paused

  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch(event.key) {
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
    case ' ':
      shoot();
      return;
    default:
     
      return;
  }

  if (newX >= 0 && newY >= 0 && newX < gameMap[0].length && newY < gameMap.length) {
    // Check the tile the player is moving to
    const tile = gameMap[newY][newX];
    if (tile === 'point') {
      addPoints(1);
      gameMap[newY][newX] = 'path'; // Clear the point from the map
    } else if (tile === 'enemy') {
      addPoints(-1);
    }
    playerPosition.x = newX;
    playerPosition.y = newY;
    drawMap(context);
  }
}
