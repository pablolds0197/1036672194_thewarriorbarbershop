const GastosOperativos = require('../models/gastosoperativos');


const { response , request} = require('express');

const gastosoperativosGet = async (req, res) => {
    try {
        const gastosoperativos = await GastosOperativos.findAll();
        res.json({ gastosoperativos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const gastosoperativosPost = (req, res = response)=>{
    let mensaje = 'gasto Op registrado extosamente...'
    const body = req.body
    try {
        const gastosoperativos = new GastosOperativos(body) 
        gastosoperativos.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const gastosoperativosPut = async(req, res = response)=>{

    const {IdGastosOperativo, IdConceptoGasto, FechaDelGasto,  TotalDelGasto} = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await GastosOperativos.findByPk(IdGastosOperativo);
        console.log(find);
        find != null ? 
        await GastosOperativos.update(
            {
                IdConceptoGasto: IdConceptoGasto,
                FechaDelGasto: FechaDelGasto,
                TotalDelGasto: TotalDelGasto            
            },
            {
                where: {
                    IdGastosOperativo: IdGastosOperativo
                }
            }
        ) : mensaje = 'No existe el gasto Op para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el gasto op...'
    }
    res.json({
        msg: mensaje
    })
}



const gastosoperativosDelete = async(req, res)=> {
    const {IdGastosOperativo} = req.body
    let mensaje = 'Gasto Op eliminado exitosamente...'

    try{
        const gastoOperativo = await GastosOperativos.destroy({ where: { IdGastosOperativo: IdGastosOperativo } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el gasto Op...'+ req.params.IdGastosOperativo
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    gastosoperativosGet,
    gastosoperativosPut,
    gastosoperativosPost,
    gastosoperativosDelete
}