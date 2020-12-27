const express = require("express");
const app = express();
const Receta = require("../models/recipes");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "product ingredients";
let objectRegistry = ["product", "ingredients"];


// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


//GET ALL
app.get("/recetas", authToken, (req, res) => {
  controllers.getAll(Receta, req, res);
});

//GET BY ID
app.get("/receta/:id", authToken, (req, res) => {
  controllers.getById(Receta, req, res);
});

//POST     -
app.post("/receta", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(Receta, req, res);
});

//PUT
app.put("/receta/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(Receta, req, res);
});

//DELETE
app.delete("/materiaprima/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(Receta, req, res);
});

module.exports = app;