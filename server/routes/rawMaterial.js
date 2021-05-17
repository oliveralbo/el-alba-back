const express = require("express");
const app = express();
const MateriaPrima = require("../models/rawMaterial");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "product provider quantity price type";
let objectRegistry = ["product", "provider", "quantity", "price", "type"];



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


//GET ALL
app.get("/materiasprimas", authToken, (req, res) => {
  controllers.getAll(MateriaPrima, req, res);
});

//GET BY ID
app.get("/materiaprima/:id", authToken, (req, res) => {
  controllers.getById(MateriaPrima, req, res);
});

//POST     -
app.post("/materiaprima", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(MateriaPrima, req, res);
});

//PUT
app.put("/materiaprima/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(MateriaPrima, req, res);
});

//DELETE
app.delete("/materiaprima/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(MateriaPrima, req, res);
});

module.exports = app;
