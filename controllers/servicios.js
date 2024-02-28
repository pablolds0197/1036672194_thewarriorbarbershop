
const Servicio = require('../models/servicios');


const { response , request} = require('express');

const serviciosGet = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json({ servicios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const serviciosPost = (req, res = response)=>{
    let mensaje = 'Servicio registrado extosamente...'
    const body = req.body
    try {
        const servicios = new Servicio(body) 
        servicios.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const serviciosPut = async(req, res = response)=>{

    const {IdServicio, NombreDelServicio,  Descripcion,  Comision, Precio } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Servicio.findByPk(IdServicio);
        console.log(find);
        find != null ? 
        await Servicio.update(
            {
                NombreDelServicio: NombreDelServicio,
                Descripcion: Descripcion,
                Comision: Comision,
                Precio: Precio
            },
            {
                where: {
                    IdServicio: IdServicio
                }
            }
        ) : mensaje = 'No existe el servicio para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el servicio...'
    }
    res.json({
        msg: mensaje
    })
}



const serviciosDelete = async(req, res)=> {
    const {IdServicio} = req.body
    let mensaje = 'Servicio eliminado exitosamente...'

    try{
        const servicio = await Servicio.destroy({ where: { IdServicio: IdServicio } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el servicio...'+ req.params.IdServicio
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    serviciosGet,
    serviciosPut,
    serviciosPost,
    serviciosDelete
}