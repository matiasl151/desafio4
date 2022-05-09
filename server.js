const express = require('express');
const routerApiProductos = require('./routers/routerApiProductos.js');
const app = express();
const PORT = 8080;
//==============================
app.use(routerApiProductos);


const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})
server.on('error', error => {console.log(error.message)})