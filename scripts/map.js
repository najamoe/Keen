import { drawBlackTile, drawWhiteTile , drawBlueTile, drawRedTile, drawGreenTile } from './tile.js';

const tileSize = 30;
const canvasWidth = 450;
const canvasHeight = 450;
const mapWidth = canvasWidth / tileSize;
const mapHeight = canvasHeight / tileSize;

const gameMap = Array.from({ length: mapHeight }, () => Array(mapWidth).fill('background'));

// Randomly place points and enemies
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

// Initialize player position
let playerPosition = { x: Math.floor(Math.random() * mapWidth), y: Math.floor(Math.random() * mapHeight) };

// Ensure the player's start position is on a white tile
gameMap[playerPosition.y][playerPosition.x] = 'player';

// Place points and enemies
placeRandomTiles('point', 10); // Adjust the count as needed
placeRandomTiles('enemy', 5);  // Adjust the count as needed

function drawMap(ctx) {
    for (let y = 0; y < gameMap.length; y++) {
        for (let x = 0; x < gameMap[y].length; x++) {
            switch (gameMap[y][x]) {
                case 'path':
                    drawBlackTile(ctx, x * tileSize, y * tileSize, tileSize);
                    break;
                case 'background':
                    drawWhiteTile(ctx, x * tileSize, y * tileSize, tileSize);
                    break;
                case 'point':
                    drawGreenTile(ctx, x * tileSize, y * tileSize, tileSize);
                    break;
                case 'player':
                    drawBlueTile(ctx, x * tileSize, y * tileSize, tileSize);
                    break;
                case 'enemy':
                    drawRedTile(ctx, x * tileSize, y * tileSize, tileSize);
                    break;
            }
        }
    }
}

export { gameMap, drawMap, playerPosition };
