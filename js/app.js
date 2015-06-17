/*
 *
 *  Enemies our player must avoid
 *
 */
'use strict';


var Enemy = function() {
    /* Variables applied to each of our instances go here,
     * we've provided one for you to get started.
     * The image/sprite for our enemies, this uses
     * a helper we've provided to easily load images.
     */
    this.street = [120, 205, 290];
    this.sprite = 'images/enemy-bug-sq.png';
    this.x = -50;
    // Enemy picks a random path and speed.
    this.y = this.street[Math.floor(Math.random() * 3)];
    this.speed = Math.random() * (180 - 40) + 40;
};

/* Enemy's position
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers.
     */

    if (this.x >= 505) {
        this.x = -50;
        this.y = this.street[Math.floor(Math.random() * 3)];
    } else {
        this.x += this.speed * dt;
    }

    if (player.points >= 60) {
        this.speed = Math.random() * (220 - 60) + 60;
    }
    // Calculate a center of the Enemy image:

    this.ctrx = this.x + 50;
    this.ctry = this.y + 50;
};

/* Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player class
 */
var Player = function() {
    this.sprite = 'images/char-boy-sq.png';
    this.x = 210;
    this.y = 460;
    this.lives = 5;
    this.points = 0;
};

Player.prototype.update = function() {
    /* Collision check: calculate the distance between the centers of
     * the Enemy and Player
     */
    this.ctrx = this.x + 43;
    this.ctry = this.y + 43;
    var j, dist;
    for (j = 0; j < 3; j += 1) {
        dist = Math.sqrt(Math.pow(this.ctrx - allEnemies[j].ctrx, 2) + Math.pow(this.ctry - allEnemies[j].ctry, 2));

        if (dist < 80) {                        // Checking the players lives left
            this.x = 210;
            this.y = 460;
            this.lives = this.lives - 1;
            if (player.lives === 0) {
                fsm.ontoEnd();
            }

        } else if (this.y < 50) {               // Player reached water
            this.points = this.points + 10;
            this.x = 210;
            this.y = 460;
        } else {                                // Keeping player inside the canvas
            if (this.x < 0) {
               this.x = 8;
            } else if (this.x > 505) {
                this.x = 412;
            } else if (this.y > 460) {
                this.y = 460;
            }
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(i) {
    if (i === 'up') {
        this.y -= 83;
    } else if (i === 'left') {
        this.x -= 101;
    } else if (i === 'right') {
        this.x += 101;
    } else if (i === 'down') {
        this.y += 83;
    }
};

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/* Scoreboard /information/ messages
 */
var Score = function() {
    this.sprite = 'images/Star.png';
    this.messageLives = 'Lives left : ';
    this.messagePoints = 'Points : ';
};

Score.prototype.render = function() {
    ctx.fillStyle='#000000';
    ctx.fillRect(0,0,505,50);
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(this.messageLives  + player.lives, 10, 25);
    ctx.fillText(this.messagePoints + player.points, 10, 45);
    if (player.points >= 60) {
        ctx.drawImage(Resources.get(this.sprite), 400, -50);
    }
};

/* Instantiating objects.
 */

var player = new Player();
var score = new Score();

var allEnemies = [];

for (var i = 0; i < 3; i += 1) {
    allEnemies.push(new Enemy());
};

/* This function draws game start/end screens
 * It's called by the start() and reset() methods.
 */
var screenCover = function() {
    var grd = ctx.createRadialGradient(250, 350, 30, 250, 250, 350);
    grd.addColorStop(0, 'red');
    grd.addColorStop(0.17, 'orange');
    grd.addColorStop(0.33, 'yellow');
    grd.addColorStop(0.5, 'green');
    grd.addColorStop(0.666, 'blue');
    grd.addColorStop(1, 'black');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 505, 606);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.font = '20px Georgia';
    ctx.fillText('CLICK "spacebar" TO START THE GAME', 252, 400);
};

/* This function handles game start state
 * It's called by the render() method.
 */
var start = function() {
    screenCover();
    ctx.fillText('WELCOME TO FROGGER!', 252, 300);
};

/* This function handles game reset state after the game has ended.
 * It's called by the render() method.
 */
var reset = function() {
    screenCover();

    ctx.font = '30px Georgia';
    ctx.fillText('GAME OVER!', 252, 300);

    player.lives = 5;
    player.points = 0;
    player.x = 210;
    player.y = 460;
};

/** FSM keeps track of the game status.
 * Copyright (c) 2012, 2013, 2014, 2015, Jake Gordon and contributors
 * https://github.com/jakesgordon/javascript-state-machine/blob/master/LICENSE
 */
var fsm = StateMachine.create({
    events: [
        {name: 'startup', from: 'none',  to: 'welcome' },
        {name: 'toPlay', from: 'welcome', to: 'playing'},
        {name: 'toEnd', from: 'playing', to: 'theEnd'},
        {name: 'toPlayAgain', from: 'theEnd', to: 'playing'}
    ],

    callbacks: {
        ontoPlay:  function() {fsm.current='playing';},
        ontoPlayAgain:  function() {document.addEventListener('keyup', startGame, false);},
        ontoEnd:  function() {fsm.current='theEnd';}
    }
});

/* This function listens for the keyup event
 * It's called by the fsm.ontoPlayAgain method.
 */
var startGame = function(e) {
    if (e.keyCode === 32) {
        fsm.ontoPlay();
    }
};
