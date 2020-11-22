const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;

let productDoneSchema = new Schema({

    product:{
        type: String,
        unique: [ true, 'No puede haber dos productos del mismo tipo' ],
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    type:{
        type: String,
        require: false    // el corchete para cambiar el mensaje default;
    },
    quantity:{
        type: Number,
        required: [true, "El cantidad es necesaria"],  // el corchete para cambiar el mensaje default;      
    },
    price:{
        type: Number,
        require: [true, "El precio es necesario"]  
    },

});

productDoneSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('Producto' , productDoneSchema)