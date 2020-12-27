const express = require("express");
const app = express();
const Producto = require("../models/productDone");
const MateriaPrima = require("../models/rawMaterial");
const { authToken } = require("../middlewares/auth");

//PUT
app.put("/proceso", authToken, function (req, res) {


    let prod = Object.keys(req.body.pro)
    let valueProd = Object.values(req.body.pro)

    let idProduc = prod[0];

    Producto.findByIdAndUpdate(
      idProduc,
      { $inc: {"quantity" : valueProd[0]}},
      { new: true, runValidators: true },
      (err, registryDB) => {
        if (err) {
          return res.status(400).json({ ok: false, err });
        }

      },
    );


    let rawMaterial = Object.keys(req.body.mp)
    let valueRawMat = Object.values(req.body.mp)
    let cant = rawMaterial.length

    for(let i =0; i<cant;i++){

        let idrawMaterial = rawMaterial[i];

        MateriaPrima.findByIdAndUpdate(
            idrawMaterial,
            { $inc: {"quantity" : -valueRawMat[0]}},
          { new: true, runValidators: true },
          (err, registryDB) => {
            if (err) {
              return res.status(400).json({ ok: false, err });
            }
    
          },
        );
    }

res.json({
    ok: true,
    registry: "Proceso realizado con exito",
    reqUser: req.authUser.email,
})
   
 
  
});

module.exports = app;
