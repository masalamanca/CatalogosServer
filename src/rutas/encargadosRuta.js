const express = require("express");
const router = express.Router();

let EncargadoModelo = require("../modelos/encargados");

module.exports = function () {
  router.get("/", function (req, res) {
    EncargadoModelo.getencargados(function (error, data) {
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
      EncargadoModelo.getEncargadosID(id, function(error,data)
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

  let EncargadoData = 
  {

    Id_Encargado: null ,
    Nom1_Encargado: req.body.Nom1_Encargado,
    Nom2_Encargado: req.body.Nom2_Encargado,
    Apell1_Encargado: req.body.Apell1_Encargado,
    Apell2_Encargado: req.body.Apell2_Encargado,
    Sexo_Encargado: req.body.Sexo_Encargado,
    FechaNacimiento_Encargado: req.body.FechaNacimiento_Encargado,
    Tip_Doc_Encargado: req.body.Tip_Doc_Encargado,
    num_Doc_Encargado: req.body.num_Doc_Encargado,
    Rol_Encargado: req.body.Rol_Encargado

  };
  
  //Uso de la funcion insertar
  EncargadoModelo.insertEncargado(EncargadoData, function (error, data)
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
    let EncargadoData = 
    {
      Id_Encargado: req.body.Id_Encargado,
      Nom1_Encargado: req.body.Nom1_Encargado,
      Nom2_Encargado: req.body.Nom2_Encargado,
      Apell1_Encargado: req.body.Apell1_Encargado,
      Apell2_Encargado: req.body.Apell2_Encargado,
      Sexo_Encargado: req.body.Sexo_Encargado,
      FechaNacimiento_Encargado: req.body.FechaNacimiento_Encargado,
      Tip_Doc_Encargado: req.body.Tip_Doc_Encargado,
      num_Doc_Encargado: req.body.num_Doc_Encargado,
      Rol_Encargado: req.body.Rol_Encargado
    };

    EncargadoModelo.updateEncargado(EncargadoData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;
