# Launching the app

To launch this app in dev mode you should go to company_manager/server and, after the installation of all dependencies, you can up postgres container by writing

### `docker-compose -f docker-compose.yaml up postgres`

Then you should start dev server by writing

### `npm run start:dev`

If the server is launched, you can go to company_manager/react-app and start the frontend part of this app by writing

### `npm start`

After this operations your browser will automatically open the app
