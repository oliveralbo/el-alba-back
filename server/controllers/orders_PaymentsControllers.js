const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class orders_PaymentsControllers {
  constructor(configGet, objectRegistry, type) {
    this.configGet = configGet;
    this.objectRegistry = objectRegistry;
    this.type = type
  }

  // getAll(Model, req, res){
  //   let desde = Number(req.query.desde) || 0;
  //   let limite = Number(req.query.limite) || 0;


  //   Model.find({ state: true }, this.configGet) // el string segundo paramatro filtra los datos que trae. son el parametro trae todo por default
  //     .skip(desde) // los que salta al emepzar, o sea 'desde'
  //     .limit(limite) //la cantidad que trae
  //     .exec((err, records) => {
  //       if (err) {
  //         return res.status(400).json({
  //           ok: false,
  //           err,
  //         });
  //       }

  //       Model.countDocuments({ state: true }, (err, quantity) => {
  //         res.json({
  //           ok: true,
  //           records,
  //           registroTotal: quantity,
  //           reqUser: req.authUser.email,
  //         });
  //       });
  //     });
  // };





  //es el getAll de pedidos y ordenes por id de cliente. no trae una.
  getById(Model, req, res) {
    const { id } = req.params;


    Model.findById(id).exec((err, registry) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      const registryType = this.type === "payments" ? registry.payments : registry.orders
      res.json({
        ok: true,
        registry: registryType,
        reqUser: req.authUser.email,
      });
    });
  };






  //agrega pedidos y pagos x id de cliente
  async addRegisrty  (Model, req, res)  {

    const body = req.body;
    const idClient = body._id
    let registryFinal = {}
    delete body._id;

    if (idClient) {

      if (this.type === 'orders') {
        console.log(body.amount)
        Model.updateOne({ _id: idClient }, {
          $inc: {"account" :body.amount},
          $push: {
            'orders': body// guarda el pedido y suma a la cta. ! !!
          }
        },
          (error) => {
            if (error) {
              return res.status(400).json({
                ok: false,
                error,
              });
            } else {
              return res.json({
                ok: true,
                // registry,
                reqUser: req.authUser.email,
              });
            }
          }
        )
      }


      if (this.type === 'payments') {
        try {
          Model.updateOne({ _id: idClient }, {
            $push: {
              'payments': body// aca orders and payments y ver dnd mas
            }
          },
            (error) => {
              if (error) {
                return res.status(400).json({
                  ok: false,
                  error,
                });
              }
            }
          )
          Model.findByIdAndUpdate(
            idClient,
            { $inc: { "account": -body.amount } },
            { new: true, runValidators: true },
            (err, registry) => {
              if (err) {
                return res.status(400).json({ ok: false, err });
              }
              let lastPay = registry.payments.pop()
              registryFinal.payment = lastPay;
              registryFinal.account = registry.account
              return res.json({
                ok: true,
                registry: registryFinal,
                reqUser: req.authUser.email,
              });
            },
          );
        } catch (e) {
          console.error(e)
        }
      }

    } else {
      return res.status(400).json({
        ok: false,
        error:"no hay idClient",
      });
    }



  };





  

// //no se 
//   deleteRegByState (Model, req, res)  {
//     let id = req.params.id;
//     let changeState = {
//       state: false,
//     };

//     Model.findByIdAndUpdate(
//       id,
//       changeState,
//       { new: true },
//       (err, deleteRegisrty) => {
//         if (err) {
//           return res.status(400).json({ ok: false, err });
//         }

//         if (!deleteRegisrty) {
//           return res
//             .status(400)
//             .json({ ok: false, err: { message: "Registry not found" } });
//         }

//         res.json({
//           ok: true,
//           deleteRegisrty,
//           reqUser: req.authUser.email,
//         });
//       },
//     );
//   };

}


module.exports = orders_PaymentsControllers;
