import { drawMap, imageNames, gameMap } from './map.js'; // Import drawMap instead of loadImages

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Define canvas size and tile size
const canvasWidth = 450;
const canvasHeight = 450;

// Set canvas size
canvas.width = canvasWidth;
canvas.height = canvasHeight;

requestAnimationFrame(() => gameLoop(context)); // Pass context here

function gameLoop(ctx) { // Add ctx as a parameter
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawMap(ctx); // Pass ctx here
  console.log('Gameloop running');
}

// Listen for keydown events and handle player controls
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  switch(event.key) {
    case 'ArrowUp':
      movePlayer('up');
      break;
    case 'ArrowDown':
      movePlayer('down');
      break;
    case 'ArrowLeft':
      movePlayer('left');
      break;
    case 'ArrowRight':
      movePlayer('right');
      break;
    case ' ':
      shoot();
      break;
    default:
      // Ignore other key presses
      break;
  }
}

