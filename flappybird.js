
// Board Details //
let board;
let boardWidth = 350;
let boardHeight = 640;
let context;

// Bird Details //
let birdWidth = 34; 
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

// Pipes //
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics //
let velocityX = -2; // Remember do negative to make pipes go left //
let velocityY = 0; // Bird jump speed, on 0 bird is not jumping. Negative means bird goes up, positive means bird goes down i think??
let gravity = 0.4; 

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

        //  Bird  Filler //
       // context.fillStyle = "purple";
       // context.fillRect(bird.x, bird.y, bird.width, bird.height);


            // Images //
    birdImg = new Image()
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", birdJump);
} 

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height)
// Bird Details
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // Will make sure bird  can't fly over screen //
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    // For Pipes //
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); 

        if (!pipe.passed && bird.x > pipe.x + pipe.width) // pipe.x is left corner of pipe, pipe.width gets right corner of pipe //
         {
            score +=0.5; // I had it as 1 but interval for score goes up by 2 since it's passing 2 pipes.
            pipe.passed = true;
        } 

        if(detectCollosion(bird, pipe))
            gameOver = true;
    }

    // Score stuff //
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("Game Over", 70, 320);
    }

}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);  // Should change pipe height, come back here if issue with pipe height //
    let space = board.height/4  // Space for bird to go through is 1/4th of board height, change if space is too big or too narrow

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth, 
        height : pipeHeight,
        passed : false
    }

pipeArray.push(topPipe);

let bottomPipe = {
    img : bottomPipeImg,
    x : pipeX,
    y: randomPipeY + pipeHeight + space,
    width : pipeWidth,
    height : pipeHeight,
    passed : false
}
pipeArray.push(bottomPipe);
}

function birdJump(e) {
    if (e.code == "Space") {
        velocityY = -6; 

    // Reset game //
        if (gameOver) {
            bird.y = birdY; // Only do bird Y because only birdY position changes //
            pipeArray = [];
            score = 0;
            gameOver = false;
    // Essentially just setting game back to starting state //
        }
    }
}
 
function detectCollosion (a, b){
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}