const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class Controllers {
    constructor(configGet, objectRegistry) {
    this.configGet = configGet;
    this.objectRegistry = objectRegistry;
  }

  getAll(Model, req, res){
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
  

    Model.find({ state: true }, this.configGet) // el string segundo paramatro filtra los datos que trae. son el parametro trae todo por default
      .skip(desde) // los que salta al emepzar, o sea 'desde'
      .limit(limite) //la cantidad que trae
      .exec((err, records) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        Model.countDocuments({ state: true }, (err, quantity) => {
          res.json({
            ok: true,
            records,
            registroTotal: quantity,
            reqUser: req.authUser.email,
          });
        });
      });
  };

  getById  (Model, req, res)  {
    const { id } = req.params;
//ver como hacer cliente datos base
    Model.findById(id, this.configGet).exec((err, registry) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        registry,
        reqUser: req.authUser.email,
      });
    });
  };

  addRegisrty  (Model, req, res)  {
    let body = req.body;
    let bodyArr = Object.keys(body);
    let bodyArrValues = Object.values(body);
    let registryObj = {};

    for (let i = 0; i < this.objectRegistry.length; i++) {
      if (this.objectRegistry[i] === bodyArr[i]) {
        //en el caso de necesitar encriptar un dato de cualquier Modelo agregado, configurarlo acá
        if (this.objectRegistry[i] === "password") {
          registryObj[this.objectRegistry[i]] = bcrypt.hashSync(
            bodyArrValues[i],
            10,
            );
          } else {
            registryObj[this.objectRegistry[i]] = bodyArrValues[i];
          }
        }
      }
      let registry = new Model(registryObj);
      console.log(registry)

    registry.save((err, registryDB) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }
      //usuarioDB.password = null; // solucion posible a q no evuelva el pass. no recomendada
      if (req.authUser && req.authUser.name) {
        res.json({
          ok: true,
          registry: registryDB,
          reqUser: req.authUser.name,
        });
      } else {
        res.json({ ok: true, registry: registryDB });
      }
    });
  };

  editRegisrty  (Model, req, res)  {
    let id = req.params.id;
    let body = req.body;

    //en lugar de esto se puede usar el pick de la libreria underscore al reves, eligiendo los datos que SI se pueden modificar
    body && body.password ? delete body.password : null;
    body && body.google ? delete body.google : null;

    //findByIdAndUpdate --> funcion mongoose (id, body, options --> new: devuelve actualizado. sino, actualiza pero trae el sin actualizar. runValidators: valiada por schema  ,  callback )
    Model.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, registryDB) => {
        if (err) {
          return res.status(400).json({ ok: false, err });
        }

        res.json({
          ok: true,
          registry: registryDB,
          reqUser: req.authUser.email,
        });
      },
    );
  };

  deleteRegByState  (Model, req, res)  {
    let id = req.params.id;
    let changeState = {
      state: false,
    };

    Model.findByIdAndUpdate(
      id,
      changeState,
      { new: true },
      (err, deleteRegisrty) => {
        if (err) {
          return res.status(400).json({ ok: false, err });
        }

        if (!deleteRegisrty) {
          return res
            .status(400)
            .json({ ok: false, err: { message: "Registry not found" } });
        }

        res.json({
          ok: true,
          deleteRegisrty,
          reqUser: req.authUser.email,
        });
      },
    );
  };

  realDelete (Model, req, res) {
    let id = req.params.id;

    Model.findByIdAndRemove(id, (err, deleteRegisrty) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      if (!deleteRegisrty) {
        return res
          .status(400)
          .json({ ok: false, err: { message: "Registry not found" } });
      }

      res.json({
        ok: true,
        deleteRegisrty,
        reqUser: req.authUser.email,
      });
    });
  };
}


 module.exports = Controllers;
