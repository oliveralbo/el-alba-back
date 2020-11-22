const express = require("express");
const app = express();
const Producto = require("../models/productDone");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "product type quantity price";
let objectRegistry = ["product", "type", "quantity", "price"];



// configuracion de Schemas/Models en los httpRequest
const controllers = new Controllers(configGet,objectRegistry)


//GET ALL
app.get("/productos", authToken, (req, res) => {
  controllers.getAll(Producto, req, res);
});

//GET BY ID
app.get("/producto/:id", authToken, (req, res) => {
  controllers.getById(Producto, req, res);
});

//POST     -
app.post("/producto", [authToken, validateRole], function (req, res) {
  controllers.addRegisrty(Producto, req, res);
});

//PUT
app.put("/producto/:id", [authToken, validateRole], function (req, res) {
  controllers.editRegisrty(Producto, req, res);
});

//DELETE
app.delete("/producto/:id", [authToken, validateRole], function (req, res) {
  controllers.deleteRegByState(Producto, req, res);
});

module.exports = app;
