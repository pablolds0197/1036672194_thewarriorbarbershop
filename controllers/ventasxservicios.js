
const Ventasxservicios = require('../models/ventasxservicios');


const { response , request} = require('express');

const ventasxserviciosGet = async (req, res) => {
    try {
        const ventasxservicios = await Ventasxservicios.findAll();
        res.json({ ventasxservicios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const ventasxserviciosPost = async (req, res = response)=>{
    let mensaje = 'ventas por servicios registrados extosamente...'
    const body = req.body
        try {
            const ventasxservicios = new Ventasxservicios(body)
            ventasxservicios.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
        res.json({
        msg: mensaje
    })
}

const ventasxserviciosPut = async(req, res = response)=>{

    const {IdDetalleVentaServicios, IdVenta,  IdServicio } = req.body
    let mensaje = 'Modificación exitosa...'
    try{

        const find = await Ventasxservicios.findByPk(IdDetalleVentaServicios);
        console.log(find);
        find != null ? 
        await Ventasxservicios.update(
            {
                IdVenta: IdVenta,
                IdServicio: IdServicio,
            },
            {
                where: {
                    IdDetalleVentaServicios: IdDetalleVentaServicios
                }
            }
        ) : mensaje = 'No existen las ventas por servicios para ser modificados...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar las ventas por servicios...'
    }
    res.json({
        msg: mensaje
    })
}



const ventasxserviciosDelete = async(req, res)=> {
    const {IdDetalleVentaServicios} = req.body
    let mensaje = 'ventas por servicios eliminados exitosamente...'

    try{
        const ventasxservicios = await Ventasxservicios.destroy({ where: { IdDetalleVentaServicios: IdDetalleVentaServicios } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar los ventas por servicios...'+ req.params.IdDetalleVentaServicios
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    ventasxserviciosGet,
    ventasxserviciosPut,
    ventasxserviciosPost,
    ventasxserviciosDelete
}