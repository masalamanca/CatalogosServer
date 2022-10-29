const express = require("express");
const router = express.Router();

let MateProduModelo = require("../modelos/materiales_productos");

module.exports = function () {
  router.get("/", function (req, res) {
    MateProduModelo.getmateprodu(function (error, data) {
      res.status(200).json(data);
    });
  });

  return router;
};
//-----------------------------------------------------------------------
//Consulta por ID
router.get("/:id", function(req, res)
{
  let id = req.params.id;

  if(!isNaN(id))
  {
      MateProduModelo.getMateProduID(id, function(error,data)
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

  let MateProduData = 
  {
    Id_MaterialProducto: null,
    IProducto_MaterialProducto: req.body.IProducto_MaterialProducto,
    IMaterial_MaterialProducto: req.body.IMaterial_MaterialProducto,
    cantidad_MaterialProducto: req.body.cantidad_MaterialProducto
  };
  
  //Uso de la funcion insertar
  MateProduModelo.insertMateProdu(MateProduData, function (error, data)
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
    let MateProduData = 
    {
      Id_MaterialProducto: req.body.Id_MaterialProducto,
      IProducto_MaterialProducto: req.body.IProducto_MaterialProducto,
      IMaterial_MaterialProducto: req.body.IMaterial_MaterialProducto,
      cantidad_MaterialProducto: req.body.cantidad_MaterialProducto
    };

    MateProduModelo.updateMateProdu(MateProduData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;
