

# Clone d'une des premières version d'msn

## Technos :
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Description:
Réseau social qui utilise React(vite), nodeJs(express) et mySql.<br>
Chat (socket.io)<br>
Service de messagerie avec plusieurs état de messagerie (socket.io)<br>
Authentification (token et cookie http only)<br>
Recherche et trie (SQL) <br>
Architecture modulaire et composants réutilisables <br>
Api restfull <br>

## URL :
> https://msn-front.vercel.app

## TABLES SQL :
/back/sql

## Variables d'environnement:
> Créer un fichier .env dans le dossier back .<br>
PORT="INDIQUER UN PORT"<br>
_HOST="localhost"<br>
_USER="root"<br>
_PASSWORD=""
_DATABASE="nomDataBase"<br>
_SECRET_KEY="chaine_de_char"<br>
MAGIC_WORD="chaine_de_char"<br>
NODE_ENV="production"
FRONT_HOST="http://127.0.0.1:3000"


### Installer node.js

### Ajouter variables d'environnement dans un fichier .env

### Installer les dépendances:

`npm install`

### Créer la base de donnée ainsi que les tables (cf path)

### Indiquer le host backend dans le fichier front>src>host

### Indiquer le Host frontend dans les fichiers back>app & back>functions>socket

### Lancer le serveur:

`node server`

### Lancer l'application:

`npm run dev`
