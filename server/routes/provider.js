const express = require("express");
const app = express();
const Proveedor = require("../models/provider");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "name company phone address location email";
let objectRegistry = ["name", "company", "phone", "address", "location", "email"];



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


//GET ALL
app.get("/proveedores", authToken, (req, res) => {
  controllers.getAll(Proveedor, req, res);
});

//GET BY ID
app.get("/proveedor/:id", authToken, (req, res) => {
  controllers.getById(Proveedor, req, res);
});

//POST     -
app.post("/proveedor", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(Proveedor, req, res);
});

//PUT
app.put("/proveedor/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(Proveedor, req, res);
});

//DELETE
app.delete("/proveedor/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(Proveedor, req, res);
});

module.exports = app;
