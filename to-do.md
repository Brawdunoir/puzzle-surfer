# TO-DO LIST

## Change local storage to ngx-pwa async method
- Initialiser les variables globales **dès le début** pour ne plus traiter les cas à null et pouvoir les réinitiliaser facilement *(bouton reset dans les settings)*.
- **Effectuer une sauvegarde de chaque partie en cours par la taille de la grille** : sauvegarde en **temps réel** des cases occupées sur la grille, des pièces en bas et du score.
- Sauvegarder **trois meilleurs scores** par taille de grille et par difficultés => 3\*2\*12=72 entrées.

## Full page for Settings
- Suite au premier point, il est possible de basculer en full page pour les settings, deux avantages :
	- Pouvoir basculer la taille de la grille beaucoup plus facilement et sans problème
	- Plus de place pour les settings
	
## Allow multiple language support
- Store all messages in a json file ?
- Add an option in Settings

## Add a Scoreboard component
- In full page
- Add button to access this Scoreboard component in the Menu

## Diversify the messages when you lose/win