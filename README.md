# Lancer
`npm run auto`

# Déployer sur Render 
- Créer DB
- Créer Web Service Node
-- Build command : `npm install`
-- Start command : `node index.js`

Une fois créés, il faut les faire communiquer et installer la DB :
- Dans DB, récupérer 'Internal Connection String' et copier
- Dans WebService(back)/Environment/Environment variable : 
  - Key 'PG_URL'
  - Value '(valeur récupérée à l'étape 1)'

- Dans DB, récupérer 'PSQL command' et copier
- Dans WebService(back)/Shell (pour créer les tables dans la DB) : 
  - coller + ajouter -f data/nom_du_ficher.sql
  
