let jwt = require('jsonwebtoken');

const Login = (req, res, Usuario) => {
    let body = req.body;

    Usuario.findOne({ name: body.name }, (err, usuarioDB) => {
      if (err) {
        return res.status(500).json({ ok: false, err });
      }
  
  
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: { message: "Usuario incorrecto" },
        });
      }
     
      if (body.dni !== usuarioDB.dni) {
        return res.status(400).json({
          ok: false,
          err: { message: "Documento incorrecto" },
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
  }


module.exports = Login;