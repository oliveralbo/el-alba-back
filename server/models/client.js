const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;




const OrdersSchema = new Schema({
        day:{
            type: String,
            required: true,
            maxlength: 10,
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

  });

const PaymentsSchema = new Schema({
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

    });

let clientSchema = new Schema({

    name:{
        type: String,
        required: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    company:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: false   
    },
    address:{
        type: String,
        required: false   
    },
    loaction:{
        type: String,
        required: false   
    },
    email:{
        type: String,
        required: false
    },
    account:{
        type: Number,    
    },
    orders:[OrdersSchema], 
    payments:[PaymentsSchema],
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
    orders : [{
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
    payments: [
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
