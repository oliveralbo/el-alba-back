const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;

let clientSchema = new Schema({



    name:{
        type: String,
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    company:{
        type: String,
        require: false
    },
    phone:{
        type: Number,
        require: false   
    },
    address:{
        type: String,
        require: false   
    },
    loaction:{
        type: String,
        require: false   
    },
    email:{
        type: String,
        require: false
    },
    account:{
        type: Number,    
    },
    orders : [{
        day:{
            type: String,
            required: true,
            maxlength: 8,
            minlength: 6
        },
        amount:{
            type: Number,
            required: true
        },
        product:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }],
    payments:[{
        day:{
            type: String,
            required: true,
            maxlength: 8,
            minlength: 6
        },
        amount:{
            type: Number,
            required: true
        },
        coments: {
            type: String
        }

    }],
    state:{
        type: Boolean,
        default: true   // ej: activo, inactivo(borrado virtual, se aconseja poner date a este tipo de valores)
    }

});

clientSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('Cliente' , clientSchema)








    /**
     * 
     *   {
    name: "Diego Perez",
    company: "Guimpi",
    phone: 45684546,
    address: "E. Lamarca 2021",
    location: "caba",
    email: "guimpi@supizza.com.ar",
    account: 7500,
    pedidos : [{
      day : "13/2/18",
      amount: 350,
      product: "Muzza A",
      quantity: 10
    },{
      day : "13/2/18",
      amount: 350,
      product: "Muzza A",
      quantity: 10
    },{
      day : "13/2/18",
      amount: 350,
      product: "Muzza A",
      quantity: 10
    },{
      day : "13/2/18",
      amount: 350,
      product: "Muzza A",
      quantity: 10
    }],
    Payments: [
      {
        day : "13/2/18",
        amount: 350,
        comments: ""
      }
    ]

  },

     * 
     * 
     * 
     * 
     */
