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
            const producto = await contenedor.getById()
            res.json(producto)
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    postProducto : async (req, res) => {
        const productoAgregado = await contenedor.save(req.body)
        res.status(201).json(productoAgregado)
    }

    
}


module.exports = controladoresApi;