var jwt = require('jsonwebtoken');




const authToken = (req, res, next) => {
  let token = req.get("token");


  jwt.verify(token, process.env.SEED, (err, decoded)=>{
    
    if (err) {
        return res.status(401).json({ ok: false, err });
      }
      //console.log(decoded)
      req.authUser = decoded.user;
      next();
    })


};




const validateRole = (req, res, next) => {
  let usuario = req.authUser;

  if(usuario.role === 'ADMIN_ROLE'){
    next()
  }else{
    return res.status(403).json({ ok: false, err: {message: 'Forbidden'} });
  }

};

module.exports = { authToken,validateRole };
