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
        default:"kg",
    },
    quantity:{
        type: Number,
        required: false,  
    },
    price:{
        type: Number,
        require: [true, "El precio es necesario"]  
    },
    state:{
        type: Boolean,
        default: true  
    }
});

productDoneSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('Producto' , productDoneSchema)