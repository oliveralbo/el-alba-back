const express = require("express");
const app = express();
const Cliente = require("../models/client");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "name company phone address location email";
let objectRegistry = ["name", "company", "phone", "address", "location", "email"];



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


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

module.exports = app;
