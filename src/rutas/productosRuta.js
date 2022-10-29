const express = require("express");
const router = express.Router();

let ProductosModelo = require("../modelos/productos");

module.exports = function () {
  router.get("/", function (req, res) {
    ProductosModelo.getproductos(function (error, data) {
      res.status(200).json(data);
    });
  });

  return router;
};
//Consulta por ID
router.get("/:id", function(req, res)
{
  const id = req.params.id;

  if(!isNaN(id))
  {
    ProductosModelo.getProductosID(id, function(error,data)
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

router.get('/byCatalog/:id', (req, res) => {
  const catalogID = req.params.id

  ProductosModelo.getByCatalog(catalogID, (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).json(data)
  })
})

//----------------------------------------------------------------


//Metodo Insertar
router.post("/", function (req, res) 
{

  let ProductosData = 
  {
    Id_Producto: null,
    Nombre_Producto: req.body.Nombre_Producto,
    Peso_Producto: req.body.Peso_Producto,
    Dimensiones_Producto: req.body.Dimensiones_Producto,
    Tipo_producto: req.body.Tipo_producto,
    Estilo_Producto: req.body.Estilo_Producto

  };
  
  //Uso de la funcion insertar
  ProductosModelo.insertProductos(ProductosData, function (error, data)
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
    let ProductosData = 
    {
      Id_Producto: req.body.Id_Producto,
      Nombre_Producto: req.body.Nombre_Producto,
      Peso_Producto: req.body.Peso_Producto,
      Dimensiones_Producto: req.body.Dimensiones_Producto,
      Tipo_producto: req.body.Tipo_producto,
      Estilo_Producto: req.body.Estilo_Producto
    };

    ProductosModelo.updateProductos(ProductosData, function(error,data)
    {

        if(data && data){
          res.status(200).json(data);
        }else{
          res.status(500).send({error: "Actualizacion fallida"});
        }
  });
});

return router;

