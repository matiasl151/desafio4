const fs = require('fs/promises');

class ContenedorArchivo {

    constructor(path) {

        this.path = path;
    }

    async save(producto) {

        try {
            let archivo = await this.getAll();
            archivo.push(producto)
            await fs.writeFile(this.path, JSON.stringify(archivo, null, 4));
        } catch (error) {
            console.log('No se pudo guardar, error:', error.message);
        }
    }

    async getById(id) {

        try {
            let archivo = await fs.readFile(this.path, 'utf-8');
            let archivo_json = JSON.parse(archivo);        
            return archivo_json.find(p => p.id == id);
            
        } catch (error) {
            console.log("No se encontro el producto, error: ", error.message);
            return null;
        }
    }

    async getAll() {

        try {
            let archivo = await fs.readFile(this.path, { encoding: 'utf-8' });
            return !archivo.length ? [] : JSON.parse(archivo);

        } catch (error) {
            console.log('No se pudo obtener los productos, error: ', error.message);
            return []
        }
    }

    async deleteById(id) {

        try {
            let archivo = await fs.readFile(this.path, { encoding: 'utf-8' });
            let archivo_Json = JSON.parse(archivo);
            let datos = archivo_Json.filter(producto => producto.id != id);
            await fs.writeFile(this.path, JSON.stringify(datos, null, 4));
            console.log(`Se elimino el producto con id ${id}`);
        } catch (error) {
            console.log("No se pudo eliminar producto, error: ", error.message)
        }
    }

    async deleteAll() {

        try {
            await fs.truncate(this.path);
            console.log("Se eliminaron los productos");
        } catch (error) {
            console.log('No se eliminaron los productos, error', error.message);
        }
    }

    async updateProducto(id_producto, {title, price, thumbnail} = datos){

        let producto = await this.getById(id_producto);
        
        const productoUpdate = {
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            id: id_producto
        }

        if (title) {
            productoUpdate.title = title;
        } 
        if (price) {
            productoUpdate.price = price;
        } 
        if (thumbnail) {
            productoUpdate.thumbnail = thumbnail;
        }

        await this.deleteById(id_producto);
        await this.save(productoUpdate);
        return productoUpdate;
    }

}

// let contenedor = new ContenedorArchivo('./productos.txt')
// contenedor.updateProducto(1652102912326, {title: "holasa", price: 12345, thumbnail: "tuki.jpg"})

module.exports = ContenedorArchivo;