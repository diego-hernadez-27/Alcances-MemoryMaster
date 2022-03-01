/*
Como se observó en la estructura de carpetas, dentro de la carpeta routes
contamos con 3 archivos, el index, que es el archivo principal donde 
importamos el resto de rutas; seguido del archivo
login.js y register.js que contiene el código pertinente para hacer login y register.
*/
const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require ('./register'));

module.exports = app;