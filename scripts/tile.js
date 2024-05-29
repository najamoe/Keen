function drawBlackTile(ctx, x, y, tileSize) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, tileSize, tileSize);
}

function drawWhiteTile(ctx, x, y, tileSize) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, tileSize, tileSize);
}

function drawBlueTile(ctx, x, y, tileSize) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, tileSize, tileSize);
}

function drawGreenTile(ctx, x, y, tileSize) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, tileSize, tileSize);
    const cornerRadius = 16; 
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + tileSize, y, x + tileSize, y + tileSize, cornerRadius);
    ctx.arcTo(x + tileSize, y + tileSize, x, y + tileSize, cornerRadius);
    ctx.arcTo(x, y + tileSize, x, y, cornerRadius);
    ctx.arcTo(x, y, x + tileSize, y, cornerRadius);
    ctx.closePath();
    ctx.fill();
}

function drawRedTile(ctx, x, y, tileSize) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, tileSize, tileSize);
    const cornerRadius = 16; 
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + tileSize, y, x + tileSize, y + tileSize, cornerRadius);
    ctx.arcTo(x + tileSize, y + tileSize, x, y + tileSize, cornerRadius);
    ctx.arcTo(x, y + tileSize, x, y, cornerRadius);
    ctx.arcTo(x, y, x + tileSize, y, cornerRadius);
    ctx.closePath();
    ctx.fill();
}
export { drawBlackTile, drawWhiteTile, drawBlueTile, drawGreenTile, drawRedTile };
