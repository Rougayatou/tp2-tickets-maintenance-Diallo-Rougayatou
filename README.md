# TP 2 - Gestion des tickets de maintenance

Ce projet correspond au **TP2**. Il reprend les champs et les tickets du TP1
(`titre`, `description`, `demandeur`, `priorite`, `statut`, `dateCreation`),
puis ajoute le CRUD et la navigation demandés dans le TP2.

## Identité

- Nom : Diallo
- Prénom : Rougayatou

## Prérequis

- Node.js installé
- npm installé

## Installation et lancement

Dans un premier terminal :

```bash
npm install
npx json-server db.json --port 3000
```

Dans un deuxième terminal :

```bash
npm run dev
```

Ouvrir ensuite l'adresse indiquée par Vite, généralement `http://localhost:5173`.

## Fonctionnalités réalisées

- Affichage des tickets du TP1 depuis l'API REST.
- Recherche par titre, description ou demandeur.
- Filtrage par statut.
- Création avec validation des champs obligatoires.
- Date et statut initialisés automatiquement.
- Modification du titre, de la description, du demandeur, de la priorité et du statut.
- Changement rapide du statut depuis la liste.
- Suppression avec confirmation.
- Page détail et message si le ticket n'existe pas.
- Messages d'erreur si JSON Server est arrêté.
- Bouton désactivé pendant l'enregistrement.

## Différences entre POST, PUT et PATCH

- **POST** crée une nouvelle ressource. Ici, il crée un ticket.
- **PUT** remplace généralement toute une ressource existante.
- **PATCH** modifie seulement quelques propriétés. Ici, il permet de modifier le statut ou les champs du ticket.

## Questions

### Pourquoi confirmer avant DELETE ?

Une suppression est difficile à annuler. La confirmation évite de supprimer un ticket par erreur.

### Quel est le rôle de Vue Router ?

Vue Router associe une URL à un composant Vue. Il permet de passer de la liste à la création ou au détail sans recharger toute la page.

### Comment éviter les doublons lors de l'enregistrement ?

Le bouton est désactivé pendant l'appel réseau grâce à la variable `saving`. Ainsi, un double clic ne lance pas deux enregistrements.

## Captures demandées

Créer un dossier `captures/` et ajouter les captures suivantes après démonstration :

1. `capture1:formulaire-creation`
2. `capture2:ticket-dans-liste`
3. `capture3:modification-statut`
4. `capture4:page-detail`
5. `capture5:confirmation-suppression`
6. `capture6:validation-obligatoire`
7. `capture7:Recherche-de-ticket-inexistant`
8. `capture8:erreur-reseau`
