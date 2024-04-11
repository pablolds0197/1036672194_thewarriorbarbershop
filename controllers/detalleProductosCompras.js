const { response } = require('express');
const DetalleProductosCompras = require('../models/detalleProductosCompras');
const Compras = require('../models/compras'); // Importa el modelo de Compra

const detalleProductosComprasGet = async (req, res) => {
    try {
        const detalleProductosCompras = await DetalleProductosCompras.findAll();
        res.json({ detalleProductosCompras });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const detalleProductosComprasPost = async (req, res = response) => {
    let mensaje = 'El detalle de producto compras fue registrado exitosamente';
    const { compra, detalles } = req.body;
    try {
      // Verificamos si existe la compra correspondiente
      const existingCompra = await Compras.findByPk(compra.IdCompra);
      if (!existingCompra) {
        throw new Error('No se encontró la compra correspondiente');
      }
  
      // Crear detalles de productos de compra para cada detalle recibido
      for (const detalle of detalles) {
        await DetalleProductosCompras.create({
          IdCompra: compra.IdCompra,
          IdProducto: detalle.IdProducto,
          NumeroFactura: compra.NumeroFactura,
          FechaRegistro: compra.FechaRegistro,
          TotalCompra: detalle.TotalCompra,
        });
      }
    } catch (error) {
      mensaje = error.message;
      console.error(error);
    }
    res.json({ msg: mensaje });
  };

module.exports = {
    detalleProductosComprasPost
}

const detalleProductosComprasPut = async(req, res = response)=>{

    const {IdDetalleProductosCompras, IdProducto,  IdCompra,FechaRegistro, TotalCompra } = req.body
    let mensaje = 'Modificación exitosa...'
    try{
        const find = await DetalleProductosCompras.findByPk(IdDetalleProductosCompras);
        console.log(find);
        find != null ? 
        await DetalleProductosCompras.update(
            {
                IdProducto: IdProducto,
                IdCompra: IdCompra,
                FechaRegistro:FechaRegistro,
                TotalCompra: TotalCompra,
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