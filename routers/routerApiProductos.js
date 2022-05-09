const express = require('express');
const { Router } = require('express');
const controladoresApi  = require('../controllers/controladoresApi.js')
const controladoresWeb  = require('../controllers/controladoresWeb.js')

const routerApiProductos = new Router()

routerApiProductos.use(express.json())
routerApiProductos.use(express.urlencoded({ extended: true }))

// GET methods
routerApiProductos.get('/', controladoresWeb.root);
routerApiProductos.get('/inicio', controladoresWeb.inicio);
routerApiProductos.get('/api/productos', controladoresApi.getProductos);
routerApiProductos.get('/api/productos/:idProducto', controladoresApi.getProducto);
// POST methods
routerApiProductos.post('/api/productos/', controladoresApi.postProducto);
// PUT methods
routerApiProductos.put('/api/productos/:idProducto', controladoresApi.updateProducto);
// DELETE methods
routerApiProductos.delete('/api/productos/:idProducto', controladoresApi.deleteProducto);


module.exports = routerApiProductos;
