let jwt = require('jsonwebtoken');

const Recipes = (req, res, Recetas) => {


    let configGet = "product ingedients";
    let objectRegistry = ["product", "ingredients" ];




        let body = req.body;
        // console.log(body)
        let bodyArr = Object.keys(body);
        let bodyArrValues = Object.values(body);
        let registryObj = {};
    
    //     for (let i = 0; i < objectRegistry.length; i++) {
    //    console.log(bodyArr)
    //         if (objectRegistry[i] === bodyArr[i]) {
             
    //             if(typeof(bodyArr[i]) === 'object'){
    //                     console.log("si es un objeto")
    //                 }

    //            registryObj[objectRegistry[i]] = bodyArrValues[i];
            
    //       }
    //     }
    console.log(body)
         let registry = new Recetas(body);
  console.log(registry)
       
        registry.save((err, registryDB) => {
          if (err) {
            return res.status(400).json({ ok: false, err });
          }
          console.log(registryDB)
          //usuarioDB.password = null; // solucion posible a q no evuelva el pass. no recomendada
          if (req.authUser && req.authUser.name) {
            res.json({
              ok: true,
              registry: registryDB,
              reqUser: req.authUser.name,
            });
          } else {
            res.json({ ok: true, registry: registryDB });
          }
        });
     
  }


module.exports = Recipes;