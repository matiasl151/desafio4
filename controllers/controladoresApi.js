const ContenedorArchivo = require('../databases/contenedorArchivo.js')
const contenedor = new ContenedorArchivo('./databases/productos.txt')



const controladoresApi = {

    getProductos : async (req, res) => {
        const prod = await contenedor.getAll()
        res.json(prod)
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
        // TODO agregar validacion si ya existe producto con ese id
        let idProducto = Date.now()
        req.body.id = idProducto
        const productoAgregado = await contenedor.save(req.body)
        res.status(201).json(productoAgregado)
    },
    updateProducto : async (req, res) => {
        // No funca todavia
        const idProducto = req.params.idProducto
        try{
            const producto = await contenedor.getById(idProducto)
            if (producto == undefined){
                res.status(404).json({error: 'producto no encontrado'})
            }
            const productoActualizado = await contenedor.save(req.body)
            res.status(200).json(productoActualizado)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    deleteProducto : async (req, res) => {
        // TODO todavia no funciona ??
        const idProducto = req.params.id
        try {
            await contenedor.deleteById(idProducto)
            res.sendStatus(204)
        } catch (error) {
            console.log(error.message);
        }
    }

    
}


module.exports = controladoresApi;