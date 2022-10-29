const express = require("express");
const router = express.Router();

let CatalogoModelo = require("../modelos/catalogo");

module.exports = function () 
{

  router.get("/", function (req, res) 
  {
    CatalogoModelo.getcatalogos(function (error, data) 
    {
      res.status(200).json(data);
    });
  });

//----------------------------------------------------------------

//Consulta por ID
router.get("/:id", function(req, res)
{
  let id = req.params.id;

  if(!isNaN(id))
  {
      CatalogoModelo.getCatalogosID(id, function(error,data)
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

  let CatalogoData = 
  {
    Id_Catalogo: null,
    Nombre_Catalogo: req.body.Nombre_Catalogo,
    Tipo_Catalogo: req.body.Tipo_Catalogo,
  };
  
  //Uso de la funcion insertar
  CatalogoModelo.insertCatalogo(CatalogoData, function (error, data)
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
    let CatalogoData = 
    {
        Id_Catalogo: req.body.Id_Catalogo,
        Nombre_Catalogo: req.body.Nombre_Catalogo,
        Tipo_Catalogo: req.body.Tipo_Catalogo,
    };

    CatalogoModelo.updateCatalogo(CatalogoData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;
}
