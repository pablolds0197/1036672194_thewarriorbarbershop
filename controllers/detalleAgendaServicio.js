
const DetalleAgendaServicio = require('../models/detalleAgendaServicio');


const { response , request} = require('express');

const detalleAgendaServicioGet = async (req, res) => {
    try {
        const detalleAgendaServicio = await DetalleAgendaServicio.findAll();
        res.json({ detalleAgendaServicio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const detalleAgendaServicioPost = (req, res = response)=>{
    let mensaje = 'El detalle de agenda servicio fué registrado extosamente...'
    const body = req.body
    try {
        const detalleAgendaServicio = new DetalleAgendaServicio(body) 
        detalleAgendaServicio.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const detalleAgendaServicioPut = async(req, res = response)=>{

    const {IdDetalleAgendaServicio, IdAgenda,  IdServicio, EstadoDeServicio } = req.body
    let mensaje = 'Modificación exitosa...'
    try{
        const find = await DetalleAgendaServicio.findByPk(IdDetalleAgendaServicio);
        console.log(find);
        find != null ? 
        await DetalleAgendaServicio.update(
            {
                IdAgenda: IdAgenda,
                IdServicio: IdServicio,
                EstadoDeServicio: EstadoDeServicio
            },
            {
                where: {
                    IdDetalleAgendaServicio: IdDetalleAgendaServicio
                }
            }
        ) : mensaje = 'No existe el detalle de agenda servicio para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el detalle de agenda servicio...'
    }
    res.json({
        msg: mensaje
    })
}



const detalleAgendaServicioDelete = async(req, res)=> {
    const {IdDetalleAgendaServicio} = req.body
    let mensaje = 'Detalle de agenda servicio eliminado exitosamente...'

    try{
        const detalleAgendaServicio = await DetalleAgendaServicio.destroy({ where: { IdDetalleAgendaServicio: IdDetalleAgendaServicio } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el detalle de agenda servicio...'+ req.params.IdDetalleAgendaServicio
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    detalleAgendaServicioGet,
    detalleAgendaServicioPut,
    detalleAgendaServicioPost,
    detalleAgendaServicioDelete
}