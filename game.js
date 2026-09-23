const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- ESTADO DEL JUEGO ---
let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;

// --- TECLAS ---
const keys = {
    right: false,
    left: false,
    space: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'Space') keys.space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'Space') keys.space = false;
});

// --- CLASE JUGADOR ---
class Player {
    constructor() {
        this.resetPosition();
        this.width = 30;
        this.height = 30;
        this.speed = 5;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0.5;
        this.jumpPower = -10;
        this.isGrounded = false;
    }

    resetPosition() {
        this.x = 50;
        this.y = 200;
        this.vx = 0;
        this.vy = 0;
    }

    update(platforms) {
        // Movimiento horizontal
        if (keys.right) this.vx = this.speed;
        else if (keys.left) this.vx = -this.speed;
        else this.vx = 0;

        // Salto
        if (keys.space && this.isGrounded) {
            this.vy = this.jumpPower;
            this.isGrounded = false;
        }

        // Aplicar gravedad
        this.vy += this.gravity;

        // Mover jugador
        this.x += this.vx;
        this.y += this.vy;

        // Colisión con plataformas
        this.isGrounded = false;
        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y + this.height <= platform.y + this.vy &&
                this.y + this.height + this.vy >= platform.y) {
                
                this.vy = 0;
                this.y = platform.y - this.height;
                this.isGrounded = true;
            }
        });

        // Caída al vacío
        if (this.y > canvas.height) {
            handleLifeLoss();
        }
    }

    draw() {
        ctx.fillStyle = '#0000FF'; // Cuadrado azul
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// --- CLASE PLATAFORMA ---
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = '#228B22'; // Verde
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// --- CLASE MONEDA ---
class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.collected = false;
    }

    draw() {
        if (this.collected) return;
        ctx.fillStyle = '#FFD700'; // Dorado
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- CLASE PUERTA FINAL ---
class Door {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = '#8B4513'; // Marrón
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// --- INICIALIZACIÓN DE ELEMENTOS ---
const player = new Player();

const platforms = [
    new Platform(0, 350, 200, 50),
    new Platform(250, 280, 150, 20),
    new Platform(450, 220, 150, 20),
    new Platform(650, 160, 150, 20)
];

const coins = [
    new Coin(100, 320),
    new Coin(320, 250),
    new Coin(520, 190)
];

const door = new Door(720, 110);

// --- GESTIÓN DE VIDAS Y REINICIO ---
function handleLifeLoss() {
    lives--;
    if (lives > 0) {
        player.resetPosition();
    } else {
        gameOver = true;
    }
}

// --- DETECCIÓN DE COLISIONES CON MONEDAS Y PUERTA ---
function checkCollisions() {
    // Monedas
    coins.forEach(coin => {
        if (!coin.collected &&
            player.x < coin.x + coin.radius &&
            player.x + player.width > coin.x - coin.radius &&
            player.y < coin.y + coin.radius &&
            player.y + player.height > coin.y - coin.radius) {
            
            coin.collected = true;
            score++;
        }
    });

    // Puerta
    if (player.x < door.x + door.width &&
        player.x + player.width > door.x &&
        player.y < door.y + door.height &&
        player.y + player.height > door.y) {
        
        gameWon = true;
    }
}

// --- DIBUJAR INTERFAZ (TEXTOS) ---
function drawUI() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Puntos: ${score}`, 20, 30);
    ctx.fillText(`Vidas: ${lives}`, 20, 60);

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 250, 200);
    }

    if (gameWon) {
        ctx.fillStyle = 'green';
        ctx.font = '50px Arial';
        ctx.fillText('HAS GANADO', 250, 200);
    }
}

// --- BUCLE PRINCIPAL DEL JUEGO (GAME LOOP) ---
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver && !gameWon) {
        player.update(platforms);
        checkCollisions();
    }

    // Dibujar elementos
    platforms.forEach(p => p.draw());
    coins.forEach(c => c.draw());
    door.draw();
    player.draw();
    drawUI();

    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();
