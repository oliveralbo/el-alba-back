const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

app.post("/login", (req, res) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({ ok: false, err });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: { message: "usuario incorrecto" },
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: { message: "contraseña incorrecta" },
      });
    }

    if (!usuarioDB.state) {
        return res.status(400).json({
          ok: false,
          err: { message: "El usuario ha sido dado de baja" },
        });
      }

     let token = jwt.sign({  //generacion de token en login
        user: usuarioDB
      }, process.env.SEED, { expiresIn: process.env.VENC_TOKEN });

    res.json({
      ok: true,
      user: usuarioDB,
      token
    });
  });
});

module.exports = app;
