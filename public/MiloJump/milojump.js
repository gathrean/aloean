// Board
// based on the dimensions of background image
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// Milo
let miloWidth = 46 * 1.75;
let miloHeight = 46 * 1.75;
let miloX = boardWidth / 2 - miloWidth / 2;
let miloY = boardHeight * 7 / 8 - miloHeight;
let miloRightImg;
let miloLeftImg;

let milo = {
    img: null,
    x: miloX,
    y: miloY,
    width: miloWidth,
    height: miloHeight
}

// Physics
let velocityX = 0;
let velocityY = 0;  // Milo jump speed
let initialVelocityY = -8; // Starting velocity Y
let gravity = 0.3;

// Platforms
let platformArray = [];
let platformWidth = 60 * 1.25;
let platformHeight = 18 * 1.25;
let platformImg;

// Scores
let score = 0;
let maxScore = 0;
let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    // load images
    miloRightImg = new Image();
    miloRightImg.src = "./milo-right.png";
    milo.img = miloRightImg;
    miloRightImg.onload = function () {
        context.drawImage(milo.img, milo.x, milo.y, milo.width, milo.height);
    }

    miloLeftImg = new Image();
    miloLeftImg.src = "./milo-left.png";

    platformImg = new Image();
    platformImg.src = "./platform.png"

    velocityY = initialVelocityY;
    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveMilo);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Milo
    milo.x += velocityX;
    if (milo.x > boardWidth) {
        milo.x = 0;
    }
    else if (milo.x + milo.width < 0) {
        milo.x = boardWidth;
    }

    velocityY += gravity;
    milo.y += velocityY;

    // Keep Milo within bounds
    if (milo.y > board.height) {
        gameOver = true;
    }
    context.drawImage(milo.img, milo.x, milo.y, milo.width, milo.height);

    // Adjust platforms when Milo goes higher than 1/3 of the screen
    let playerThreshold = boardHeight / 3;
    if (velocityY < 0 && milo.y < playerThreshold) {
        let offset = playerThreshold - milo.y;
        milo.y = playerThreshold; // Lock player position
        for (let platform of platformArray) {
            platform.y += offset; // Move platforms down
        }
    }

    // Platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && milo.y < boardHeight * 3 / 4) {
            platform.y -= initialVelocityY; // slide platform down
        }
        if (detectCollision(milo, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; // Jump off platform
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // Remove old platforms and add new ones
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift();
        newPlatform();
    }

    // Score
    updateScore();
    context.fillStyle = "black";

    // Set font size for the score
    context.font = "24px sans-serif";
    context.fillText(score, 5, 20);

    // Game Over message
    if (gameOver) {
        // Set a different font size for the Game Over message
        context.font = "16px sans-serif";
        context.fillText("Game Over: Press 'Space' to Restart", boardWidth / 7, boardHeight * 7 / 8);
    }
}

function moveMilo(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") { // move right
        velocityX = 4;
        milo.img = miloRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") { // move left
        velocityX = -4;
        milo.img = miloLeftImg;
    }
    else if (e.code == "Space" && gameOver) {
        // Reset
        milo = {
            img: miloRightImg,
            x: miloX,
            y: miloY,
            width: miloWidth,
            height: miloHeight
        }

        velocityX = 0;
        velocityY = initialVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false;
        placePlatforms();
    }
}

function placePlatforms() {
    platformArray = [];
    const platformSpacing = 175; // Divide the height into 5 sections

    // Starting Platform (at the bottom)
    let platform = {
        img: platformImg,
        x: boardWidth / 2 - platformWidth / 2,
        y: boardHeight - platformHeight,
        width: platformWidth,
        height: platformHeight
    };

    platformArray.push(platform);

    // Additional Platforms
    for (let i = 1; i <= 4; i++) {
        let randomX = Math.floor(Math.random() * 0.5 * (boardWidth - platformWidth)); // Ensure the platform fits within the width
        let platform = {
            img: platformImg,
            x: randomX,
            y: boardHeight - platformSpacing * i,
            width: platformWidth,
            height: platformHeight
        };

        platformArray.push(platform);
    }
}

function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth * 3 / 4); // (0 - 1) * boardWidth * 3 / 4
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&       // a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&          // a's top right corner passes b's top left corner
        a.y < b.y + b.height &&         // a's top left corner doesn't reach b's top left corner
        a.y + a.height > b.y;           // a's bottom left corner passes b's top left corner
}

function updateScore() {
    let points = Math.floor(1.5 * Math.random()); // (0-1) * 50 --> (0-50)
    if (velocityY < 0) { // Negative going up
        maxScore += points;
        if (score < maxScore) {
            score = maxScore;
        }
    }
    else if (velocityY >= 0) {
        maxScore -= points;
    }
}

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    // Load images
    miloRightImg = new Image();
    miloRightImg.src = "./milo-right.png";
    milo.img = miloRightImg;
    miloRightImg.onload = function () {
        context.drawImage(milo.img, milo.x, milo.y, milo.width, milo.height);
    }

    miloLeftImg = new Image();
    miloLeftImg.src = "./milo-left.png";

    platformImg = new Image();
    platformImg.src = "./platform.png"

    velocityY = initialVelocityY;
    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveMilo);

    // Button event listeners
    document.getElementById("leftButton").addEventListener("click", () => {
        simulateKeyPress("ArrowLeft");
    });

    document.getElementById("rightButton").addEventListener("click", () => {
        simulateKeyPress("ArrowRight");
    });

    document.getElementById("spaceButton").addEventListener("click", () => {
        simulateKeyPress("Space");
    });
}

// Simulate key presses
function simulateKeyPress(key) {
    const event = new KeyboardEvent("keydown", { code: key });
    moveMilo(event);
}

// prevent zooming in through double-tap on mobile
let lastTouchEnd = 0;

document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
