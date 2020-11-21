const express = require("express");
const app = express();
const Usuario = require("../models/user");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "name surname email phone dni ";
let objectRegistry = ["name", "surname", "email", "phone", "dni"];



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


//GET ALL
app.get("/usuarios", authToken, (req, res) => {
  controllers.getAll(Usuario, req, res);
});

//GET BY ID
app.get("/usuario/:id", authToken, (req, res) => {
  controllers.getById(Usuario, req, res);
});

//POST     -
app.post("/usuario", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(Usuario, req, res);
});

//PUT
app.put("/usuario/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(Usuario, req, res);
});

//DELETE
app.delete("/usuario/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(Usuario, req, res);
});

module.exports = app;
