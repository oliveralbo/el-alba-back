const express = require("express");
const app = express();
const Cliente = require("../models/client");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");
const Orders_PaymentsControllers = require("../controllers/orders_PaymentsControllers")

let configGet = "name company phone address location email account";
let objectRegistry = ["name", "company", "phone", "address", "location", "email", "account" , "orders", "payments"];

let configPaymentsGet = "day amount coments" 
let ObjectPaymentsRegistry = ["day", "amount", "coments" ]
let typePayments = "payments"



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)
const paymentsControllers = new Orders_PaymentsControllers(configPaymentsGet,ObjectPaymentsRegistry, typePayments)

//GET ALL
app.get("/clientes", authToken, (req, res) => {
  controllers.getAll(Cliente, req, res);
});

//GET BY ID
app.get("/cliente/:id", authToken, (req, res) => {
  controllers.getById(Cliente, req, res);
});

//POST     -
app.post("/cliente", [authToken, validateRole], (req, res) => {
  controllers.addRegisrty(Cliente, req, res);
});


//PUT
app.put("/cliente/:id", [authToken, validateRole], (req, res) => {
  controllers.editRegisrty(Cliente, req, res);
});

//DELETE
app.delete("/cliente/:id", [authToken, validateRole], (req, res) => {
  controllers.deleteRegByState(Cliente, req, res);
});





//PAYMENTS
app.post("/cliente/pago", [authToken, validateRole], (req, res) => {
  paymentsControllers.addRegisrty(Cliente, req, res);
});

app.put("/cliente/entrega/:id", [authToken, validateRole], (req, res) => {
  paymentsControllers.delivered(Cliente, req, res);
});

app.get("/cliente/pagos/:id", [authToken, validateRole], (req, res) => {
  paymentsControllers.getById(Cliente, req, res);
});

module.exports = app;
