const express = require("express");
const router = express.Router();

let MaterialModelo = require("../modelos/materiales");

module.exports = function () {
  router.get("/", function (req, res) {
    MaterialModelo.getmateriales(function (error, data) {
      res.status(200).json(data);
    });
  });

  return router;
};
//------------------------------------------------------------------------
//Consulta por ID
router.get("/:id", function(req, res)
{
  let id = req.params.id;

  if(!isNaN(id))
  {
      MaterialModelo.getMaterialesID(id, function(error,data)
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

  let MaterialData = 
  {
        Id_Material: null,
        Nombre_Material: req.body.Nombre_Material,
        Proveedor_Material: req.body.Proveedor_Material,
        tel_Proveedor_Material: req.body.tel_Proveedor_Material,
        Uso_Material: req.body.Uso_Material,
        Tipo_Material: req.body.Tipo_Material
  };
  
  //Uso de la funcion insertar
  MaterialModelo.insertMateriales(MaterialData, function (error, data)
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
    let MaterialData = 
    {
      Id_Material: req.body.Id_Material,
      Nombre_Material: req.body.Nombre_Material,
      Proveedor_Material: req.body.Proveedor_Material,
      tel_Proveedor_Material: req.body.tel_Proveedor_Material,
      Uso_Material: req.body.Uso_Material,
      Tipo_Material: req.body.Tipo_Material
    };

    MaterialModelo.updateMateriales(MaterialData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;