
const Gestionproductos = require('../models/gestionproductos');


const { response , request} = require('express');

const gestionproductosGet = async (req, res) => {
    try {
        const gestionproductos = await Gestionproductos.findAll();
        res.json({ gestionproductos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const gestionproductosPost = (req, res = response)=>{
    let mensaje = 'Gestionproductos registrado exitosamente...'
    const body = req.body
    try {
        const gestionproductos = new Gestionproductos(body) 
        gestionproductos.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const gestionproductosPut = async(req, res = response)=>{

    const {IdProducto,
        NombreDelInsumo,
        Descripcion,
        StockMax,
        StockMin ,
        CantidadDisponible,
        PrecioUnitario} = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Gestionproductos.findByPk(IdProducto);
        console.log(find);
        find != null ? 
        await Gestionproductos.update(
            {
                IdProducto:IdProducto,
                NombreDelInsumo: NombreDelInsumo,
                Descripcion:Descripcion,
                StockMax :StockMax,
                StockMin: StockMin,
                CantidadDisponible: CantidadDisponible,
                PrecioUnitario:PrecioUnitario
            },
            {
                where: {
                    IdProducto: IdProducto
                }
            }
        ) : mensaje = 'No existe el Gestionproductos para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el Gestionproductos...'
    }
    res.json({
        msg: mensaje
    })
}



const gestionproductosDelete = async(req, res)=> {
    const {IdProducto} = req.body
    let mensaje = 'Gestionproductos eliminado exitosamente...'

    try{
        const Gestionproductos = await Gestionproductos.destroy({ where: { IdProducto: IdProducto } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el Gestionproductos...'+ req.params.IdProducto
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    gestionproductosGet,
    gestionproductosPut,
    gestionproductosPost,
    gestionproductosDelete
}