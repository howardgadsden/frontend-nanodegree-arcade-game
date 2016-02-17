// This is the enemy constuctor. It initializes the x and y coordinates of the enemy as well as teh initial square that teh enemy occupies
// The squares are used for collision detection
// The coordinates are for the upper left hand corner of hte image. Images are 101 x 171
// the initial row and speed for each enemy is randomly selected
// Finally, it loads the enemy image into memory
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    Resources.load(this.sprite);
    this.setEnemyParameters();
    this.square = getSquare(this.x, this.y);
};


// Update the enemy's position.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // The speed is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    if (this.x > 480)
        this.setEnemyParameters();
    this.square = getSquare(this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.square == player.square) {
        player.collisions += 1;
        player.reset();
        ctx.font="16px Verdana";
        ctx.strokeStyle='red';
        if (player.collisions == 1)
            ctx.strokeText("Collision count = ", 0, 606);

       ctx.fillStyle = 'white';
       ctx.fillRect(160,550,200,100);
       ctx.strokeText(player.collisions,160,606);
    }
};

Enemy.prototype.setEnemyParameters = function() {
    var num = Math.floor(Math.random() * 3);
    this.x = 0;
    this.y = 83 * num + 68;
    this.speed = 75 * (num + 1);
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var allowedKeys = {
        37: 'left',
    };
};

// This is the player class constructor
// It initalizes the x and y coordinates for the player and also initializes the square that the player occupies
// The square is used for collision detection and also to determine when the game is over
// Finally, it loads the image for the player into memory
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
    this.collisionFlag = 0;
    Resources.load(this.sprite);
   }

// Hnadle game wins here
Player.prototype.update = function() {
    if (this.square < 5 && this.winFlag < 1)  {// Got past all enemies and won the game
        var gradient = ctx.createLinearGradient(0,0,505,0);

        this.wins += 1;
        this.winFlag = 1;
        ctx.font="18px Verdana";
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // Fill with gradient
        ctx.strokeStyle=gradient;
        if (this.wins == 1) {
            ctx.strokeText("Congratulations on win # ", 0, 40);
            ctx.strokeText("Press Enter to start again.",250, 40);
        };
        ctx.fillStyle = 'white';
        ctx.fillRect(230, 20,20, 25);
        ctx.strokeText(this.wins, 230, 40);
  }
};

// Reset teh player to initial conditions
// Used when a collision is detected and also when the player wins the game
Player.prototype.reset = function() {
   this.x = 200;
   this.y = 405;
   this.square = getSquare(this.x, this.y);
   this.winFlag = 0;
   this.collisionFlag = 0;
}

//Squares are numbered 0 through 29 where the top row is numbered 0 through 4, second row 5 through 9, etc.
// Have to compensate for hte size of hte images
// All images are 101 x 117 and are drawn from upper left corner

function getSquare(x,y) {
        var col = Math.floor((x+55)/101);
        var row = Math.floor((y+70)/83);


        return row * 5 + col;
}

    // Draw the player on the board
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle up, down, right, and left arrow input to move player around board
Player.prototype.handleInput = function(keyCode) {
        y = this.y,
        x = this.x;

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
            this.y= y;
    }
    if (keyCode == 'enter') this.reset();

    this.square = getSquare(this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player;

for (var i = 0; i < 3; i++) {
    enemy = new Enemy;
    enemy.x = 0;
    enemy.y = i * 83 + 68;
    enemy.square = getSquare(enemy.x, enemy.y);
    allEnemies.push(new Enemy);
};

var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
