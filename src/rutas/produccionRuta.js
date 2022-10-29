const express = require("express");
const router = express.Router();

let ProduccionModelo = require("../modelos/produccion");

module.exports = function () {
  router.get("/", function (req, res) {
    ProduccionModelo.getproduccion(function (error, data) {
      res.status(200).json(data);
    });
  });

//Consulta por ID
router.get("/:id", function(req, res)
{
  let id = req.params.id;

  //if(!isNaN(id)){
    ProduccionModelo.getProduccionID(id, function(error,data)
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
  //}else{res.status(500).json({msg: "Error"});}
});


//----------------------------------------------------------------


//Metodo Insertar
router.post("/", function (req, res) 
{

  let ProduccionData = 
  {

    Id_Produccion: null,
    Fecha_Produccion: req.body.Fecha_Produccion,
    Id_Empleado_Produccion: req.body.Id_Empleado_Produccion,
    Id_Producto_Produccion: req.body.Id_Producto_Produccion,
    num_totalProduccion: req.body.num_totalProduccion,
    num_Defectuosos_Produccion: req.body.num_Defectuosos_Produccion

  };

  
  //Uso de la funcion insertar
  ProduccionModelo.insertProduccion(ProduccionData, function (error, data)
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
    let ProduccionData = 
    {
      Id_Produccion: req.body.Id_Produccion,
      Fecha_Produccion: req.body.Fecha_Produccion,
      Id_Empleado_Produccion: req.body.Id_Empleado_Produccion,
      Id_Producto_Produccion: req.body.Id_Producto_Produccion,
      num_totalProduccion: req.body.num_totalProduccion,
      num_Defectuosos_Produccion: req.body.num_Defectuosos_Produccion
    };

    ProduccionModelo.updateProduccion(ProduccionData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});
// informe
router.get("/date", function(req, res)
{
  let date = req.params.date;

  if(!isNaN(date))
  {
    ProduccionModelo.getInforme(date, function(error,data)
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
return router;
}
