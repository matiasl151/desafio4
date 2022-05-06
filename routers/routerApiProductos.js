const express = require('express');
const { Router } = require('express');
const controladoresApi  = require('../controllers/controladoresApi.js')
const controladoresWeb  = require('../controllers/controladoresWeb.js')

const routerApiProductos = new Router()

routerApiProductos.use(express.json())
routerApiProductos.use(express.urlencoded({ extended: true }))

routerApiProductos.get('/', controladoresWeb.root);
routerApiProductos.get('/inicio', controladoresWeb.inicio);
routerApiProductos.get('/productos', controladoresApi.getProductos);
routerApiProductos.get('/productos/:idProducto', controladoresApi.getProducto);


module.exports = routerApiProductos;
