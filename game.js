document.addEventListener('DOMContentLoaded', function() {
    // Données du jeu adaptées au thème écologique
    const gameData = [
        {
            id: 1,
            name: "Jeans",
            image: "https://cdn.pixabay.com/photo/2014/08/11/21/39/jeans-416062_640.png",
            waterCost: 10000,
            unit: "litres",
            explanation: "La production d'un jean nécessite environ 10 000 litres d'eau, principalement pour la culture du coton."
        },
        {
            id: 2,
            name: "T-shirt en coton",
            image: "https://cdn.pixabay.com/photo/2013/07/13/11/44/t-shirt-158091_640.png",
            waterCost: 2500,
            unit: "litres",
            explanation: "Un simple t-shirt en coton nécessite 2 500 litres d'eau pour sa production, surtout pour la culture du coton."
        },
        {
            id: 3,
            name: "1 kg de viande de bœuf",
            image: "https://cdn.pixabay.com/photo/2013/07/13/10/51/cow-157578_640.png",
            waterCost: 15000,
            unit: "litres",
            explanation: "1 kg de viande de bœuf représente environ 15 000 litres d'eau, principalement pour l'alimentation du bétail."
        },
        {
            id: 4,
            name: "Tasse de café",
            image: "https://cdn.pixabay.com/photo/2014/04/03/10/32/coffee-310454_640.png",
            waterCost: 140,
            unit: "litres",
            explanation: "Une tasse de café (125ml) représente environ 140 litres d'eau, surtout pour la culture des grains."
        },
        {
            id: 5,
            name: "Feuille de papier A4",
            image: "https://cdn.pixabay.com/photo/2013/07/12/14/53/paper-148850_640.png",
            waterCost: 10,
            unit: "litres",
            explanation: "Une feuille de papier A4 nécessite environ 10 litres d'eau, depuis la culture du bois jusqu'à sa fabrication."
        }
    ];

    // Mélanger les données
    const shuffledData = [...gameData].sort(() => Math.random() - 0.5);
    let matchedPairs = 0;
    let totalPairs = gameData.length;
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
        matchedPairs = 0;
        updateProgress();
        feedbackElement.className = 'feedback';
        feedbackElement.textContent = 'Faites glisser les objets vers leur empreinte hydrique correspondante !';
        
        objectsContainer.innerHTML = '';
        targetsContainer.innerHTML = '';

        // Créer les éléments à glisser
        shuffledData.forEach(item => {
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
        const waterCosts = shuffledData.map(item => item.waterCost).sort(() => Math.random() - 0.5);
        
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

    // Gestionnaires d'événements
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
            this.textContent = `${draggedElement.querySelector('p').textContent} - ${targetCost.toLocaleString()} litres`;
            this.style.backgroundColor = '#e8f5e9';
            this.style.border = '2px solid #81c784';
            this.classList.add('matched');
            
            draggedElement.style.visibility = 'hidden';
            
            matchedPairs++;
            updateProgress();
            
            const matchedItem = gameData.find(item => item.id.toString() === draggedId);
            feedbackElement.className = 'feedback success';
            feedbackElement.innerHTML = `Correct ! ${matchedItem.explanation}`;
            
            if (matchedPairs === totalPairs) {
                feedbackElement.innerHTML += '<br><strong>Félicitations ! Vous avez terminé le jeu !</strong>';
            }
        } else {
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

    function updateProgress() {
        const progressPercent = (matchedPairs / totalPairs) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${matchedPairs}/${totalPairs}`;
    }

    resetBtn.addEventListener('click', initGame);
    initGame();
});