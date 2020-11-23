const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator'); // esta lib para manejar el error de unique


let rolesValidos = {
    values: ["employee", "admin"],
    message: '{VALUE}, no es un rol valido'
}


let Schema = mongoose.Schema;

let userSchema = new Schema({

    name:{
        type: String,
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    surname:{
        type: String,
        require: [true, "El nombre es necesario"]    // el corchete para cambiar el mensaje default;
    },
    email:{
        type: String,
        unique: [ true, 'No puede haber dos e-mails iguales' ],
        required: [true, "El e-mail es necesario"],  // el corchete para cambiar el mensaje default;      
    },
    phone:{
        type: String,
        required: false
    },
    dni:{
        type: String,
        required: [true, "El DNI es obligatorio"],
        unique: [ true, 'No puede haber dos DNI iguales' ],
        maxlength: [ 8, 'El DNI no puede exceder los 8 caracteres' ],
        minlength: [ 7, 'El DNI no puede tener menos de 7 caracteres' ]
    },
    role:{
        type: String,
        enum: rolesValidos,
        default : "employee"
    },
    state:{
        type: Boolean,
        default: true   // ej: activo, inactivo(borrado virtual, se aconseja poner date a este tipo de valores)
    },

});

userSchema.plugin(uniqueValidator, { message: 'Error, se esperaba {PATH} sea unico.' });


//para q nos devuelva el objeto sin el password
// usuarioSchema.methods.toJSON = function(){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password

//     return userObject;
// }


module.exports = mongoose.model('Usuario' , userSchema)