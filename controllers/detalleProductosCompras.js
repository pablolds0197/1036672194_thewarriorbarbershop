
const DetalleProductosCompras = require('../models/detalleProductosCompras');


const { response , request} = require('express');

const detalleProductosComprasGet = async (req, res) => {
    try {
        const detalleProductosCompras = await DetalleProductosCompras.findAll();
        res.json({ detalleProductosCompras });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const detalleProductosComprasPost = (req, res = response)=>{
    let mensaje = 'El detalle de producto compras fué registrado extosamente...'
    const body = req.body
    try {
        const detalleProductosCompras = new DetalleProductosCompras(body) 
        detalleProductosCompras.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const detalleProductosComprasPut = async(req, res = response)=>{

    const {IdDetalleProductosCompras, IdProducto,  IdCompra, CantidadCompra, Subtotal } = req.body
    let mensaje = 'Modificación exitosa...'
    try{
        const find = await DetalleProductosCompras.findByPk(IdDetalleProductosCompras);
        console.log(find);
        find != null ? 
        await DetalleProductosCompras.update(
            {
                IdProducto: IdProducto,
                IdCompra: IdCompra,
                CantidadCompra: CantidadCompra,
                Subtotal: Subtotal
            },
            {
                where: {
                    IdDetalleProductosCompras: IdDetalleProductosCompras
                }
            }
        ) : mensaje = 'No existe el detalle de producto compras para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el detalle de producto compras...'
    }
    res.json({
        msg: mensaje
    })
}



const detalleProductosComprasDelete = async(req, res)=> {
    const {IdDetalleProductosCompras} = req.body
    let mensaje = 'Detalle de producto compras eliminado exitosamente...'

    try{
        const detalleProductosCompras = await DetalleProductosCompras.destroy({ where: { IdDetalleProductosCompras: IdDetalleProductosCompras } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el detalle de producto compras...'+ req.params.detalleProductosCompras
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    detalleProductosComprasGet,
    detalleProductosComprasPut,
    detalleProductosComprasPost,
    detalleProductosComprasDelete
}