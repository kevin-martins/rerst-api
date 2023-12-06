# Application Fullstack - Fullstack

Ce référentiel contient le code fullstack de l'application, responsable des interactions utilisateur avec la base de données backend, offrant une expérience utilisateur fluide et confortable.

## Installation et Configuration

### Prérequis
- Node.js installé localement.

### Étapes
1. Cloner ce référentiel.
2. Suivre le README du dossier `/backend` pour run le backend.
3. Accéder au répertoire `/frontend`.
4. Exécuter `yarn` pour installer les dépendances frontend.
5. Configurer les URL de point d'accès de l'API backend dans le code React, généralement dans `src/api.js` ou dans des variables d'environnement.

## Interaction avec le Backend

Le frontend interagit avec le backend via des points d'accès d'API définis. Assurez-vous que le serveur backend est en cours d'exécution lors de l'utilisation de l'application frontend pour accéder et modifier les données backend.

## Routes Disponibles

### Création d'Utilisateur
- `/`: Page de connexion pour créer un nouvel utilisateur en utilisant la fonction `User.create`.

### Gestion de Profil
- `/profile`: Mettre à jour les informations de l'utilisateur et accéder à votre profil de passe.
- `/passes/pass_id`: Mettre à jour le niveau d'accès pour un passe spécifique.

### Lieux
- `/places`: Accéder à tous les lieux disponibles.
- `/places/id`: Page spécifique pour un lieu particulier.

### Accès Utilisateur
- `/user/user_id/access`: Autoriser l'accès à un lieu si l'utilisateur a la permission.
- `/user/user_id/places`: Afficher les lieux disponibles pour l'utilisateur (filtrés).

### Autres Routes
- `/home`: Page d'accueil.
- `/404`: Page d'erreur 404.

### Tests

Le frontend inclut des tests pour garantir le bon fonctionnement de ses fonctionnalités.

#### Exécution des Tests
- Exécuter `yarn test` dans le répertoire `/frontend` pour lancer les tests.

## Utilisation

1. Exécuter `yarn start` dans le répertoire `/frontend` ou `./client.sh` dans le dossier racine pour démarrer le serveur de développement React.
2. Accéder à l'application dans votre navigateur à `http://localhost:3000`.

## Structure des Dossiers

    /backend
    /frontend
    ├── public/
    ├── src/
    |   └── tests/
    ├── package.json
    └── tailwind.config.js
    .gitignore
    client.sh
    server.sh

## Auteurs
- Kevin Martins
