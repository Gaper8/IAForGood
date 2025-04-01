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

        // Créer les cibles
        const waterCosts = gameData.map(item => item.waterCost).sort(() => Math.random() - 0.5);
        
        waterCosts.forEach(cost => {
            const targetElement = document.createElement('div');
            targetElement.className = 'target-item';
            targetElement.dataset.cost = cost;
            
            targetElement.textContent = `${cost.toLocaleString()} litres`;
            
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
            // Bonne réponse
            this.textContent = `${draggedElement.querySelector('p').textContent} - ${targetCost.toLocaleString()} litres`;
            this.style.backgroundColor = '#e8f5e9';
            this.style.border = '2px solid #81c784';
            this.classList.add('matched');
            
            draggedElement.style.visibility = 'hidden';
            
            matchedPairs++;
            updateProgress();
            
            // Afficher l'explication
            const matchedItem = gameData.find(item => item.id.toString() === draggedId);
            feedbackElement.className = 'feedback success';
            feedbackElement.innerHTML = `Correct ! ${matchedItem.explanation}`;
            
            if (matchedPairs === totalPairs) {
                feedbackElement.innerHTML += '<br><strong>Félicitations ! Vous avez terminé le jeu !</strong>';
            }
        } else {
            // Mauvaise réponse
            feedbackElement.className = 'feedback error';
            feedbackElement.textContent = 'Oops ! Ce n\'est pas la bonne association. Essayez encore !';
        }
        
        currentDraggedItem.classList.remove('dragging');
        currentDraggedItem = null;
    }

    function handleTargetClick() {
        if (this.classList.contains('matched')) {
            const itemName = this.textContent.split(' - ')[0];
            const matchedItem = gameData.find(item => item.name === itemName);
            
            if (matchedItem) {
                feedbackElement.className = 'feedback success';
                feedbackElement.innerHTML = `${matchedItem.explanation}`;
            }
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

// Deuxième jeu - Tri sélectif (version avec objets apparaissant un par un)
document.addEventListener('DOMContentLoaded', function() {
    // Données du jeu de tri
    const sortingGameData = {
        bins: [
            {
                id: 'plastic',
                name: 'Plastique',
                color: '#2196f3',
                accepts: ['bouteille', 'sac', 'emballage'],
                image: "image/2.png"
            },
            {
                id: 'metal',
                name: 'Métal',
                color: '#ffc107',
                accepts: ['canette', 'conserves', 'papier aluminium'],
                image: "image/3.png"
            },
            {
                id: 'glass',
                name: 'Verre',
                color: '#4caf50',
                accepts: ['bouteille verre', 'pot', 'bocal'],
                image: "image/1.png"
            },
            {
                id: 'paper',
                name: 'Papier/Carton',
                color: '#9c27b0',
                accepts: ['journal', 'carton', 'magazine'],
                image: "image/4.png"
            }
        ],
        wasteItems: [
            {
                id: 1,
                name: 'Bouteille plastique',
                type: 'bouteille',
                image: 'https://cdn.pixabay.com/photo/2013/07/12/18/39/plastic-bottle-153991_640.png'
            },
            {
                id: 2,
                name: 'Canette',
                type: 'canette',
                image: 'https://cdn.pixabay.com/photo/2013/07/12/18/56/soda-can-154158_640.png'
            },
            {
                id: 3,
                name: 'Bouteille en verre',
                type: 'bouteille verre',
                image: 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_640.png'
            },
            {
                id: 4,
                name: 'Journal',
                type: 'journal',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/newspaper-310962_640.png'
            },
            {
                id: 5,
                name: 'Sac plastique',
                type: 'sac',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/shopping-bags-311319_640.png'
            },
            {
                id: 6,
                name: 'Boîte de conserve',
                type: 'conserves',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/canned-food-310996_640.png'
            },
            {
                id: 7,
                name: 'Pot en verre',
                type: 'pot',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/jar-310815_640.png'
            },
            {
                id: 8,
                name: 'Emballage carton',
                type: 'carton',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/box-310976_640.png'
            }
        ]
    };

    // Variables du jeu modifiées
    let matchedItems = 0;
    let currentItemIndex = 0;
    let currentDraggedWaste = null;
    let totalItems = sortingGameData.wasteItems.length;

    // Éléments DOM
    const binsContainer = document.getElementById('binsContainer');
    const wasteItemsContainer = document.getElementById('wasteItemsContainer');
    const sortingFeedback = document.getElementById('sortingFeedback');
    const sortingProgressBar = document.getElementById('sortingProgressBar');
    const sortingProgressText = document.getElementById('sortingProgressText');
    const resetSortingBtn = document.getElementById('resetSortingBtn');

    // Initialiser le jeu de tri
    function initSortingGame() {
        matchedItems = 0;
        currentItemIndex = 0;
        updateSortingProgress();
        sortingFeedback.className = 'feedback';
        sortingFeedback.textContent = 'Prêt à commencer le tri !';
        
        binsContainer.innerHTML = '';
        wasteItemsContainer.innerHTML = '';

        // Créer les poubelles
        sortingGameData.bins.forEach(bin => {
            const binElement = document.createElement('div');
            binElement.className = `bin ${bin.id}`;
            binElement.dataset.id = bin.id;
            binElement.dataset.accepts = bin.accepts.join(',');
            
            binElement.innerHTML = `
                <img src="${bin.image}" alt="${bin.name}">
                <p>${bin.name}</p>
            `;
            
            binElement.addEventListener('dragover', handleBinDragOver);
            binElement.addEventListener('dragenter', handleBinDragEnter);
            binElement.addEventListener('dragleave', handleBinDragLeave);
            binElement.addEventListener('drop', handleBinDrop);
            
            binsContainer.appendChild(binElement);
        });

        // Afficher le premier déchet
        showNextWasteItem();
    }

    // Afficher le déchet suivant
    function showNextWasteItem() {
        wasteItemsContainer.innerHTML = ''; // Vider le conteneur
        
        if (currentItemIndex < sortingGameData.wasteItems.length) {
            const item = sortingGameData.wasteItems[currentItemIndex];
            
            const wasteElement = document.createElement('div');
            wasteElement.className = 'waste-item';
            wasteElement.draggable = true;
            wasteElement.dataset.id = item.id;
            wasteElement.dataset.type = item.type;
            
            wasteElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            `;
            
            wasteElement.addEventListener('dragstart', handleWasteDragStart);
            wasteItemsContainer.appendChild(wasteElement);
            
            // Mettre à jour le feedback
            sortingFeedback.textContent = `Triez : ${item.name}`;
        } else {
            sortingFeedback.className = 'feedback success';
            sortingFeedback.innerHTML = '<strong>Félicitations ! Vous avez trié tous vos déchets correctement !</strong>';
        }
    }

    // Gestionnaires d'événements pour le jeu de tri
    function handleWasteDragStart(e) {
        currentDraggedWaste = this;
        e.dataTransfer.setData('text/plain', this.dataset.id);
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    }

    function handleBinDragOver(e) {
        e.preventDefault();
    }

    function handleBinDragEnter(e) {
        e.preventDefault();
        this.classList.add('highlight');
    }

    function handleBinDragLeave() {
        this.classList.remove('highlight');
    }

    function handleBinDrop(e) {
        e.preventDefault();
        this.classList.remove('highlight');
        
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.querySelector(`.waste-item[data-id="${draggedId}"]`);
        
        if (!draggedElement || draggedElement.classList.contains('matched')) return;
        
        const wasteType = draggedElement.dataset.type;
        const binAccepts = this.dataset.accepts.split(',');
        
        if (binAccepts.includes(wasteType)) {
            // Bonne réponse
            this.innerHTML += `<div class="dropped-item">${draggedElement.querySelector('p').textContent}</div>`;
            draggedElement.style.visibility = 'hidden';
            draggedElement.classList.add('matched');
            
            matchedItems++;
            currentItemIndex++;
            updateSortingProgress();
            
            sortingFeedback.className = 'feedback success';
            sortingFeedback.textContent = 'Correct ! Ce déchet va bien dans cette poubelle.';
            
            // Afficher le déchet suivant après un court délai
            setTimeout(() => {
                showNextWasteItem();
            }, 1000);
        } else {
            // Mauvaise réponse
            sortingFeedback.className = 'feedback error';
            sortingFeedback.textContent = 'Oops ! Ce déchet ne va pas dans cette poubelle. Essayez encore !';
        }
        
        currentDraggedWaste.classList.remove('dragging');
        currentDraggedWaste = null;
    }

    function updateSortingProgress() {
        const progressPercent = (matchedItems / totalItems) * 100;
        sortingProgressBar.style.width = `${progressPercent}%`;
        sortingProgressText.textContent = `${matchedItems}/${totalItems}`;
    }

    resetSortingBtn.addEventListener('click', initSortingGame);
    initSortingGame();
});