var canvasW = 500;
var canvasH = 400;
var time = new Date().getSeconds()
document.getElementById('gameBoard').innerHTML += `<canvas id="gameCanvas" width="${canvasW}" height="${canvasH}"></canvas>`;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameObjects = [];
const keys = {};

document.addEventListener('keydown', (event) => {
   keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
   keys[event.key] = false;
});

class GameObject {
    constructor(x, y, width, height, color, speed, time) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.time = time;
    }

    update() {
         if (time%2==1) { 
            this.x += this.speed
         } if (time%2==0) {
            this.x -= this.speed
         }




        if (this.x >= canvasW - this.width) {
            this.x = canvasW - this.width;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y >= canvasH - this.height) {
            this.y = canvasH - this.height;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class GamePlayer extends GameObject {
    constructor(x, y, width, height, color, speed) {
        super(x, y, width, height, color, speed);
    }

    update() {
        super.update();

        if (keys['a'] || keys['ф']) {
            this.x -= this.speed;
        }
        if (keys['d'] || keys['в']) {
            this.x += this.speed;
        }
        if (keys['w'] || keys['ц']) {
            this.y -= this.speed;
        }
        if (keys['s'] || keys['ы']) {
            this.y += this.speed;
        }
    }
}

gameObjects.push(new GameObject(0, 0, 25, 33, "#0f0", 3));
gameObjects.push(new GamePlayer(50, 50, 25, 33, "#00f", 7));

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();