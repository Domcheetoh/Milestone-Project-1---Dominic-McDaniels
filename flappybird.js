
// Board Details //
let board;
let boardWidth = 360;
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
    context.clearRect(0, 0, board.width, board.height)
// Bird Details
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // Will make sure bird  can't fly over screen //
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // For Pipes //
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); 
    }
}

function placePipes() {

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
    }
}
 