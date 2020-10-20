const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let rolesValidos = {
    values: ["USER_ROLE", "ADMIN_ROLE"],
    message: '{VALUE}, no es un rol valido'
}


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre:{
        type: String,
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    email:{
        type: String,
        unique: true,
        required: [true, "El e-mail es necesario"],  // el corchete para cambiar el mensaje default;
       
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]    // el corchete para cambiar el mensaje default;
    },
    img:{
        type: String,      
    },
    role:{
        type: String,
        default : "USER_ROLE",
        enum: rolesValidos
    },
    state:{
        type: Boolean,
        default: true   // ej: activo, inactivo(borrado virtual, se aconseja poner date a este tipo de valores)
    },
    google:{
        type: Boolean,
        required: false   //el required:false es innecesario, se entiende al no estar el valor
    },



});

usuarioSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });


//para q nos devuelva el objeto sin el password
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password

    return userObject;
}


module.exports = mongoose.model('Usuario' , usuarioSchema)