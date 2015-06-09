// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.street = [120,205,290];
    this.sprite = 'images/enemy-bug-sq.png';

    this.x = -50;
    this.y = this.street[Math.floor(Math.random()*3)]
    this.speed = Math.random()*(180-40) + 40;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.ctrx = this.x + 50;
    this.ctry = this.y + 50;

    if (this.x >= 505){
        this.x = -83 ;
        this.y = this.street[Math.floor(Math.random()*3)];
    }else{
        this.x += this.speed*dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy-sq.png';
    this.x = 210;
    this.y = 460;
    this.lives = 5;
}
Player.prototype.update = function() {
    this.ctrx = this.x + 43;
    this.ctry = this.y + 43;

    var dist1 = Math.sqrt(Math.pow(player.ctrx - bug1.ctrx, 2) + Math.pow(player.ctry - bug1.ctry, 2));
    var dist2 = Math.sqrt(Math.pow(player.ctrx - bug2.ctrx, 2) + Math.pow(player.ctry - bug2.ctry, 2));
    var dist3 = Math.sqrt(Math.pow(player.ctrx - bug3.ctrx, 2) + Math.pow(player.ctry - bug3.ctry, 2));
    console.log(player.ctry);
    if ((dist1 < 80) || (dist2 < 80) || (dist3 < 80)) {
        this.x = 210;
        this.y = 465;
        this.lives = this.lives - 1;
    }else{
        this.x;
        this.y;
    }
  }
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(i){
    if (i == "up"){
        this.y -= 83;
    }else if (i == "left"){
        this.x -= 101;
    }else if (i == "right"){
        this.x += 101;
    }else if (i == "down"){
        this.y += 83;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var player = new Player();
var allEnemies = [bug1,bug2,bug3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var Shape = function() {
    this.x = 45;
    this.y = 45;
    this.height = 83;
    this.width = 101;
}

Shape.prototype.update = function() {
    this.x;
    this.y;
    this.height;
    this.width;
}
Shape.prototype.render = function() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,505,50);
    ctx.font="30px Georgia";

    ctx.fillStyle="white";
    ctx.fillText("Score:  "+ player.lives,10,40);
    //ctx.ellipse(this.x,this.y,45,45,0,0,2 * Math.PI);
    //ctx.stroke();
}
//Shape.prototype.x = this.x;

var shape = new Shape();
