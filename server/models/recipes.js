const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;

let recipesSchema = new Schema({

    product:{
        key: {
            type: String,
            unique: true,
            require: [true, "El nombre es necesario y debe ser unico"]    // el corchete para cambiar el mensaje default;
       },
        value : {
            type: Number,
            unique: false,
            require: [true, "Es necesaria la cantidad del producto"]    // el corchete para cambiar el mensaje default;
       }     
    },
    ingredients:{
        keys: [{type: String, unique: false}],
        values : [{type: Number, unique: false}],
    },
    state:{
        type: Boolean,
        default: true  
    }
    

});

recipesSchema.plugin(uniqueValidator, { message: 'Error, no puede repetir la receta.' });




module.exports = mongoose.model('Recetas' , recipesSchema)