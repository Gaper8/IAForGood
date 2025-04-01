document.addEventListener('DOMContentLoaded', function() {
    // Données complètes du jeu (15 objets)
    const allGameData = [
        {
            id: 1,
            name: "Ordinateur portable",
            image: "image/jeu1/laptop.webp",
            waterCost: 1000,
            unit: "litres",
            explanation: "La fabrication d'un ordinateur portable nécessite environ 1 000 litres d'eau, surtout pour la production des composants électroniques."
        },
        {
            id: 2,
            name: "Jeans",
            image: "image/jeu1/jeans.webp",
            waterCost: 10000,
            unit: "litres",
            explanation: "La production d'un jean nécessite environ 10 000 litres d'eau, principalement pour la culture du coton."
        },
        {
            id: 3,
            name: "T-shirt en coton",
            image: "image/jeu1/tshirt.webp",
            waterCost: 2500,
            unit: "litres",
            explanation: "Un simple t-shirt en coton nécessite 2 500 litres d'eau pour sa production."
        },
        {
            id: 4,
            name: "1 kg de viande de bœuf",
            image: "image/jeu1/meatbeef.webp",
            waterCost: 15000,
            unit: "litres",
            explanation: "1 kg de viande de bœuf représente environ 15 000 litres d'eau, principalement pour l'alimentation du bétail."
        },
        {
            id: 5,
            name: "Tasse de café",
            image: "image/jeu1/coffecup.webp",
            waterCost: 140,
            unit: "litres",
            explanation: "Une tasse de café (125ml) représente environ 140 litres d'eau, surtout pour la culture des grains."
        },
        {
            id: 6,
            name: "Feuille de papier A4",
            image: "image/jeu1/paper.webp",
            waterCost: 10,
            unit: "litres",
            explanation: "Une feuille de papier A4 nécessite environ 10 litres d'eau, depuis la culture du bois jusqu'à sa fabrication."
        },
        {
            id: 7,
            name: "Smartphone",
            image: "image/jeu1/smartphone.webp",
            waterCost: 1300,
            unit: "litres",
            explanation: "La production d'un smartphone nécessite environ 1 300 litres d'eau, notamment pour l'extraction des minerais."
        },
        {
            id: 8,
            name: "1 kg de chocolat",
            image: "image/jeu1/chocolate.webp",
            waterCost: 17000,
            unit: "litres",
            explanation: "1 kg de chocolat requiert environ 17 000 litres d'eau, principalement pour la culture des fèves de cacao."
        },
        {
            id: 9,
            name: "1 kg de riz",
            image: "image/jeu1/rice.webp",
            waterCost: 2500,
            unit: "litres",
            explanation: "1 kg de riz nécessite environ 2 500 litres d'eau pour sa culture."
        },
        {
            id: 10,
            name: "1 litre de lait",
            image: "image/jeu1/milk.webp",
            waterCost: 1000,
            unit: "litres",
            explanation: "1 litre de lait représente environ 1 000 litres d'eau, surtout pour l'alimentation des vaches."
        },
        {
            id: 11,
            name: "1 kg de pommes",
            image: "image/jeu1/apple.webp",
            waterCost: 700,
            unit: "litres",
            explanation: "1 kg de pommes nécessite environ 700 litres d'eau pour sa production."
        },
        {
            id: 12,
            name: "1 kg de pain",
            image: "image/jeu1/bread.webp",
            waterCost: 1600,
            unit: "litres",
            explanation: "1 kg de pain représente environ 1 600 litres d'eau, surtout pour la culture du blé."
        },
        {
            id: 13,
            name: "1 œuf",
            image: "image/jeu1/egg.webp",
            waterCost: 200,
            unit: "litres",
            explanation: "Un œuf de poule représente environ 200 litres d'eau, principalement pour l'alimentation de la poule."
        },
        {
            id: 14,
            name: "1 kg de tomates",
            image: "image/jeu1/tomato.webp",
            waterCost: 180,
            unit: "litres",
            explanation: "1 kg de tomates nécessite environ 180 litres d'eau pour sa culture."
        },
        {
            id: 15,
            name: "1 kg de fromage",
            image: "image/jeu1/fromage.webp",
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

// Deuxième jeu - Tri sélectif (version avec 32 objets et sélection aléatoire de 8)
document.addEventListener('DOMContentLoaded', function() {
    // Bibliothèque complète de 32 objets à trier
    const wasteLibrary = [
        // Plastique (8 objets)
        {
            id: 1,
            name: 'Bouteille plastique',
            type: 'bouteille',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/18/39/plastic-bottle-153991_640.png'
        },
        {
            id: 2,
            name: 'Sac plastique',
            type: 'sac',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/shopping-bags-311319_640.png'
        },
        {
            id: 3,
            name: 'Emballage chips',
            type: 'emballage',
            image: 'https://cdn.pixabay.com/photo/2014/12/21/23/39/crisps-576506_640.png'
        },
        {
            id: 4,
            name: 'Flacon de shampooing',
            type: 'bouteille',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/bottle-2028018_640.png'
        },
        {
            id: 5,
            name: 'Barquette alimentaire',
            type: 'emballage',
            image: 'https://cdn.pixabay.com/photo/2017/09/17/23/21/plastic-2760353_640.png'
        },
        {
            id: 6,
            name: 'Bouchon plastique',
            type: 'emballage',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/bottle-2028019_640.png'
        },
        {
            id: 7,
            name: 'Film plastique',
            type: 'emballage',
            image: 'https://cdn.pixabay.com/photo/2016/03/27/19/32/food-packaging-1283831_640.jpg'
        },
        {
            id: 8,
            name: 'Stylo',
            type: 'emballage',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/18/56/pen-154167_640.png'
        },

        // Métal (8 objets)
        {
            id: 9,
            name: 'Canette',
            type: 'canette',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/18/56/soda-can-154158_640.png'
        },
        {
            id: 10,
            name: 'Boîte de conserve',
            type: 'conserves',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/canned-food-310996_640.png'
        },
        {
            id: 11,
            name: 'Papier aluminium',
            type: 'papier aluminium',
            image: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/aluminum-1850115_640.jpg'
        },
        {
            id: 12,
            name: 'Capsule de bouteille',
            type: 'canette',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/bottle-2028023_640.png'
        },
        {
            id: 13,
            name: 'Couvercle en métal',
            type: 'conserves',
            image: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/can-1296039_640.png'
        },
        {
            id: 14,
            name: 'Clé',
            type: 'papier aluminium',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/19/01/key-154342_640.png'
        },
        {
            id: 15,
            name: 'Pile',
            type: 'conserves',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/18/58/battery-154310_640.png'
        },
        {
            id: 16,
            name: 'Récipient métallique',
            type: 'conserves',
            image: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/can-1283827_640.jpg'
        },

        // Verre (8 objets)
        {
            id: 17,
            name: 'Bouteille en verre',
            type: 'bouteille verre',
            image: 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_640.png'
        },
        {
            id: 18,
            name: 'Pot en verre',
            type: 'pot',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/jar-310815_640.png'
        },
        {
            id: 19,
            name: 'Bocal',
            type: 'bocal',
            image: 'https://cdn.pixabay.com/photo/2017/01/10/03/09/bottle-1967900_640.png'
        },
        {
            id: 20,
            name: 'Flacon de parfum',
            type: 'bouteille verre',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/bottle-2028030_640.png'
        },
        {
            id: 21,
            name: 'Verre à boire',
            type: 'bouteille verre',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/18/56/glass-154321_640.png'
        },
        {
            id: 22,
            name: 'Bouteille de vin',
            type: 'bouteille verre',
            image: 'https://cdn.pixabay.com/photo/2014/12/11/02/55/bottle-563797_640.png'
        },
        {
            id: 23,
            name: 'Pot de confiture',
            type: 'pot',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/jam-2028032_640.png'
        },
        {
            id: 24,
            name: 'Vase',
            type: 'bocal',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/vase-2028031_640.png'
        },

        // Papier/Carton (8 objets)
        {
            id: 25,
            name: 'Journal',
            type: 'journal',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/newspaper-310962_640.png'
        },
        {
            id: 26,
            name: 'Emballage carton',
            type: 'carton',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/box-310976_640.png'
        },
        {
            id: 27,
            name: 'Magazine',
            type: 'magazine',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/08/41/magazine-1868985_640.jpg'
        },
        {
            id: 28,
            name: 'Boîte à œufs',
            type: 'carton',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/egg-box-2028028_640.png'
        },
        {
            id: 29,
            name: 'Cahier',
            type: 'journal',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/notebook-2028033_640.png'
        },
        {
            id: 30,
            name: 'Enveloppe',
            type: 'magazine',
            image: 'https://cdn.pixabay.com/photo/2013/07/12/19/01/envelope-154710_640.png'
        },
        {
            id: 31,
            name: 'Brique de lait',
            type: 'carton',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/milk-2028027_640.png'
        },
        {
            id: 32,
            name: 'Sac en papier',
            type: 'carton',
            image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/paper-bag-2028029_640.png'
        }
    ];

    // Données des poubelles
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
        // wasteItems sera rempli aléatoirement au début du jeu
        wasteItems: []
    };

    // Variables du jeu
    let matchedItems = 0;
    let currentItemIndex = 0;
    let currentDraggedWaste = null;
    let totalItems = 8; // On en sélectionne 8 parmi la bibliothèque

    // Éléments DOM
    const binsContainer = document.getElementById('binsContainer');
    const wasteItemsContainer = document.getElementById('wasteItemsContainer');
    const sortingFeedback = document.getElementById('sortingFeedback');
    const sortingProgressBar = document.getElementById('sortingProgressBar');
    const sortingProgressText = document.getElementById('sortingProgressText');
    const resetSortingBtn = document.getElementById('resetSortingBtn');

    // Sélectionner 8 objets aléatoires parmi la bibliothèque
    function selectRandomWasteItems() {
        // Mélanger la bibliothèque et prendre les 8 premiers
        const shuffled = [...wasteLibrary].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 8);
    }

    // Initialiser le jeu de tri
    function initSortingGame() {
        // Sélectionner 8 objets aléatoires
        sortingGameData.wasteItems = selectRandomWasteItems();
        
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