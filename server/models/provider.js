const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;

let providersSchema = new Schema({

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

});

providersSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('Proveedor' , providersSchema)