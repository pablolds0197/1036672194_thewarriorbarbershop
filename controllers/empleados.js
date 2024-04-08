const Empleados = require('../models/empleados');


const { response , request} = require('express');

const empleadosGet = async (req, res) => {
    try {
        const empleados = await Empleados.findAll();
        res.json({ empleados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const empleadosPost = (req, res = response)=>{
    let mensaje = 'Empleados registrado exitosamente...'
    const body = req.body
    try {
        const empleados = new Empleados(body) 
        empleados.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const empleadosPut = async(req, res = response)=>{
    const {IdEmpleado, PorcentajeGanancias} = req.body
    let mensaje = 'Modificación exitosa'
    try{
        const find = await Empleados.findByPk(IdEmpleado);
        console.log(find);
        find != null ?
        await Empleados.update(
            {
                PorcentajeGanancias: PorcentajeGanancias
            },
            {
                where: {
                    IdEmpleado: IdEmpleado
                }
            }
        ) : mensaje = 'No existe el empleado para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el empleado...'
    }
    res.json({
        msg: mensaje
    })
}



const empleadosDelete = async(req, res)=> {
    const {IdEmpleado} = req.body
    let mensaje = 'Empleados eliminado exitosamente...'

    try{
        await Empleados.destroy({ where: { IdEmpleado: IdEmpleado } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el Empleado...'+ req.params.IdEmpleado
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    empleadosGet,
    empleadosPut,
    empleadosPost,
    empleadosDelete
}