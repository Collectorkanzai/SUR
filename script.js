// Get the canvas element and attach the graphics context to variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the bird's properties
let bird = {
    x: 50,            // Starting x position
    y: 150,           // Starting y position
    width: 20,        // Width of the bird
    height: 20,       // Height of the bird
    gravity: 0.5,     // Gravity effect
    lift: -7,         // Lift when a key is pressed
    velocity: 0       // Starting velocity
};

// Create an array for pipes and define variables for pipes
let pipes = [];
let pipeWidth = 40;
let gap = 100;
let interval = 90;    // Frames between generating new pipes
let frameCount = 0;
let score = 0;        // Variable to keep track of score

// Function to draw the bird
function drawBird() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Update the bird's position and handle restart on collision with the edge
function updateBird() {
    bird.velocity += bird.gravity; // Add gravity to velocity
    bird.y += bird.velocity;       // Update the bird's vertical position

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        resetGame();  // Reset the game if the bird hits the edge
    }
}

// Draw pipes on the canvas
function drawPipes() {
    for (let i = pipes.length - 1; i >= 0; i--) {
        let pipe = pipes[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    }
}

// Update the position of the pipes and generate new pipes
function updatePipes() {
    frameCount++;
    if (frameCount % interval === 0) {
        let top = Math.floor(Math.random() * (canvas.height / 2));
        let bottom = canvas.height - top - gap;
        pipes.push({ x: canvas.width, top, bottom });
    }
    pipes.forEach(pipe => {
        if (pipe.x === bird.x) {  // When a pipe passes the bird's starting position, increase the score
            score++;
        }
        pipe.x -= 2;
    });
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

// Check for collisions between the bird and the pipes
function checkCollision() {
    for (let pipe of pipes) {
        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
            resetGame();
        }
    }
}

// Reset the game on collision or edge
function resetGame() {
    bird.y = 150;       // Reset the bird's position
    bird.velocity = 0;  // Reset velocity
    pipes = [];         // Empty the array of pipes
    frameCount = 0;     // Reset frame counter
    score = 0;          // Reset the score when the game is reset
}

// Function to draw the score on the canvas
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, canvas.height - 20);  // Display the score
}

// Handle user input via keyboard (space bar)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        bird.velocity = bird.lift;  // Give the bird a lift
    }
});

// Function to handle the "Go to mint" button click
function goToMint() {
    window.location.href = "https://luminex.io/rune/SURVIVAL%E2%80%A2OF%E2%80%A2THE%E2%80%A2FITTEST";  // Replace with the actual URL
}

// The main game loop: continuously updates and draws the game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas of previous frames
    drawBird();       // Draw the bird on the canvas
    updateBird();     // Update the bird's position and velocity
    drawPipes();      // Draw pipes on the canvas
    updatePipes();    // Update the position of pipes and generate new ones
    checkCollision(); // Check for collisions between the bird and pipes
    drawScore();      // Draw the score each frame
    requestAnimationFrame(gameLoop);  // Request to run the next frame in the animation
}

gameLoop();  // Start the game by calling the gameLoop function
