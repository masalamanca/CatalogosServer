const express = require("express");
const router = express.Router();

let ContactosModelo = require("../modelos/contactos");

module.exports = function () {
  router.get("/", function (req, res) {
    ContactosModelo.getcontactos(function (error, data) {
      res.status(200).json(data);
    });
  });

  return router;
};
//Consulta por ID
router.get("/:id", function(req, res)
{
  let id = req.params.id;

  if(!isNaN(id))
  {
    ContactosModelo.getContactoID(id, function(error,data)
      {
          if(typeof data !== "undefined" && data.length > 0)
          {
              res.status(200).json(data);
          }
          else
          {
              res.json(404,{msg: "Registro no existe"});
          }
      });
  }
  else
  {
      res.status(500).json({msg: "Error"});
  }
});


//----------------------------------------------------------------


//Metodo Insertar
router.post("/", function (req, res) 
{

  let ContactoData = 
  {
    Id_Contactos: null,
    Dato_Contacto: req.body.Dato_Contacto,
    Encargado_Contacto: req.body.Encargado_Contacto,
    Tipo_Contacto: req.body.Tipo_Contacto,
  };
  
  //Uso de la funcion insertar
  ContactosModelo.insertContacto(ContactoData, function (error, data)
  {
   
      //Muestra el mensaje
      if (data) 
      {
          res.status(200).json(data);
      } 
      else 
      {
          res.status(500).send({ error: "boo:(" })
      }
  });
});

//-----------------------------------------------------------------------
//Metodo Modificar
router.put("/", function(req, res)
{
    let ContactoData = 
    {
        Id_Contactos: req.body.Id_Contactos,
        Dato_Contacto: req.body.Dato_Contacto,
        Encargado_Contacto: req.body.Encargado_Contacto,
        Tipo_Contacto: req.body.Tipo_Contacto,
    };

    ContactosModelo.updateContacto(ContactoData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;
