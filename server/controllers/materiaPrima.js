const { response } = require('express');
const MateriaPrima = require('../models/rawMaterial');

const actualizarMateriaPrima = async (req, res = response) => {
  const mPrimaId = req.params.id;
  const body = req.body;
  try {
    
    const mPrima = await MateriaPrima.findById( mPrimaId );
    if ( !mPrima ) {
      return res.status(404).json({
          ok: false,
          msg: 'Evento no existe por ese id'
      });
    }

    const updateMPrima = {
      ...body,
      quantity: mPrima.quantity + body.quantity,
      price: body.price
    }

    const mPrimaActualizada = await MateriaPrima.findByIdAndUpdate( mPrimaId, updateMPrima, { new: true } );

    res.json({
      ok: true,
      evento: mPrimaActualizada
    });

  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  actualizarMateriaPrima
}