# Web-BoulderDash

Projet Programmation Web - ESIREM

Le projet consiste à réaliser une version simplifiée du jeu Boulder Dash à partir des langages HTML, CSS et Javascript.

Réalisé par [Baptiste Andres](https://github.com/LeBourguignon) et [Tom Roth](https://github.com/tom-rh).

La musique présente dans le jeu est composée par [Mydren](https://www.youtube.com/channel/UCY1JDhGKM5MYJsNXyhRXj8w).

# Jeu

Pour se déplacer dans le jeu, il faut utiliser les touches Z, S, Q, D ou les flèches directionnelles.

# Fonctionnement

_Le détail du fonctionnement se trouve dans les commentaires du code._

Nous utilisons un MVC qui s'occupe des modèles, des vues et du controleur.

Si vous faites des modifications dans le menu de **Gestion des niveaux**, pensez à cliquer sur **Appliquer** pour sauvegarder les modifications.

# Visualisation

![mainmenu](https://raw.githubusercontent.com/LeBourguignon/Web-BoulderDash/dev/resources/github/mainmenu.png)

![game](https://raw.githubusercontent.com/LeBourguignon/Web-BoulderDash/dev/resources/github/game.png)

![levelsmanagement](https://raw.githubusercontent.com/LeBourguignon/Web-BoulderDash/dev/resources/github/levelsmanagement.png)

# Architecture
```
📜index.html

📦js
 ┣ 📂controllers
 ┃ ┗ 📜controller.js
 ┣ 📂models
 ┃ ┣ 📜block.js
 ┃ ┣ 📜coordinate.js
 ┃ ┣ 📜diamond.js
 ┃ ┣ 📜direction.js
 ┃ ┣ 📜dirt.js
 ┃ ┣ 📜level.js
 ┃ ┣ 📜player.js
 ┃ ┣ 📜rock.js
 ┃ ┣ 📜tombstone.js
 ┃ ┣ 📜void.js
 ┃ ┗ 📜wall.js
 ┣ 📂patterns
 ┃ ┣ 📜observer.js
 ┃ ┗ 📜subject.js
 ┣ 📂views
 ┃ ┣ 📜view-constFooter.js
 ┃ ┣ 📜view-game.js
 ┃ ┣ 📜view-gameWin.js
 ┃ ┣ 📜view-levelLoose.js
 ┃ ┣ 📜view-levelsManagementMenu.js
 ┃ ┣ 📜view-levelWin.js
 ┃ ┣ 📜view-mainMenu.js
 ┃ ┣ 📜view-restartLevel.js
 ┃ ┣ 📜view-returnMainMenu.js
 ┃ ┣ 📜view.js
 ┃ ┗ 📜viewType.js
 ┗ 📜application.js
 
📦css
 ┣ 📜confirmation.css
 ┣ 📜constFooter.css
 ┣ 📜default.css
 ┣ 📜game.css
 ┣ 📜levelsManagement.css
 ┣ 📜mainMenu.css
 ┗ 📜style.css
 
 📦resources
 ┣ 📂audio
 ┃ ┣ 📜dig1V1.wav
 ┃ ┣ 📜dig2V1.wav
 ┃ ┣ 📜stoneSlide1V1.wav
 ┃ ┣ 📜stoneSlide2V1.wav
 ┃ ┗ 📜themeV1.wav
 ┣ 📂github
 ┃ ┣ 📜game.png
 ┃ ┣ 📜levelsmanagement.png
 ┃ ┗ 📜mainmenu.png
 ┣ 📂img
 ┃ ┣ 📜arrow-left.png
 ┃ ┣ 📜arrow-right.png
 ┃ ┣ 📜background.gif
 ┃ ┣ 📜diamond.gif
 ┃ ┣ 📜grid.png
 ┃ ┣ 📜tombstone.png
 ┃ ┣ 📜volume-off.png
 ┃ ┗ 📜volume-on.png
 ┣ 📂maps
 ┃ ┣ 📜campaign-1.txt
 ┃ ┣ 📜campaign-2.txt
 ┃ ┣ 📜campaign-3.txt
 ┃ ┗ 📜test.txt
 ┗ 📜favicon.ico
```
