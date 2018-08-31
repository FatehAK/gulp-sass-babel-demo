/* Engine.js
 * This file provides the game loop functionality, draws the game board, and
 * then calls the update and render methods on the player and enemy objects
 * (defined in app.js). This engine makes the canvas' context (ctx) object
 * globally available to make writing app.js a little simpler to work with.
 */

(function (global) {
    let doc = global.document,
        win = global.window,
        // create the canvas element and grab 2D context
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime, frame;
    // set canvas dimensions
    canvas.width = 505;
    canvas.height = 606;
    // get our elements
    const gameWin = document.querySelector('.game-win');
    const gameOver = document.querySelector('.game-over');
    const gameStart = document.querySelector('.btn-start');
    const replay = document.querySelector('.btn-replay');
    const tryAgain = document.querySelector('.btn-try');
    const canvasBackground = document.querySelector('.canvas-bg');
    const hearts = document.querySelector('.hearts');
    const btnArray = [replay, tryAgain];
    canvas.classList.add('canvas-body');
    canvasBackground.appendChild(canvas);

    //add event listeners to the buttons
    btnArray.forEach((btn) => {
        btn.addEventListener('click', () => {
            player.lives = 3;
            addHeart();
            init();
        });
    });

    //shows canvas on start
    gameStart.addEventListener('click', () => {
        const panel = document.querySelector('.start-panel');
        const footer = document.querySelector('.footer');
        const livesInfo = document.querySelector('.lives-info')
        hearts.classList.remove('hide');
        footer.classList.remove('hide');
        livesInfo.classList.remove('hide');
        panel.classList.add('hide');
        canvasBackground.classList.toggle('hide');
    });

    //adds hearts on reset
    function addHeart() {
        hearts.innerHTML = "";
        for (let i = 1; i <= 3; i++) {
            const listElement = document.createElement('LI');
            const heartElement = document.createElement('I');
            heartElement.className = 'fa fa-heart';
            heartElement.style.fontSize = '20px';
            heartElement.style.color = 'rgb(255, 55, 55)';
            heartElement.style.letterSpacing = '2px';
            heartElement.listStyle = 'none';
            heartElement.display = 'inline-block';
            listElement.appendChild(heartElement);
            hearts.appendChild(listElement);
        }
    }

    /* This function serves as the kickoff point for the game loop itself
       and handles properly calling the update and render methods.
     */
    function main() {
        /* Compute time delta for smooth animations since different computers
           process instructions at different speeds a constant value is needed.
         */
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
           our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
           for the next time this function is called.
         */
        lastTime = now;
        const thumbup = document.querySelector('.thumbup');
        thumbup.setAttribute('src', '');
        // if player has won stop all animations and show the modal
        if (player.lives === 0) {
            player.lives = 3;
            cancelAnimationFrame(frame);
        } else if (player.win === true) {
            thumbup.setAttribute('src', 'images/thumbsup.gif');
            cancelAnimationFrame(frame);
            gameWin.classList.toggle('hide');
            getHeart();
        } else {
            // if player has not won call the function again to draw next frame
            frame = win.requestAnimationFrame(main);
        }
    }

    // get the hearts remaining and add it to the modal
    function getHeart() {
        const heartList = document.querySelectorAll('.hearts li');
        const modalHeart = document.querySelector('.modal-heart');
        modalHeart.innerHTML = "";
        for (let heart of heartList) {
            if (heart.style.display != 'none') {
                const heartElement = document.createElement('I');
                heartElement.className = 'fa fa-heart';
                heartElement.style.fontSize = '20px';
                heartElement.style.color = '#ff3737';
                modalHeart.appendChild(heartElement);
            }
        }
    }

    /* This function does initial setup which resets the game and also sets the
       lastTime variable that is required for the game loop and calls main()
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls the
       function which may need to update the entity's data.
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This function loops through the objects within the allEnemies array and
       calls their update() methods and then calls update() on the player object.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call the
       renderEntities function which is called for every loop of game engine.
     */
    function render() {
        /* This array holds the relative URL to the image used for that
           particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /* Loop through the rows and columns we've defined above and, using the
           rowImages array, draw the correct image for that portion of the "grid".
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element requires three
                   parameters: the image to draw, the x coordinate and the y coordinate.
                   We are using Resources helpers to refer to images.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    /* This function calls the render functions defined on the enemy and
       player entities within app.js for each game tick (or game loop)
     */
    function renderEntities() {
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        player.render();
    }

    /* This function resets the game which includes moving the player back
       to inital position and hides the modal and also sets win to false.
     */
    function reset() {
        player.win = false;
        gameWin.classList.add('hide');
        gameOver.classList.add('hide');
        player.resetPlayer();
    }

    /* Load all of the images needed to draw the game level then set init()
       as the callback method, so that when all images are loaded properly
       the game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
       object) so that we can use it more easily from within app.js.
     */
    global.ctx = ctx;
})(this);