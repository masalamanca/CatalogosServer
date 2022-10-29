let mysql = require("mysql");

let settings = require("./config.json");

let Connection;

function connectDatabase() {
  if (!Connection) {
    Connection = mysql.createConnection(settings);

    Connection.connect(function (err) {
      if (!err) {
        console.log("Base de Datos Conectada " + settings.database);
      } else {
        console.log("Error en la conexión con la Base de Datos");
      }
    });
  }

  return Connection;
}

module.exports = connectDatabase();
