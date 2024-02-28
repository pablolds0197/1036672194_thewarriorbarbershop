
const Ventasxproductos = require('../models/ventasxproductos');


const { response , request} = require('express');

const ventasxproductosGet = async (req, res) => {
    try {
        const ventasxproductos = await Ventasxproductos.findAll();
        res.json({ ventasxproductos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const ventasxproductosPost = async (req, res = response)=>{
    let mensaje = 'ventas por productos registrados extosamente...'
    const body = req.body
        try {
            const ventasxproductos = new Ventasxproductos(body)
            ventasxproductos.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
        res.json({
        msg: mensaje
    })
}

const ventasxproductosPut = async(req, res = response)=>{

    const {IdDetalleVentaProductos, IdVenta,  IdProducto } = req.body
    let mensaje = 'Modificación exitosa...'
    try{

        const find = await Ventasxproductos.findByPk(IdDetalleVentaProductos);
        console.log(find);
        find != null ? 
        await Ventasxproductos.update(
            {
                IdVenta: IdVenta,
                IdProducto: IdProducto,
            },
            {
                where: {
                    IdDetalleVentaProductos: IdDetalleVentaProductos
                }
            }
        ) : mensaje = 'No existen las ventas por productos para ser modificados...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar las ventas por productos...'
    }
    res.json({
        msg: mensaje
    })
}



const ventasxproductosDelete = async(req, res)=> {
    const {IdVentasxproductos} = req.body
    let mensaje = 'roles por permisos eliminados exitosamente...'

    try{
        const ventasxproductos = await Ventasxproductos.destroy({ where: { IdVentasxproductos: IdVentasxproductos } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar los roles por permisos...'+ req.params.IdVentasxproductos
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    ventasxproductosGet,
    ventasxproductosPut,
    ventasxproductosPost,
    ventasxproductosDelete
}