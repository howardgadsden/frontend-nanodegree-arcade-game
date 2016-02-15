
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    Resources.load(this.sprite);
    this.index = 0;
    this.x = 0;
    this.y = 60;
    this.speed = 50;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    if (this.x > 505) {
        var increment = Math.floor(Math.random() * 3);
        this.x = 0;
        this.y = 83 * increment + 60;
        this.speed = 50 * (increment + 1);
    }
    console.log("Increment is " + increment);
    console.log("This.y is "+ this.y);
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var allowedKeys = {
        37: 'left',
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 400;
    Resources.load(this.sprite);
}

Player.prototype.update = function() {

};

Player.prototype.render = function(dt) {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var allowedKeys = {
        37: 'left',
    };
};

Player.prototype.handleInput = function(keyCode) {

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player;

for (var i = 0; i < 3; i++) {
    enemy = new Enemy;
    enemy.index = i;
    enemy.x = 0;
    enemy.y = i * 83 + 60;
    allEnemies.push(new Enemy);
};

var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
        var allowedKeys = {
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
