//Puerto de acceso desde nuestro localhost
process.env.PORT = process.env.PORT || 4000;

//Entorno de desarrollo (dev, local, prod, test)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Cadena de conexión a nuestra bd.
let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/memory";//me falta poner la base de datos
} else {
    
};
process.env.URLDB = urlDB;

//Caducidad del token
process.env.CADUCIDAD_TOKEN = '2h';

//Seeds de autenticación
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';