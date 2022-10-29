const express = require("express");
const router = express.Router();

let InformeModelo = require("../modelos/informe");

module.exports = function () 
{

router.get("/date", function(req, res)
{
  let date = req.params.date;

  if(!isNaN(date))
  {
    InformeModelo.getInforme(date, function(error,data)
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