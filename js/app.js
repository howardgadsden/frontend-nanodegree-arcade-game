/* This is the enemy class constuctor.
It loads the image for the enemy into memory using the load function provided in resources.js.
It initializes the x and y coordinates of the enemy as well as the initial square that the enemy occupies
The squares are used for collision detection.
The coordinates are for the upper left hand corner of the image. Images are 101 x 171.
The initial row and speed for each enemy is randomly selected. */
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    Resources.load(this.sprite);
    this.setParameters();
    this.square = getSquare(this.x, this.y);
};


/* Method to update the enemy's position.
Parameter: dt, a time delta between ticks
The speed is multiplied by the dt parameter
which will ensure the game runs at the same speed for
all computers. */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 480)
        this.setParameters();
    this.square = getSquare(this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.square == player.square) {
        player.collisions += 1;
        player.reset();
        ctx.font = '16px Verdana';
        ctx.strokeStyle = 'red';
        if (player.collisions == 1)
            ctx.strokeText('Collision count = ', 0, 606);

        ctx.fillStyle = 'white';
        ctx.fillRect(160, 550, 200, 100);
        ctx.strokeText(player.collisions, 160, 606);
    }
};

/* Method to initialize the x, y, and speed attributes of the enemy object.
A random integer ranging from 0 to 2 is used to randomize the inital position and speed of each enemy object. */
Enemy.prototype.setParameters = function() {
    var num = Math.floor(Math.random() * 3);
    this.x = 0;
    this.y = 83 * num + 68;
    this.speed = 75 * (num + 1);
};


// Function to draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/* This is the player class constructor.
It loads the image for the player into memory using the load function provided in resources.js.
It initalizes the x and y coordinates for the player and also initializes the square that the player occupies.
The square is used for collision detection and also to determine when the game is over. */
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    // Inital coordinates place the player in the center of the bottom row.
    // Coordinates are for the upper left hand corner of the image. (Images are 101 x 171)
    this.x = 200;
    this.y = 405;
    this.square = getSquare(this.x, this.y);
    this.wins = 0;
    this.winFlag = 0;
    this.collisions = 0;
    Resources.load(this.sprite);
};

/* Method to update the player object - called on each loop of the game engine.
It detects when the player has reached the water and implements the functionality for winning the game..
It increments the number of wins and writes a message to the screen. */
Player.prototype.update = function() {
    // the winFlag is used to ensure that the code to handle the win is only executed once per win.
    if (this.square < 5 && this.winFlag < 1) { // Got past all enemies and won the game
        var gradient = ctx.createLinearGradient(0, 0, 505, 0);

        this.wins += 1;
        this.winFlag = 1;
        ctx.font = '18px Verdana';
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        // Fill with gradient
        ctx.strokeStyle = gradient;
        if (this.wins == 1) {
            ctx.strokeText('Congratulations on win # ', 0, 40);
            ctx.strokeText('Press Enter to start again.', 250, 40);
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(230, 20, 20, 25);
        ctx.strokeText(this.wins, 230, 40);
    }
};

/* Method to reset the player to initial conditions -
used when a collision is detected and also when the player wins the game */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 405;
    this.square = getSquare(this.x, this.y);
    this.winFlag = 0;
};

/* Function to determine which square an object occupies.
Squares are numbered 0 through 29 where the top row is numbered 0 through 4, second row 5 through 9, etc.
Have to compensate for the size of the images when specifying the coordinated of the object.
All images are 101 x 117 and are drawn from upper left corner */
function getSquare(x, y) {
    var col = Math.floor((x + 55) / 101);
    var row = Math.floor((y + 70) / 83);

    return row * 5 + col;
}

// Method to draw the player on the board
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Method to handle keyboard input.
Handle up, down, right, and left arrow input to move the player around the board.
Also handles the  'Enter' key - used to restart the game after a win. */
Player.prototype.handleInput = function(keyCode) {
    var x = this.x;
    var y = this.y;

    // In each case, the player is prevented from moving off teh board.
    if (keyCode == 'left') {
        this.x = this.x - 101;
        if (this.x < -50)
            this.x = x;
    }
    if (keyCode == 'right') {
        this.x = this.x + 101;
        if (this.x > 450)
            this.x = x;
    }
    if (keyCode == 'up') {
        this.y = player.y - 83;
        if (this.y < -50)
            this.y = y;
    }
    if (keyCode == 'down') {
        this.y = player.y + 83;
        if (this.y > 480)
            this.y = y;
    }
    if (keyCode == 'enter') this.reset();

    this.square = getSquare(this.x, this.y);
};

/* All  ojects are instantiated here.
Enemy objects are placed in an array called allEnemies.
The player object is placed in a variable called player. */

var allEnemies = [];
var player = new Player();
var enemy;

for (var i = 0; i < 3; i++) {
    enemy = new Enemy();
    enemy.x = 0;
    enemy.y = i * 83 + 68;
    enemy.square = getSquare(enemy.x, enemy.y);
    allEnemies.push(enemy);
}



/* Method to listen for key presses. Sends the keys to
// Player.handleInput() method. */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});