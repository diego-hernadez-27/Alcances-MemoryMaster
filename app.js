//Framework
const express = require("express");

//Modulo con Mongo
const mongoose = require('mongoose');

// usaremos path para unir directorios
const path = require("path");

// usaremos morgan para los middlewares
const morgan = require("morgan");

//Requerimos cosas de la configuraciones
require('./src/config/config');

// usamos el framework
const app = express();

//para tarer los datos del documento del HTML
const bodyParser = require('body-parser');

//Lo ponemos en el puerto 4000
const PORT = process.env.PORT || 4000;

//configurar los middlewares se ejecutan antes de que vengan las peticiones del cliente
//vamos registrar las peticiones que llegan antes de procesarlas
app.use(morgan("dev"));

/*
El siguiente código es básicamente un middleware que nos ayuda a “parsear” 
los datos que recibimos a través del protocolo http.
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*
Como buenas prácticas se nos recomienda separar nuestro proyecto por partes, 
en este caso, las rutas, es decir; los controladores deben de tener su propio archivo y 
exportarlos como un
“middleware” al archivo server.js
*/
// Configuracion global de rutas
app.use(require('./src/routes/index'));

/*
Las siguientes líneas nos indica una ruta raíz, es decir,
 al momento que vamos a localhost:3000 nodejs nos servirá un archivo html sencillo.
*/
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

//La conexión a nuestra db no debe de faltar
mongoose.connect(process.env.URLDB, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
});

//Escuchamos en el puerto 4000
app.listen(PORT, () => {
    console.log(`Run in -p ${ PORT }`);
});

