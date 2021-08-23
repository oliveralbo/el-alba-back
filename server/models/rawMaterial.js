const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let tiposValidos = {
    values: ["Kilogramos", "Litros"],
    message: '{VALUE}, no es un tipo valido'
}


let Schema = mongoose.Schema;

let rawMaterialSchema = new Schema({

    product:{
        type: String,
        unique: [ true, 'No puede haber dos productos con el mismo nombre' ],
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    quantity:{
        type: Number,
        required: [true, "La cantidad es necesaria"],  // el corchete para cambiar el mensaje default;      
    },
    tipo:{
        type: String,
        enum: tiposValidos,
        default:"Kilogramos", 
    },
    price:{
        type: Number,
        require: false
    },
    state:{
        type: Boolean,
        default: true  
    },

});

rawMaterialSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('MateriaPrima' , rawMaterialSchema)