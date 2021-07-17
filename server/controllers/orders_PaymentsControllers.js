const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class orders_PaymentsControllers {
  constructor(configGet, objectRegistry, type) {
    this.configGet = configGet;
    this.objectRegistry = objectRegistry;
    this.type = type;
  }

  ordersNotDelivered(Model, req, res) {
    Model.find({ delivered: false, state: true }, this.configGet).exec(
      (err, registry) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          registry: registry,
          reqUser: req.authUser.email,
        });
      }
    );
  }

  //es el getAll de pedidos y ordenes por id de cliente. no trae una.
  //solo los pagos desde que separamos orders
  getById(Model, req, res) {
    const { id } = req.params;

    Model.findById(id).exec((err, registry) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      const registryType =
        this.type === "payments" ? registry.payments : registry.orders;
      res.json({
        ok: true,
        registry: registryType,
        reqUser: req.authUser.email,
      });
    });
  }

  //agrega pedidos y pagos x id de cliente
  async addRegisrty(Model, req, res) {
    const body = req.body;
    const idClient = body._id;
    let registryFinal = {};
    delete body._id;

    if (idClient) {
      // if (this.type === 'orders') {
      //   Model.updateOne({ _id: idClient }, {
      //     $inc: {"account" :body.amount},
      //     $push: {
      //       'orders': body// guarda el pedido y suma a la cta. ! !!
      //     }
      //   },
      //     (error) => {
      //       if (error) {
      //         return res.status(400).json({
      //           ok: false,
      //           error,
      //         });
      //       } else {
      //         return res.json({
      //           ok: true,
      //           // registry,
      //           reqUser: req.authUser.email,
      //         });
      //       }
      //     }
      //   )
      // }

      if (this.type === "payments") {
        try {
          Model.updateOne(
            { _id: idClient },
            {
              $push: {
                payments: body, // aca orders and payments y ver dnd mas
              },
            },
            (error) => {
              if (error) {
                return res.status(400).json({
                  ok: false,
                  error,
                });
              }
            }
          );
          Model.findByIdAndUpdate(
            idClient,
            { $inc: { account: -body.amount } },
            { new: true, runValidators: true },
            (err, registry) => {
              if (err) {
                return res.status(400).json({ ok: false, err });
              }
              let lastPay = registry.payments.pop();
              registryFinal.payment = lastPay;
              registryFinal.account = registry.account;
              return res.json({
                ok: true,
                registry: registryFinal,
                reqUser: req.authUser.email,
              });
            }
          );
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      return res.status(400).json({
        ok: false,
        error: "no hay idClient",
      });
    }
  }

  async delivered(Model, req, res) {
    let idClient = req.params.id;
    let body = req.body;
    let registryFinal = {};
    delete body._id;
    if (idClient) {
  
      if (this.type === "payments") {
        Model.findByIdAndUpdate(
          idClient,
          { $inc: { account: body.amount } },
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
          }
        );
      } else {
        return res.status(400).json({
          ok: false,
          error: "no hay idClient",
        });
      }
    }
  }
}

module.exports = orders_PaymentsControllers;
