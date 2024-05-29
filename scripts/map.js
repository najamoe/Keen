import { drawBlackTile, drawWhiteTile , drawBlueTile, drawRedTile, drawGreenTile } from './tile.js';

const tileSize = 30;
const images = {};

const imageNames = [
    'path', 'background', 'point', 'player', 'enemy'
];

const gameMap = [
    ['path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'point', 'path', 'path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'background', 'background', 'path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'background', 'background', 'path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'path', 'path', 'path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['path', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'green2', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'background', 'background', 'enemy', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background'],
    ['background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background', 'background']
];


function drawMap(ctx) {
    // Gennemgå rækkerne i kortet
    for (let y = 0; y < gameMap.length; y++) {
        // Gennemgå fliserne i hver række
        for (let x = 0; x < gameMap[y].length; x++) {
            // Tjek hvilken type flise det er
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
                // Andre typer fliser kan tilføjes her
            }
        }
    }
}

export { imageNames, gameMap, drawMap };