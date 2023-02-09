# Rest API

# Sujet: Développer une application gérant des Pass donnant accès à des User à des zones protégées.


## Stack Techniques

* Javascript: Express + MongoDB
* Python: Flask + MongoDB

Votre application se base tout d'abord sur la modélisation d'entités: `User`, `Pass` et `Place`

## Implémentation


### Logique métier
![schema](./media-assets/entity-diagram.png)


Les `User` ont des `Pass`. Ces `Pass` leur donnent l'accès à des `Place` moyennant un niveau d'accès, _level_, un entier compris entre 1 et 5.

Les `Place` mettent également une contrainte sur l'_age_ du `User`.

Un `User` a accès à une `Place` si:
* il dispose d'un `Pass` avec un niveau d'accès suffisant
* son _age_ est suffisant


### API

Cette logique métier doit être servie par une API Rest. Voici les routes attendues:


- 🛠 CRUD operations pour toutes les entités

- 🚦 Une route pour vérifier si un `User` a accès à une `Place`

- 🚦 Une route pour obtenir la liste des `Place` accessibles par un `User`


### Persistance

Implémentez la persistance des entités avec la BDD specifiée dans votre Stack Technique.

Créer un fichier .json à la base du repository, chargé dans la BDD au lancement du serveur.

___

## ⚠️ Candidatures ⚠️

> A ce stade, vous avez implémenté une API Rest assez basique servant une logique métier. Ce kata donne une grande importance à **l'industrialisation** que vous développez autour. Voici une liste d'améliorations possibles du projet. Implémentez celles qui vous semblent les plus pertinantes (à indiquer dans un readme !)

### Améliorations

* Containerisation:
    * Dockerfile générant une image pour l'API.
    * docker-compose.yml pour lancer l'API + la database

* Sécurité
    * Ajouter un endpoint pour générer un token d'accès
    * Protéger les routes derrière le token d'accès
    * Un `Pass` ne doit pouvoir être accédé que par son `User`

* Tests
    * Couverture de test Jest
    * Lancement de la test-suite via un script npm ou bash

* Documentation / Interface
    * Specification des routes en format Swagger
    * Ajout d'un front swagger pour faciliter le testing manuel des routes




# Specification [RFC2119](https://microformats.org/wiki/rfc-2119-fr) du kata

> Description précise & sans ambiguité sur les termes de ce qui est attendu


* Le candidat `DOIT` implémenter 
* Le candidat `DOIT` implémenter les codes de retour suivant: 200, 201, 400, 401, 403, 404, 500

