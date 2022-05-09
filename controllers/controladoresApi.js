const ContenedorArchivo = require('../databases/contenedorArchivo.js')
const contenedor = new ContenedorArchivo('./databases/productos.txt')

const controladoresApi = {

    getProductos : async (req, res) => {
        const productos = await contenedor.getAll()
        res.json(productos)
    },
    getProducto : async (req, res) => {

        const idProducto = req.params.idProducto
        try{
            const producto = await contenedor.getById(idProducto)
            if (producto == undefined){
                res.status(404).json({error: 'producto no encontrado'})
            }
            res.json(producto)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    postProducto : async (req, res) => {
        if (!req.body.title || !req.body.price || !req.body.thumbnail){
            res.status(400).json({ error: "Falta un atributo"})
            return;
        }
        req.body.id = Date.now()
        const productoAgregado = await contenedor.save(req.body)
        res.status(201).json(productoAgregado)
    },
    updateProducto : async (req, res) => {
        const idProducto = req.params.idProducto
        try {
            const productoActualizado = await contenedor.updateProducto(idProducto, req.body);
            res.status(200).json(productoActualizado);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },
    deleteProducto : async (req, res) => {

        const idProducto = req.params.idProducto
        try {
            await contenedor.deleteById(idProducto)
            res.sendStatus(204)
        } catch (error) {
            res.json({error: error.message});
        }
    }

    
}


module.exports = controladoresApi;