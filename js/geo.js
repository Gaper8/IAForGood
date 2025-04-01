
        // Liste des lieux pollués avec leurs coordonnées et informations
        const pollutedLocations = [
            {
                name: "Décharge d'Agbogbloshie",
                country: "Ghana",
                lat: 5.5502,
                lng: -0.2174,
                zoom: 16,
                ecoInfo: "La plus grande décharge de déchets électroniques d'Afrique. 250 000 tonnes de déchets y sont traitées chaque année, souvent de manière dangereuse avec des impacts graves sur la santé des travailleurs et l'environnement."
            },
            {
                name: "Île de plastique du Pacifique",
                country: "Océan Pacifique",
                lat: 35.0,
                lng: -145.0,
                zoom: 5,
                ecoInfo: "Un vortex de déchets plastiques 3x plus grand que la France. 1,8 trillion de morceaux de plastique flottent ici, tuant la faune marine et entrant dans la chaîne alimentaire."
            },
            {
                name: "Mine de charbon de Hambach",
                country: "Allemagne",
                lat: 50.9109,
                lng: 6.7905,
                zoom: 13,
                ecoInfo: "Cette mine à ciel ouvert détruit des forêts anciennes et émet 100 millions de tonnes de CO2 par an. Elle symbolise le paradoxe de l'Allemagne entre transition énergétique et dépendance au charbon."
            },
            {
                name: "Fleuve Citarum",
                country: "Indonésie",
                lat: -6.3386,
                lng: 107.3419,
                zoom: 12,
                ecoInfo: "Considéré comme le fleuve le plus pollué au monde. 2000 usines textiles y déversent leurs déchets chimiques, rendant l'eau impropre à la consommation et détruisant l'écosystème."
            },
            {
                name: "Norilsk",
                country: "Russie",
                lat: 69.3491,
                lng: 88.2017,
                zoom: 12,
                ecoInfo: "Ville industrielle où les mines et usines rejettent chaque année 2 millions de tonnes de gaz toxiques. L'espérance de vie y est 10 ans plus basse que la moyenne russe."
            },
            {
                name: "Delta du Niger",
                country: "Nigeria",
                lat: 5.3167,
                lng: 6.4167,
                zoom: 9,
                ecoInfo: "Pollué par des décennies de fuites de pétrole (équivalent à un Exxon Valdez chaque année). 16 millions d'habitants souffrent de cette pollution qui détruit pêche et agriculture."
            },
            {
                name: "Lac Karachay",
                country: "Russie",
                lat: 55.7889,
                lng: 60.8786,
                zoom: 13,
                ecoInfo: "Considéré comme le site le plus radioactif de la planète. Utilisé pour le stockage de déchets nucléaires, l'exposition à ses eaux est mortelle."
            },
            {
                name: "Rivière Yamuna",
                country: "Inde",
                lat: 28.6700,
                lng: 77.2200,
                zoom: 11,
                ecoInfo: "L'une des rivières les plus polluées au monde, en raison des déchets industriels et domestiques. Elle est sacrée pour les hindous mais est devenue un dépotoir."
            },
            {
                name: "Chernobyl",
                country: "Ukraine",
                lat: 51.3892,
                lng: 30.0984,
                zoom: 12,
                ecoInfo: "Site de la catastrophe nucléaire de 1986. La zone d'exclusion reste fortement contaminée par les radiations."
            },
            {
                name: "Rivière Gange",
                country: "Inde",
                lat: 25.5941,
                lng: 85.1376,
                zoom: 10,
                ecoInfo: "L'une des rivières les plus sacrées et les plus polluées au monde. Les déchets industriels et humains y sont déversés en masse."
            },
            {
                name: "Lac Taihu",
                country: "Chine",
                lat: 31.2492,
                lng: 120.2190,
                zoom: 11,
                ecoInfo: "Le troisième plus grand lac d'eau douce de Chine, gravement pollué par les algues toxiques et les déchets industriels."
            },
            {
                name: "Fosse des Mariannes",
                country: "Océan Pacifique",
                lat: 11.3456,
                lng: 142.2029,
                zoom: 5,
                ecoInfo: "Le point le plus profond des océans, pollué par les déchets plastiques et chimiques qui s'y accumulent."
            },
            {
                name: "Rivière Matanza-Riachuelo",
                country: "Argentine",
                lat: -34.6500,
                lng: -58.3667,
                zoom: 11,
                ecoInfo: "L'une des rivières les plus polluées au monde, en raison des déchets industriels et domestiques."
            },
            {
                name: "Lac Okeechobee",
                country: "États-Unis",
                lat: 26.9167,
                lng: -80.8333,
                zoom: 10,
                ecoInfo: "Le plus grand lac d'eau douce de Floride, gravement pollué par les engrais agricoles et les algues toxiques."
            },
            {
                name: "Rivière Cuyahoga",
                country: "États-Unis",
                lat: 41.4825,
                lng: -81.6954,
                zoom: 12,
                ecoInfo: "Célèbre pour avoir pris feu en 1969 en raison de la pollution industrielle. Elle reste polluée malgré les efforts de nettoyage."
            },
            {
                name: "Lac Baïkal",
                country: "Russie",
                lat: 53.5000,
                lng: 108.0000,
                zoom: 8,
                ecoInfo: "Le plus ancien et le plus profond lac du monde, menacé par la pollution industrielle et le tourisme."
            },
            {
                name: "Rivière Tietê",
                country: "Brésil",
                lat: -23.5500,
                lng: -46.6333,
                zoom: 11,
                ecoInfo: "L'une des rivières les plus polluées du Brésil, en raison des déchets industriels et domestiques."
            },
            {
                name: "Lac Victoria",
                country: "Afrique de l'Est",
                lat: -1.0000,
                lng: 33.0000,
                zoom: 7,
                ecoInfo: "Le plus grand lac d'Afrique, pollué par les déchets industriels, agricoles et domestiques."
            },
            {
                name: "Rivière Yangtsé",
                country: "Chine",
                lat: 30.6020,
                lng: 114.3050,
                zoom: 8,
                ecoInfo: "La plus longue rivière d'Asie, gravement polluée par les déchets industriels et agricoles."
            },
            {
                name: "Lac Erié",
                country: "États-Unis/Canada",
                lat: 42.2000,
                lng: -81.0000,
                zoom: 7,
                ecoInfo: "L'un des Grands Lacs, pollué par les algues toxiques et les déchets industriels."
            },
            {
                name: "Rivière Buriganga",
                country: "Bangladesh",
                lat: 23.7200,
                lng: 90.4100,
                zoom: 12,
                ecoInfo: "L'une des rivières les plus polluées au monde, en raison des déchets industriels et domestiques."
            },
            {
                name: "Lac Michigan",
                country: "États-Unis",
                lat: 43.0000,
                lng: -87.0000,
                zoom: 7,
                ecoInfo: "L'un des Grands Lacs, pollué par les déchets industriels et les algues toxiques."
            },
            {
                name: "Rivière Pasig",
                country: "Philippines",
                lat: 14.5833,
                lng: 121.0333,
                zoom: 12,
                ecoInfo: "L'une des rivières les plus polluées au monde, en raison des déchets industriels et domestiques."
            },
            {
                name: "Mexico",
                country: "Mexique",
                lat: 19.4326,
                lng: -99.1332,
                zoom: 10,
                ecoInfo: "La ville souffre de pollution de l'air et de gestion des déchets, affectant la santé des habitants."
            },
            {
                name: "New Delhi",
                country: "Inde",
                lat: 28.6139,
                lng: 77.2090,
                zoom: 10,
                ecoInfo: "La capitale indienne est l'une des villes les plus polluées au monde en termes de qualité de l'air."
            },
            {
                name: "Los Angeles",
                country: "États-Unis",
                lat: 34.0522,
                lng: -118.2437,
                zoom: 10,
                ecoInfo: "Connue pour son smog et sa pollution de l'air, malgré des améliorations récentes."
            },
            {
                name: "Beijing",
                country: "Chine",
                lat: 39.9042,
                lng: 116.4074,
                zoom: 10,
                ecoInfo: "La capitale chinoise souffre de niveaux élevés de pollution de l'air, souvent en raison de l'industrie et des véhicules."
            },
            {
                name: "Lima",
                country: "Pérou",
                lat: -12.0464,
                lng: -77.0428,
                zoom: 10,
                ecoInfo: "La pollution de l'air est un problème majeur, aggravé par le trafic routier et les industries locales."
            },
            {
                name: "Dhaka",
                country: "Bangladesh",
                lat: 23.8103,
                lng: 90.4125,
                zoom: 10,
                ecoInfo: "La capitale du Bangladesh est l'une des villes les plus polluées au monde en termes de qualité de l'air."
            },
            {
                name: "Kolkata",
                country: "Inde",
                lat: 22.5726,
                lng: 88.3639,
                zoom: 10,
                ecoInfo: "La ville souffre de pollution de l'air et de l'eau, en raison de l'industrialisation et de la surpopulation."
            },
            {
                name: "Jakarta",
                country: "Indonésie",
                lat: -6.2088,
                lng: 106.8456,
                zoom: 10,
                ecoInfo: "La pollution de l'air et la gestion des déchets sont des problèmes majeurs dans cette métropole."
            }
        ];

        // Variables du jeu
        let currentLocationIndex;
        let score = 0;
        let map;

        // Initialisation de la carte
        function initMap() {
            // Utilisation d'une vue satellite générique au début
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 20, lng: 0 },
                zoom: 2,
                mapTypeId: 'satellite',
                disableDefaultUI: true,
                gestureHandling: 'none',
                keyboardShortcuts: false
            });

            // Sélection aléatoire d'une localisation
            selectRandomLocation();
        }

        // Sélectionne une localisation aléatoire
        function selectRandomLocation() {
            currentLocationIndex = Math.floor(Math.random() * pollutedLocations.length);
            const location = pollutedLocations[currentLocationIndex];

            // Configure la carte
            map.setCenter({ lat: location.lat, lng: location.lng });
            map.setZoom(location.zoom);

            // Réinitialise l'interface
            document.getElementById('guess').value = '';
            document.getElementById('result').style.display = 'none';
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('next-location').disabled = true;
            document.getElementById('eco-text').textContent = "Devinez le pays pour découvrir les enjeux écologiques de ce lieu.";
        }

        // Vérifie la réponse du joueur
        function checkGuess() {
            const guess = document.getElementById('guess').value.trim().toLowerCase();
            const correctCountry = pollutedLocations[currentLocationIndex].country.toLowerCase();
            const resultDiv = document.getElementById('result');

            // Liste des noms alternatifs acceptés pour chaque pays
            const countryAliases = {
                "ghana": ["ghana"],
                "océan pacifique": ["pacifique", "océan pacifique", "nord pacifique"],
                "allemagne": ["allemagne", "germany"],
                "indonésie": ["indonésie", "indonesia"],
                "russie": ["russie", "russia", "fédération de russie"],
                "nigeria": ["nigeria", "nigéria", "nigérie"],
                "ukraine": ["ukraine"],
                "inde": ["inde", "india"],
                "chine": ["chine", "china"],
                "argentine": ["argentine", "argentina"],
                "états-unis": ["états-unis", "usa", "united states"],
                "brésil": ["brésil", "brasil", "brazil"],
                "afrique de l'est": ["afrique de l'est", "east africa"],
                "canada": ["canada"],
                "bangladesh": ["bangladesh"],
                "philippines": ["philippines"],
                "mexique": ["mexique", "mexico"],
                "pérou": ["pérou", "peru"],
                "japon": ["japon", "japan"]
            };

            // Vérification de la réponse
            let isCorrect = false;

            if (countryAliases[correctCountry]) {
                isCorrect = countryAliases[correctCountry].includes(guess);
            } else {
                isCorrect = (guess === correctCountry);
            }

            if (isCorrect) {
                // Bonne réponse
                resultDiv.textContent = `Correct! Ce lieu est bien en ${pollutedLocations[currentLocationIndex].country}.`;
                resultDiv.className = 'result correct';
                score += 100;
                document.getElementById('score').textContent = score;

                // Affiche l'info écologique
                document.getElementById('eco-text').textContent =
                    `${pollutedLocations[currentLocationIndex].name} - ${pollutedLocations[currentLocationIndex].ecoInfo}`;
            } else {
                // Mauvaise réponse
                resultDiv.textContent = `Incorrect. Ce lieu est en ${pollutedLocations[currentLocationIndex].country}.`;
                resultDiv.className = 'result incorrect';

                // Affiche quand même l'info écologique
                document.getElementById('eco-text').textContent =
                    `${pollutedLocations[currentLocationIndex].name} (${pollutedLocations[currentLocationIndex].country}) - ${pollutedLocations[currentLocationIndex].ecoInfo}`;
            }

            resultDiv.style.display = 'block';
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('next-location').disabled = false;
        }

        // Événements
        document.getElementById('submit-guess').addEventListener('click', checkGuess);
        document.getElementById('next-location').addEventListener('click', selectRandomLocation);
        document.getElementById('guess').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });

        // Chargement de l'API Google Maps
        function loadGoogleMaps() {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBRpczbmk5AUzaWZSXyTnnN_XkQIOU0F0E&callback=initMap`;
            script.defer = true;
            script.async = true;
            document.head.appendChild(script);
        }

        // Démarrer le jeu au chargement de la page
        window.onload = loadGoogleMaps;