const express = require("express");
const app = express();
const Usuario = require("../models/user");
const { authToken, validateRole } = require("../middlewares/auth");
const Controllers = require("../controllers/controllers");

let configGet = "name surname dni phone email";
let objectRegistry = ["name", "surname","dni",  "phone", "email", "password", "role"];



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
app.post("/usuario",(req, res) => {
  let temp = {};
    objectRegistry.forEach(item=>{
      for (const x in req.body) {
        if(x === item){
          temp[x] = req.body[x]
        }
      }
    })
    req.body = temp
  controllers.addRegisrty(Usuario, req, res);
});

//PUT
app.put("/usuario/:id", [authToken, validateRole],(req, res) => {
  controllers.editRegisrty(Usuario, req, res);
});

//DELETE
app.delete("/usuario/:id", [authToken, validateRole],(req, res) => {
  controllers.deleteRegByState(Usuario, req, res);
});

module.exports = app;
