# DESAFIO 4 API RESTful

Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

- GET '/api/productos' -> devuelve todos los productos.
- GET '/api/productos/:id' -> devuelve un producto según su id.
- POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
- PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
- DELETE '/api/productos/:id' -> elimina un producto según su id

Cada producto estará representado por un objeto con el siguiente formato:

```json
{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}
```

 Cada ítem almacenado dispondrá de un id obtenido como el instante en que se agregó el nuevo producto ( `${Date.now()}` ). Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
