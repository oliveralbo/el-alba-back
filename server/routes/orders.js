const express = require("express");
const app = express();
const Pedido = require("../models/orders");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");
const Orders_PaymentsControllers = require("../controllers/orders_PaymentsControllers")



let configGet = "day amount product quantity delivered clientId clientName orderNumber" 
let objectRegistry = ["day", "amount", "product", "quantity", "clientId", "clientName"  ]


// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)
const ordersControllers = new Orders_PaymentsControllers(configGet,objectRegistry)


//GET ALL
app.get("/pedidos", authToken, (req, res) => {
  controllers.getAll(Pedido, req, res);
});

//GET ALL FOR CLIENT   entregados y por cliente
app.get("/pedidosClients", authToken, (req, res) => {
  //esta hay que hacerla
  controllers.getAll(Pedido, req, res);
});

//GET ALL NOT DELIVERED  
app.get("/pedidos/noentregados", authToken, (req, res) => {
  ordersControllers.ordersNotDelivered(Pedido,req,res)
});

//GET BY ID
app.get("/pedido/:id", authToken, (req, res) => {
  controllers.getById(Pedido, req, res);
});

//POST     -
app.post("/pedido", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(Pedido, req, res);
});

//PUT
app.put("/pedido/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(Pedido, req, res);
});

//DELETE
app.delete("/pedido/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(Pedido, req, res);
});

module.exports = app;
