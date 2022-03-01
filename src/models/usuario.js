//Empezamos importando los archivos js que requerimos para hacer un modelo con mongoose
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Además, definimos un Schema de mongoose.
let rolesValidos = {    
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'}
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },

    appat: {
        type: String,
        required: [true, 'El apellido paterno, es obligatorio'],
    },
    
    apmat: {
        type: String,
        required: [true, 'El apellido materno es obligatorio'],
    },
    
    email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
    },

    user: {
        type: String,
        required: [true, 'El usuario es necesario'],
    },
    
    password: {
    type: String,
    required: [true, "Le contraseña es obligatoria"],
    },
    
    role: {
    type: String,
    default: 'USER',
    required: [true],
    enum: rolesValidos,
    },
});

/*
Ahora, el modelo Usuarios también se encarga de traernos la data de cada usuario registrado
al momento de hacer login; en este caso, nos devolvería toda la información del modelo, 
incluyendo la contraseña, aunque la contraseña estará encriptada con un hash jwt 
¿queremos que cualquier usuario tenga acceso a la cadena encriptada de nuestros usuarios?

La respuesta es un rotundo no, por lo cual, al momento de hacer login, 
tenemos que asegurarnos que este campo no nos lo devuelva, motivo por el cual, 
tendremos que eliminarlo de la response de la petición http
*/

// elimina la key password del objeto que retorna al momento de crear un usuariousuarioSchema.methods.toJSON = function() {   let user = this;
usuarioSchema.methods.toJSON = function() {  
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;   
    return userObject;
}

/*
y por último, agregamos el plugin de validación única y exportamos el modelo recién creado
*/

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})



module.exports = mongoose.model('Usuario', usuarioSchema)