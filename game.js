document.addEventListener('DOMContentLoaded', function() {
    // Données complètes du jeu (15 objets)
    const allGameData = [
        {
            id: 1,
            name: "Ordinateur portable",
            image: "https://cdn.pixabay.com/photo/2014/09/24/14/29/macbook-459196_640.png",
            waterCost: 1000,
            unit: "litres",
            explanation: "La fabrication d'un ordinateur portable nécessite environ 1 000 litres d'eau, surtout pour la production des composants électroniques."
        },
        {
            id: 2,
            name: "Jeans",
            image: "https://cdn.pixabay.com/photo/2014/08/11/21/39/jeans-416062_640.png",
            waterCost: 10000,
            unit: "litres",
            explanation: "La production d'un jean nécessite environ 10 000 litres d'eau, principalement pour la culture du coton."
        },
        {
            id: 3,
            name: "T-shirt en coton",
            image: "https://cdn.pixabay.com/photo/2013/07/13/11/44/t-shirt-158091_640.png",
            waterCost: 2500,
            unit: "litres",
            explanation: "Un simple t-shirt en coton nécessite 2 500 litres d'eau pour sa production."
        },
        {
            id: 4,
            name: "1 kg de viande de bœuf",
            image: "https://cdn.pixabay.com/photo/2013/07/13/10/51/cow-157578_640.png",
            waterCost: 15000,
            unit: "litres",
            explanation: "1 kg de viande de bœuf représente environ 15 000 litres d'eau, principalement pour l'alimentation du bétail."
        },
        {
            id: 5,
            name: "Tasse de café",
            image: "https://cdn.pixabay.com/photo/2014/04/03/10/32/coffee-310454_640.png",
            waterCost: 140,
            unit: "litres",
            explanation: "Une tasse de café (125ml) représente environ 140 litres d'eau, surtout pour la culture des grains."
        },
        {
            id: 6,
            name: "Feuille de papier A4",
            image: "https://cdn.pixabay.com/photo/2013/07/12/14/53/paper-148850_640.png",
            waterCost: 10,
            unit: "litres",
            explanation: "Une feuille de papier A4 nécessite environ 10 litres d'eau, depuis la culture du bois jusqu'à sa fabrication."
        },
        {
            id: 7,
            name: "Smartphone",
            image: "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_640.png",
            waterCost: 1300,
            unit: "litres",
            explanation: "La production d'un smartphone nécessite environ 1 300 litres d'eau, notamment pour l'extraction des minerais."
        },
        {
            id: 8,
            name: "1 kg de chocolat",
            image: "https://cdn.pixabay.com/photo/2013/07/13/01/22/chocolate-155595_640.png",
            waterCost: 17000,
            unit: "litres",
            explanation: "1 kg de chocolat requiert environ 17 000 litres d'eau, principalement pour la culture des fèves de cacao."
        },
        {
            id: 9,
            name: "1 kg de riz",
            image: "https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_640.png",
            waterCost: 2500,
            unit: "litres",
            explanation: "1 kg de riz nécessite environ 2 500 litres d'eau pour sa culture."
        },
        {
            id: 10,
            name: "1 litre de lait",
            image: "https://cdn.pixabay.com/photo/2013/07/13/11/34/milk-158455_640.png",
            waterCost: 1000,
            unit: "litres",
            explanation: "1 litre de lait représente environ 1 000 litres d'eau, surtout pour l'alimentation des vaches."
        },
        {
            id: 11,
            name: "1 kg de pommes",
            image: "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_640.png",
            waterCost: 700,
            unit: "litres",
            explanation: "1 kg de pommes nécessite environ 700 litres d'eau pour sa production."
        },
        {
            id: 12,
            name: "1 kg de pain",
            image: "https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_640.png",
            waterCost: 1600,
            unit: "litres",
            explanation: "1 kg de pain représente environ 1 600 litres d'eau, surtout pour la culture du blé."
        },
        {
            id: 13,
            name: "1 œuf",
            image: "https://cdn.pixabay.com/photo/2014/04/03/00/41/egg-310103_640.png",
            waterCost: 200,
            unit: "litres",
            explanation: "Un œuf de poule représente environ 200 litres d'eau, principalement pour l'alimentation de la poule."
        },
        {
            id: 14,
            name: "1 kg de tomates",
            image: "https://cdn.pixabay.com/photo/2013/07/13/11/34/tomato-158150_640.png",
            waterCost: 180,
            unit: "litres",
            explanation: "1 kg de tomates nécessite environ 180 litres d'eau pour sa culture."
        },
        {
            id: 15,
            name: "1 kg de fromage",
            image: "https://cdn.pixabay.com/photo/2013/07/13/11/36/cheese-158523_640.png",
            waterCost: 5000,
            unit: "litres",
            explanation: "1 kg de fromage représente environ 5 000 litres d'eau, surtout pour la production du lait nécessaire."
        }
    ];

    // Sélectionne 5 objets aléatoires (toujours incluant l'ordinateur)
    function getRandomGameData() {
        // On s'assure d'avoir toujours l'ordinateur
        const computer = allGameData.find(item => item.name.includes("Ordinateur"));

        // On prend 4 autres objets aléatoires parmi les 14 restants
        const otherItems = allGameData
            .filter(item => item.id !== computer.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        return [computer, ...otherItems].sort(() => 0.5 - Math.random());
    }

    let gameData = [];
    let matchedPairs = 0;
    let totalPairs = 5; // Maintenant fixé à 5 puisque nous en sélectionnons 5
    let currentDraggedItem = null;

    // Éléments DOM
    const objectsContainer = document.getElementById('objectsContainer');
    const targetsContainer = document.getElementById('targetsContainer');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resetBtn = document.getElementById('resetBtn');
    const gameContainer = document.querySelector('.game-container');

    // Assurez-vous que le conteneur du jeu a une position relative
    gameContainer.style.position = 'relative';

    // Initialiser le jeu
    function initGame() {
        gameData = getRandomGameData();
        matchedPairs = 0;
        updateProgress();
        feedbackElement.className = 'feedback';
        feedbackElement.textContent = 'Faites glisser les objets vers leur empreinte hydrique correspondante !';

        objectsContainer.innerHTML = '';
        targetsContainer.innerHTML = '';

        // Créer les éléments à glisser
        gameData.forEach(item => {
            const objectElement = document.createElement('div');
            objectElement.className = 'object-item';
            objectElement.draggable = true;
            objectElement.dataset.id = item.id;
            objectElement.dataset.cost = item.waterCost;

            objectElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            `;

            objectElement.addEventListener('dragstart', handleDragStart);
            objectsContainer.appendChild(objectElement);
        });

        // Créer les cibles avec une structure améliorée
        const waterCosts = gameData.map(item => item.waterCost).sort(() => Math.random() - 0.5);

        waterCosts.forEach(cost => {
            const targetElement = document.createElement('div');
            targetElement.className = 'target-item';
            targetElement.dataset.cost = cost;

            // Nouvelle structure pour les cibles
            targetElement.innerHTML = `
                <div class="target-item-content">
                    <span>${cost.toLocaleString()} litres</span>
                </div>
            `;

            targetElement.addEventListener('dragover', handleDragOver);
            targetElement.addEventListener('dragenter', handleDragEnter);
            targetElement.addEventListener('dragleave', handleDragLeave);
            targetElement.addEventListener('drop', handleDrop);
            targetElement.addEventListener('click', handleTargetClick);

            targetsContainer.appendChild(targetElement);
        });
    }

    // Gestionnaires d'événements pour le drag and drop
    function handleDragStart(e) {
        currentDraggedItem = this;
        e.dataTransfer.setData('text/plain', this.dataset.id);
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('highlight');
    }

    function handleDragLeave() {
        this.classList.remove('highlight');
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('highlight');

        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.querySelector(`.object-item[data-id="${draggedId}"]`);

        if (!draggedElement) return;

        const draggedCost = parseInt(draggedElement.dataset.cost);
        const targetCost = parseInt(this.dataset.cost);

        if (draggedCost === targetCost) {
            // Bonne réponse - nouvelle structure pour l'affichage après matching
            const itemName = draggedElement.querySelector('p').textContent;
            this.innerHTML = `
                <div class="target-item-content">
                    <span>${itemName}</span>
                    <span>${targetCost.toLocaleString()} litres</span>
                </div>
            `;

            this.style.backgroundColor = '#e8f5e9';
            this.style.border = '2px solid #81c784';
            this.classList.add('matched');

            draggedElement.style.visibility = 'hidden';

            matchedPairs++;
            updateProgress();

            // Afficher l'explication dans un popup
            const matchedItem = gameData.find(item => item.id.toString() === draggedId);
            showSuccessPopup(matchedItem.explanation);

            if (matchedPairs === totalPairs) {
                feedbackElement.innerHTML = '<br><strong>Félicitations ! Vous avez terminé le jeu !</strong>';
            }
        } else {
            // Mauvaise réponse - afficher le popup
            showErrorPopup();
        }

        currentDraggedItem.classList.remove('dragging');
        currentDraggedItem = null;
    }

    function handleTargetClick() {
        if (this.classList.contains('matched')) {
            const content = this.querySelector('.target-item-content');
            if (content) {
                const itemName = content.querySelector('span:first-child').textContent;
                const matchedItem = gameData.find(item => item.name === itemName);

                if (matchedItem) {
                    showSuccessPopup(matchedItem.explanation);
                }
            }
        }
    }

    // Nouvelle fonction pour afficher le popup d'erreur
    function showErrorPopup() {
        showPopup('Oops ! Ce n\'est pas la bonne association.', 'error-popup');
    }

    // Nouvelle fonction pour afficher le popup de succès
    function showSuccessPopup(message) {
        showPopup(`Correct ! ${message}`, 'success-popup');
    }

    // Fonction générique pour afficher un popup
    function showPopup(message, className) {
        // Supprimer tout popup existant
        const existingPopup = document.querySelector('.error-popup, .success-popup');
        if (existingPopup) existingPopup.remove();

        // Créer le popup
        const popup = document.createElement('div');
        popup.className = className;
        popup.innerHTML = `
            <p>${message}</p>
            <button>OK</button>
        `;

        gameContainer.appendChild(popup);

        // Fermer le popup au clic
        const button = popup.querySelector('button');
        button.addEventListener('click', () => {
            popup.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => popup.remove(), 300);
        });

        // Fermer automatiquement après 3 secondes pour les erreurs
        if (className === 'error-popup') {
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => popup.remove(), 300);
                }
            }, 2000);
        }
    }

    // Mettre à jour la barre de progression
    function updateProgress() {
        const progressPercent = (matchedPairs / totalPairs) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${matchedPairs}/${totalPairs}`;
    }

    // Réinitialiser le jeu
    resetBtn.addEventListener('click', initGame);

    // Démarrer le jeu
    initGame();
});
