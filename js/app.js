/**
 **
 **  Enemies our player must avoid
 **
 **/
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.street = [120,205,290];
    this.sprite = 'images/enemy-bug-sq.png';
    this.x = -50;
    // Enemy picks a random path and speed
    this.y = this.street[Math.floor(Math.random()*3)];
    this.speed = Math.random()*(180-40) + 40;
}

// Enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x >= 505) {
        this.x = -50 ;
        this.y = this.street[Math.floor(Math.random()*3)];
    } else {
        this.x += this.speed * dt;
    }

    if (player.points >= 60) {
        this.speed = Math.random()*(220-60) + 60;
    }
    // Calculate a center of the Enemy image:
    this.ctrx = this.x + 50;
    this.ctry = this.y + 50;
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 **
 ** Player class
 **
 **/
var Player = function() {
    this.sprite = 'images/char-boy-sq.png';
    this.x = 210;
    this.y = 460;
    this.lives = 5;
    this.points = 0;
}

Player.prototype.update = function() {
    // Collision check: calculate the distance between the centers of
    // the Enemy and Player
    this.ctrx = this.x + 43;
    this.ctry = this.y + 43;

    var dist1 = Math.sqrt(Math.pow(player.ctrx - bug1.ctrx, 2) + Math.pow(player.ctry - bug1.ctry, 2));
    var dist2 = Math.sqrt(Math.pow(player.ctrx - bug2.ctrx, 2) + Math.pow(player.ctry - bug2.ctry, 2));
    var dist3 = Math.sqrt(Math.pow(player.ctrx - bug3.ctrx, 2) + Math.pow(player.ctry - bug3.ctry, 2));

    if ((dist1 < 80) || (dist2 < 80) || (dist3 < 80)) {         // Check for the distance
        this.x = 210;
        this.y = 460;
        this.lives = this.lives - 1;

    } else if (this.y < 50) {                                    // Player reached water
        this.points = this.points + 10;
        this.x = 210;
        this.y = 460;
    } else {                                                      // Keeping player inside the canvas
        if (this.x < 0) {
           this.x = 8;
        } else if (this.x > 505) {
            this.x = 412;
            this.y;
        }
    }
  }

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(i) {
    if (i == "up") {
        this.y -= 83;
    } else if (i == "left") {
        this.x -= 101;
    } else if (i == "right") {
        this.x += 101;
    } else if (i == "down") {
        this.y += 83;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})

/**
 **
 ** Scoreboard /information/ messages
 **
 **/

var Score = function() {
    this.sprite = 'images/Star.png';
    this.messageLives = "Lives left : ";
    this.messagePoints = "Points : ";
}

Score.prototype.render = function() {
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,505,50);

    ctx.font = "20px Georgia";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.messageLives  + player.lives ,10,25);
    ctx.fillText(this.messagePoints + player.points ,10,45);
    if (player.points > 60) {
        ctx.drawImage(Resources.get(this.sprite), 400, -50);
    }
}

/**
 **
 ** Instantiating objects.
 **
**/

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var player = new Player();
var score = new Score();
var allEnemies = [bug1,bug2,bug3];
