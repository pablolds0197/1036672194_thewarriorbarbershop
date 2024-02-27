const ConceptoGasto = require('../models/conceptogasto');


const { response , request} = require('express');

const conceptogastoGet = async (req, res) => {
    try {
        const conceptogasto = await ConceptoGasto.findAll();
        res.json({ conceptogasto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const conceptogastoPost = (req, res = response)=>{
    let mensaje = 'concepto gasto registrado extosamente...'
    const body = req.body
    try {
        const conceptogasto = new ConceptoGasto(body) 
        conceptogasto.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const conceptogastoPut = async(req, res = response)=>{

    const {IdConceptoGasto, NombreDelGasto, Descripcion,  ValorDelGasto} = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await ConceptoGasto.findByPk(IdConceptoGasto);
        console.log(find);
        find != null ? 
        await ConceptoGasto.update(
            {
                NombreDelGasto: NombreDelGasto,
                Descripcion: Descripcion,
                ValorDelGasto: ValorDelGasto
            },
            {
                where: {
                    IdConceptoGasto: IdConceptoGasto
                }
            }
        ) : mensaje = 'No existe el concepto de Gasto para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el concepto gasto...'
    }
    res.json({
        msg: mensaje
    })
}



const conceptogastoDelete = async(req, res)=> {
    const {IdConceptoGasto} = req.body
    let mensaje = 'concepto gasto eliminado exitosamente...'

    try{
        const concepto = await ConceptoGasto.destroy({ where: { IdConceptoGasto: IdConceptoGasto } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el concepto del gasto...'+ req.params.IdConceptoGasto
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    conceptogastoGet,
    conceptogastoPut,
    conceptogastoPost,
    conceptogastoDelete
}