// Get the game canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an engine and a renderer using Matter.js
const engine = Matter.Engine.create();
const render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,
        background: '#333333'
    }
});

// Create the ball using Matter.js
const ball = Matter.Bodies.circle(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 20, {
    frictionAir: .005,
    restitution: .35,
    render: {
        fillStyle: 'lightblue'
    }
});

// Create the walls using Matter.js
const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: 'lightcoral'
    }
};

wall_width = 100
const wallTop = Matter.Bodies.rectangle(canvas.width / 2, -wall_width/2, canvas.width, wall_width, wallOptions);
const wallBottom = Matter.Bodies.rectangle(canvas.width / 2, canvas.height+wall_width/2, canvas.width, wall_width, wallOptions);
const wallLeft = Matter.Bodies.rectangle(-wall_width/2, canvas.height / 2, wall_width, canvas.height, wallOptions);
const wallRight = Matter.Bodies.rectangle(canvas.width+wall_width/2, canvas.height / 2, wall_width, canvas.height, wallOptions);

// Add the ball and walls to the world
Matter.World.add(engine.world, [ball, wallTop, wallBottom, wallLeft, wallRight]);

// Define movement control variables
let movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Define movement speed variables
const acceleration = 0.02; // Acceleration factor per frame

// Update the ball's velocity based on movement controls
function updateBallVelocity() {
    velocity = [0, 0]
    if (movement.up) {
        velocity[0] -= acceleration;
    }
    if (movement.down) {
        velocity[0] += acceleration;
    }
    if (movement.left) {
        velocity[1] -= acceleration;
    }
    if (movement.right) {
        velocity[1] += acceleration;
    }

    if(movement.up || movement.down || movement.left || movement.right) {
        Matter.Body.applyForce(ball, ball.position, { x: velocity[1], y: velocity[0] });
        console.log(velocity[0] + " " + velocity[1]);
    }
}

// Update the current movement speed
function updateMovementSpeed() {
    if (!movement.up && !movement.down) {
        velocity[0] *= 0.9;
    }
    if (!movement.right && !movement.left) {
        // Reset the current speed when no movement keys are pressed
        velocity[1] *= 0.9;
    }
}

// Game loop function
function gameLoop() {
    // Update game state
    updateBallVelocity();
    updateMovementSpeed();

    // Render game objects
    // render();

    // Call the game loop recursively
    requestAnimationFrame(gameLoop);
}

// Handle keydown event
window.addEventListener('keydown', function (event) {
    // Set movement control flags based on WASD keys
    if (event.key === 'w') {
        movement.up = true;
    } else if (event.key === 's') {
        movement.down = true;
    } else if (event.key === 'a') {
        movement.left = true;
    } else if (event.key === 'd') {
        movement.right = true;
    }
});

// Handle keyup event
window.addEventListener('keyup', function (event) {
    // Reset movement control flags when corresponding WASD key is released
    if (event.key === 'w') {
        movement.up = false;
    } else if (event.key === 's') {
        movement.down = false;
    } else if (event.key === 'a') {
        movement.left = false;
    } else if (event.key === 'd') {
        movement.right = false;
    }
});


// Run the engine
Matter.Engine.run(engine);

// Run the renderer
Matter.Render.run(render);

// Start the game loop
requestAnimationFrame(gameLoop);