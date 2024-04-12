const Compras = require("../models/compras");
const DetalleProductosCompras = require("../models/detalleProductosCompras");
const { response, request } = require("express");

const comprasGet = async (req, res) => {
  try {
    const compras = await Compras.findAll();
    res.json({ compras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor..." });
  }
};

const comprasPost = async (req, res = response) => {
  let mensaje = "Compra registrada exitosamente...";
  try {
    const nuevaCompra = await Compras.create(req.body);
    if (nuevaCompra) {
      const detalles = req.body.detalles;
      if (detalles && detalles.length > 0) {
        // Crear detalles de productos de compra para cada detalle recibido
        for (const detalle of detalles) {
          await DetalleProductosCompras.create({
            IdCompra: nuevaCompra.IdCompra,
            IdProducto: detalle.IdProducto,
            NumeroFactura: nuevaCompra.NumeroFactura,
            FechaRegistro: nuevaCompra.FechaRegistro,
            TotalCompra: detalle.TotalCompra,
          });
        }
      }
      res.json({ compra: nuevaCompra, detalles, msg: mensaje });
    } else {
      mensaje = "Error al registrar la compra";
      res.json({ msg: mensaje });
    }
  } catch (error) {
    mensaje = error.message;
    console.error(error);
    res.status(500).json({ error: mensaje });
  }
};

const comprasPut = async (req, res = response) => {
  const {
    IdCompra,
    IdProveedor,
    IdProducto,
    NumeroFactura,
    FechaRegistro,
    SubTotal,
  } = req.body;
  let mensaje = "Modificación exitosa";
  try {
    const find = await Compras.findByPk(IdCompra);
    console.log(find);
    find != null
      ? await Compras.update(
          {
            IdProveedor: IdProveedor,
            IdProducto: IdProducto,
            NumeroFactura: NumeroFactura,
            FechaRegistro: FechaRegistro,
            SubTotal: SubTotal,
          },
          {
            where: {
              IdCompra: IdCompra,
            },
          }
        )
      : (mensaje = "No existe la compra para ser modificada...");
  } catch (error) {
    mensaje = "Se presentaron problemas al modificar la compra...";
  }
  res.json({
    msg: mensaje,
  });
};

const comprasDelete = async (req, res) => {
  const { IdCompra } = req.body;
  let mensaje = "compra eliminada exitosamente...";

  try {
    const compras = await Compras.destroy({ where: { IdCompra: IdCompra } });
  } catch (error) {
    mensaje =
      "Se presentaron problemas al eliminar la compra..." + req.params.IdCompra;
  }

  res.json({
    msg: mensaje,
  });
};

module.exports = {
  comprasGet,
  comprasPut,
  comprasPost,
  comprasDelete,
};
