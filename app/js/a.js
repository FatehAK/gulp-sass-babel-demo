/* App.js
 * This file provides the functionality for Enemy and Player object creation with appropriate
 * update and render methods for each of them. It also includes methods to handle the player
 * movement and provides suitable collision detection functionality.
 */

// enemies the player must avoid
class Enemy {
    constructor(x, y, speed) {
        // instance variables
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.xblock = 101;
        this.sprite = 'images/enemy-bug.png';
    }
    // add enemy movement along x-axis
    update(dt) {
        if (this.x < this.xblock * 5) {
            // mutliply by dt to ensure constant speed
            this.x += this.speed * dt;
        } else {
            // reset on crossing boundary
            this.x = -this.xblock;
        }
    }
    // draw the enemies to the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// our player
class Player {
    constructor() {
        //total lives
        this.lives = 3;
        this.xblock = 101;
        this.yblock = 83;
        // initial position
        this.startX = this.xblock * 2;
        this.startY = (this.yblock * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';
        this.win = false;
    }
    // draw our player to the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handle player movement
    handleInput(key) {
        switch (key) {
            case 'left':
                // check left boundary
                if (this.x > 0) {
                    this.x -= this.xblock;
                }
                break;
            case 'up':
                // check top boundary
                if (this.y > this.yblock) {
                    this.y -= this.yblock;
                }
                break;
            case 'right':
                // check right boundary
                if (this.x < this.xblock * 4) {
                    this.x += this.xblock;
                }
                break;
            case 'down':
                // check bottom boundary
                if (this.y < this.yblock * 4) {
                    this.y += this.yblock;
                }
                break;
        }
    }
    // check collison and win condition
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.xblock / 2 > this.x && enemy.x < this.x + this.xblock / 2)) {
                this.lives--;
                this.removeHeart();
                this.resetPlayer();
            }
        }
        // check if player reached the end
        if (this.y === 55) {
            this.win = true;
        }
    }
    // reset player position on collison
    resetPlayer() {
        this.x = this.startX;
        this.y = this.startY;
    }

    //remove heart on collison
    removeHeart() {
        const heartLost = document.querySelector('.heartlost');
        const heartList = document.querySelectorAll('.hearts li');
        heartLost.setAttribute('src', '');
        for (let heart of heartList) {
            //consider only those hearts that are visible
            if (heart.style.display != 'none') {
                heart.style.display = 'none';
                if (this.lives === 0) {
                    const gameOver = document.querySelector('.game-over');
                    heartLost.setAttribute('src', 'images/gameover.gif');
                    gameOver.classList.remove('hide');
                }
                break;
            }
        }
    }
}

// player creation
const player = new Player();
// enemy creation
const bug1 = new Enemy(-101, 0, 600);
const bug2 = new Enemy(-101, 83, 400);
const bug3 = new Enemy((-101 * 4), 83, 400);
const bug4 = new Enemy(-101, (83 * 2), 350);
const bug5 = new Enemy((-101 * 2), (83 * 2), 350);
const bug6 = new Enemy(-101, (83 * 3), 250);

const allEnemies = [];
// push enemies to array
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

// listen for key press
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});