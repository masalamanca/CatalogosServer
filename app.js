let express = require("express"); //guarda express que nosotros intalamos
let bodyParser = require("body-parser"),
  port = 3000; //rmanejo de cuerpo de la "pagina" y puerto
let http = require("http"); //protocolo de intercambio de archivos
let path = require("path"); //direccion
const materiales_productosModelo = require("./src/modelos/materiales_productos");

//var conectado = require('./src/conexion/index');

let catalogo = require("./src/rutas/catalogoRuta"); //ruta
let contactos = require("./src/rutas/contactosRuta"); //ruta
let encargados = require("./src/rutas/encargadosRuta"); //ruta
let materiales = require("./src/rutas/materialesRuta"); //ruta
let materiales_productos = require("./src/rutas/materiales_produccionRuta"); //ruta
let produccion = require("./src/rutas/produccionRuta"); //ruta
let productos = require("./src/rutas/productosRuta"); //ruta
let informe = require("./src/rutas/informeRuta");//ruta 
let app = express(); //recibe un constructor

// todos los entornos

app.set("port", process.env.PORT || port); //metodo para recibir puerto y proceso

app.use(bodyParser.json({ type: "application/json", limit: "10mb" })); //recibe un cuerpo y un objeto json

app.use(bodyParser.urlencoded({ extended: false })); //recibe url codificada

app.use(express.static(path.join(__dirname, "public"))); //recibe direccion

//================================================================

app.use(function (req, res, next) {
  // Stio web al que desea permitir que se conecte

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // A que métodos que desea dar permisos

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // A que encabezados se les va a dar permiso

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas

  //a la API (por ejemplo, en caso de que use sesiones)

  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pase a la siguiente capa de middleware

  next();
});

//============================================================

app.use("/catalogo", catalogo()); //ruta para el servicio
app.use("/contactos", contactos()); //ruta para el servicio
app.use("/encargados", encargados()); //ruta para el servicio
app.use("/materiales", materiales()); //ruta para el servicio
app.use("/materiales_productos", materiales_productos()); //ruta para el servicio
app.use("/produccion", produccion()); //ruta para el servicio
app.use("/productos", productos()); //ruta para el servicio

http.createServer(app).listen(app.get("port"), function () {
  console.log("Servidor Express escuchando por el puerto " + app.get("port"));
});

module.exports = app;