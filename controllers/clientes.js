
const Clientes = require('../models/clientes');


const { response , request} = require('express');

const clientesGet = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        res.json({ clientes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const clientesPost = (req, res = response)=>{
    let mensaje = 'Cliente registrado extosamente...'
    const body = req.body
    try {
        const clientes = new Clientes(body) 
        clientes.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const clientesPut = async(req, res = response)=>{

    const {IdCliente, IdUsuario } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Clientes.findByPk(IdCliente);
        console.log(find);
        find != null ? 
        await Clientes.update(
            {
                IdUsuario: IdUsuario,
            },
            {
                where: {
                    IdCliente: IdCliente
                }
            }
        ) : mensaje = 'No existe el cliente para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el cliente...'
    }
    res.json({
        msg: mensaje
    })
}



const clientesDelete = async(req, res)=> {
    const {IdCliente} = req.body
    let mensaje = 'Cliente eliminado exitosamente...'

    try{
        const clientes = await Clientes.destroy({ where: { IdCliente: IdCliente } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el cliente...'+ req.params.IdCliente
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    clientesGet,
    clientesPut,
    clientesPost,
    clientesDelete
}