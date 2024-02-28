
const Ventas = require('../models/ventas');


const { response , request} = require('express');

const ventasGet = async (req, res) => {
    try {
        const ventas = await Ventas.findAll();
        res.json({ ventas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const ventasPost = (req, res = response)=>{
    let mensaje = 'Venta registrado extosamente...'
    const body = req.body
    try {
        const ventas = new Ventas(body) 
        ventas.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const ventasPut = async(req, res = response)=>{

    const {IdVenta, IdEmpleado, IdCliente, PrecioTotal } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Ventas.findByPk(IdVenta);
        console.log(find);
        find != null ? 
        await Ventas.update(
            {
                IdEmpleado: IdEmpleado,
                IdCliente: IdCliente,
                PrecioTotal: PrecioTotal,
            },
            {
                where: {
                    IdVenta: IdVenta
                }
            }
        ) : mensaje = 'No existe la venta para ser modificada...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar la venta...'
    }
    res.json({
        msg: mensaje
    })
}



const ventasDelete = async(req, res)=> {
    const {IdVenta} = req.body
    let mensaje = 'venta eliminada exitosamente...'

    try{
        const ventas = await Ventas.destroy({ where: { IdVenta: IdVenta } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar la venta...'+ req.params.IdVenta
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    ventasGet,
    ventasPut,
    ventasPost,
    ventasDelete
}