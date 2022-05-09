const ContenedorArchivo = require('../databases/contenedorArchivo.js')
const contenedor = new ContenedorArchivo('./databases/productos.txt')

// TODO comparar estructura de body del request con la estructura de los productos
// const estructura = {
//     "title": "",
//     "price": "",
//     "thumbnail": ""
// }

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
        req.body.id = Date.now()
        const productoAgregado = await contenedor.save(req.body)
        res.status(201).json(productoAgregado)
    },
    updateProducto : async (req, res) => {
        // Esta medio agarrado de los pelos
        const idProducto = req.params.idProducto
        try{
            const producto = await contenedor.getById(idProducto)
            if (producto == undefined){
                res.status(404).json({error: 'producto no encontrado'})
            }
            await contenedor.deleteById(idProducto)
            req.body.id = idProducto
            const productoActualizado = await contenedor.save(req.body)
            res.status(200).json(productoActualizado)

        } catch (error) {
            res.status(500).json({ error: error.message })
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