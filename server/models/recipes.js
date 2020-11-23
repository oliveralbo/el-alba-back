const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let Schema = mongoose.Schema;

let recipesSchema = new Schema({

    product:{
        key: {
            type: String,
            unique: [ true, 'No puede haber dos productos del mismo tipo' ],
            require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
       },
        value : {
            type: Number,
            require: [true, "Es necesaria la cantidad del producto"]    // el corchete para cambiar el mensaje default;
       }     
    },
    ingredients:{
        keys: [{
            type: String,
            unique: [ true, 'No puede haber dos productos del mismo tipo' ],
            require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
        }],
           values : [{
            type: Number,
            require: [true, "Es necesaria la cantidad del producto"]    // el corchete para cambiar el mensaje default;
           }]     
    },
    state:{
        type: Boolean,
        default: true  
    }
    

});

recipesSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });




module.exports = mongoose.model('Recetas' , recipesSchema)