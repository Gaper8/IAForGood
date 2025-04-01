document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const gameArea = document.getElementById('trashGameArea');
    const bin = document.getElementById('trashBin');
    const binLabel = document.getElementById('trashBinLabel');
    const scoreElement = document.getElementById('trashScore');
    const timeElement = document.getElementById('trashTime');
    const livesElement = document.getElementById('trashLives');
    const startBtn = document.getElementById('trashStartBtn');
    const resetBtn = document.getElementById('trashResetBtn');
    const currentBinName = document.getElementById('currentTrashBinName');
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');
    const gameMusic = document.getElementById('gameMusic');

    // Configuration du jeu
    const config = {
        speed: 3,
        trashInterval: 1000,
        gameDuration: 60,
        lives: 3,
        binTypes: [
            { name: 'Jaune', color: 'yellow', items: ['bottle', 'can', 'carton', 'plastic'] },
            { name: 'Verte', color: 'green', items: ['glass', 'bottle-green'] },
            { name: 'Bleue', color: 'blue', items: ['paper', 'newspaper'] },
            { name: 'Noire', color: 'black', items: ['banana', 'hamburger'] }
        ],
        trashItems: [
            { type: 'bottle', name: 'Bouteille plastique', image: 'image/bouteille_plastique.png', bins: ['yellow'] },
            { type: 'can', name: 'Canette', image: 'image/canette.png', bins: ['yellow'] },
            { type: 'carton', name: 'Carton', image: 'image/carton.png', bins: ['yellow'] },
            { type: 'plastic', name: 'Plastique', image: 'image/plastique.png', bins: ['yellow'] },
            { type: 'glass', name: 'Verre', image: 'image/verre.png', bins: ['green'] },
            { type: 'bottle-green', name: 'Bouteille verre', image: 'image/bouteille_verre.png', bins: ['green'] },
            { type: 'paper', name: 'Papier', image: 'image/papier.png', bins: ['blue'] },
            { type: 'newspaper', name: 'Journal', image: 'image/journal.png', bins: ['blue'] },
            { type: 'banana', name: 'Épluchure', image: 'image/banane.png', bins: ['black'] },
            { type: 'hamburger', name: 'Déchet alimentaire', image: 'image/burger.png', bins: ['black'] }
        ]
    };

    // État du jeu
    let gameState = {
        score: 0,
        timeLeft: config.gameDuration,
        lives: config.lives,
        currentBin: null,
        isPlaying: false,
        trashElements: [],
        intervalId: null,
        timerId: null,
        keys: {
            ArrowLeft: false,
            ArrowRight: false
        }
    };

    // Initialisation du jeu
    function initGame() {
        resetGame();
        setupEventListeners();
        changeBin();
        bin.style.left = `${gameArea.offsetWidth / 2 - bin.offsetWidth / 2}px`;
    }

    function resetGame() {
        gameState.score = 0;
        gameState.timeLeft = config.gameDuration;
        gameState.lives = config.lives;
        gameState.isPlaying = false;
        gameState.trashElements.forEach(el => el.remove());
        gameState.trashElements = [];
        
        clearInterval(gameState.intervalId);
        clearInterval(gameState.timerId);
        
        updateUI();
        gameMusic.pause();
        gameMusic.currentTime = 0;
        
        // Réinitialiser la difficulté
        config.speed = 3;
        config.trashInterval = 1000;
    }

    function updateUI() {
        scoreElement.textContent = gameState.score;
        timeElement.textContent = gameState.timeLeft;
        livesElement.textContent = gameState.lives;
    }

    function changeBin() {
        const randomBin = config.binTypes[Math.floor(Math.random() * config.binTypes.length)];
        gameState.currentBin = randomBin;
        
        binLabel.textContent = randomBin.name;
        binLabel.className = 'bin-label ' + randomBin.color;
        currentBinName.textContent = randomBin.name.toLowerCase();
        currentBinName.className = randomBin.color;
    }

    function startGame() {
        if (gameState.isPlaying) return;
        
        gameState.isPlaying = true;
        resetGame();
        gameState.isPlaying = true;
        
        gameMusic.volume = 0.3;
        gameMusic.play();
        
        gameState.timerId = setInterval(() => {
            gameState.timeLeft--;
            updateUI();
            
            if (gameState.timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        gameState.intervalId = setInterval(createTrash, config.trashInterval);
    }

    function endGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.intervalId);
        clearInterval(gameState.timerId);
        gameMusic.pause();
        
        showPopup(`Partie terminée ! Votre score : ${gameState.score}`, false);
    }

    function createTrash() {
        if (!gameState.isPlaying) return;
        
        // Augmentation progressive de la difficulté
        if (gameState.score > 0 && gameState.score % 3 === 0 && config.trashInterval > 500) {
            config.trashInterval -= 50;
            clearInterval(gameState.intervalId);
            gameState.intervalId = setInterval(createTrash, config.trashInterval);
        }
        
        const trashItem = config.trashItems[Math.floor(Math.random() * config.trashItems.length)];
        const trashElement = document.createElement('div');
        trashElement.className = 'trash-item';
        trashElement.dataset.type = trashItem.type;
        trashElement.dataset.bins = trashItem.bins.join(',');
        trashElement.style.backgroundImage = `url(${trashItem.image})`;
        
        const maxLeft = gameArea.offsetWidth - 70;
        const leftPos = Math.floor(Math.random() * maxLeft);
        
        trashElement.style.left = `${leftPos}px`;
        trashElement.style.top = '0px';
        
        gameArea.appendChild(trashElement);
        gameState.trashElements.push(trashElement);
        
        const fallInterval = setInterval(() => {
            if (!gameState.isPlaying) {
                clearInterval(fallInterval);
                return;
            }
            
            const currentTop = parseInt(trashElement.style.top) || 0;
            const newTop = currentTop + config.speed;
            trashElement.style.top = `${newTop}px`;
            
            if (newTop >= gameArea.offsetHeight - 120) {
                clearInterval(fallInterval);
                checkCollision(trashElement);
                trashElement.remove();
                gameState.trashElements = gameState.trashElements.filter(el => el !== trashElement);
            }
        }, 20);
    }

    function checkCollision(trashElement) {
        if (!gameState.isPlaying) return;
        
        const trashRect = trashElement.getBoundingClientRect();
        const binRect = bin.getBoundingClientRect();
        
        if (
            trashRect.bottom >= binRect.top &&
            trashRect.right >= binRect.left &&
            trashRect.left <= binRect.right
        ) {
            const trashBins = trashElement.dataset.bins.split(',');
            const currentBinColor = gameState.currentBin.color;
            
            if (trashBins.includes(currentBinColor)) {
                gameState.score++;
                trashElement.classList.add('correct-trash');
                correctSound.currentTime = 0;
                correctSound.play();
                
                if (gameState.score % 5 === 0) {
                    config.speed += 0.5;
                    changeBin();
                }
            } else {
                gameState.lives--;
                trashElement.classList.add('wrong-trash');
                wrongSound.currentTime = 0;
                wrongSound.play();
                
                if (gameState.lives <= 0) {
                    endGame();
                }
            }
            
            updateUI();
        }
    }

    function showPopup(message, isSuccess) {
        const popup = document.createElement('div');
        popup.className = 'trash-popup';
        popup.innerHTML = `
            <h3>${isSuccess ? 'Bravo !' : 'Partie terminée'}</h3>
            <p>${message}</p>
            <button>OK</button>
        `;
        
        document.body.appendChild(popup);
        
        const button = popup.querySelector('button');
        button.addEventListener('click', () => {
            popup.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => popup.remove(), 300);
        });
    }

    function moveBin(amount) {
        if (!gameState.isPlaying) return;
        
        const currentLeft = parseInt(bin.style.left) || (gameArea.offsetWidth / 2 - bin.offsetWidth / 2);
        const newLeft = currentLeft + amount;
        
        if (newLeft >= 0 && newLeft <= gameArea.offsetWidth - bin.offsetWidth) {
            bin.style.left = `${newLeft}px`;
        }
    }

    function setupEventListeners() {
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') gameState.keys.ArrowLeft = true;
            if (e.key === 'ArrowRight') gameState.keys.ArrowRight = true;
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') gameState.keys.ArrowLeft = false;
            if (e.key === 'ArrowRight') gameState.keys.ArrowRight = false;
        });
        
        let touchId = null;
        let initialTouchX = 0;
        
        gameArea.addEventListener('touchstart', (e) => {
            const touch = e.changedTouches[0];
            touchId = touch.identifier;
            initialTouchX = touch.clientX;
        }, { passive: true });
        
        gameArea.addEventListener('touchmove', (e) => {
            if (!gameState.isPlaying) return;
            
            const touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
            if (!touch) return;
            
            const touchX = touch.clientX;
            const diff = touchX - initialTouchX;
            moveBin(diff);
            initialTouchX = touchX;
            
            e.preventDefault();
        }, { passive: false });
        
        function gameLoop() {
            if (gameState.isPlaying) {
                if (gameState.keys.ArrowLeft) moveBin(-15);
                if (gameState.keys.ArrowRight) moveBin(15);
            }
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
    }

    initGame();
});