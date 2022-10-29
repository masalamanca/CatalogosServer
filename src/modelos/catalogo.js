const Connection = require('../conexion');

let CatalogoModelo = {};

CatalogoModelo.getcatalogos = function (callback)
{
    if(Connection)
    {
        let sql = 
        " SELECT "+
        " C.`Id_Catalogo`, "+
        " C.`Nombre_Catalogo`, "+
        " N.`Nombre_Catalogo` AS 'Tipo_Catalogo' "+
        " FROM `ct_catalogo` AS C"+
        " INNER JOIN `ct_catalogo` AS N ON C. `Tipo_Catalogo` = N. `Id_Catalogo`"+
        " ORDER BY`Id_Catalogo`";
 
            /* `Id_Catalogo`, `Nombre_Catalogo`, `Tipo_Catalogo` FROM `ct_catalogo` WHERE `Id_Catalogo`";*/
    Connection.query(sql, function(error, rows)
    {
        if(error)
        {
            throw error;
        }
        else
        {
            //devuelve las fulas como un Json
            callback(null, rows);
            //convierte las filas Json a una cadena de texto para Angular
            //callback(null, JSON.stringify(rows));
        }
    });

    }
}

//--------------------------------------------------
//Consulta ID
CatalogoModelo.getCatalogosID = function(id, callback)
{
    if(Connection)
    {
    
        let sql = "SELECT `Id_Catalogo` AS 'ID',"+ 
                        " `Nombre_Catalogo`,"+ 
                        " `Tipo_Catalogo` "+ 
                        " FROM `ct_catalogo`" +
                        " WHERE Id_Catalogo = "+
                        Connection.escape(id)+
                        ";";

                        /*" SELECT "+
                        " C.`Id_Catalogo` AS 'ID', "+
                        " C.`Nombre_Catalogo`, "+
                        " N.`Nombre_Catalogo` AS 'Tipo_Catalogo' "+
                        " FROM `ct_catalogo` AS C"+
                        " INNER JOIN `ct_catalogo` AS N ON C.`Tipo_Catalogo` = N.`Id_Catalogo`"+
                        " WHERE Id_Catalogo = "+
                        Connection.escape(id)+
                        ";";*/
        Connection.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

//------------------------------------------------------------------------------
// Insertar catalogo
CatalogoModelo.insertCatalogo = function (CatalogoData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO ct_catalogo SET ?";

        Connection.query(sql, CatalogoData, function (error, res) 
        {
            if (error) 
            {
                throw error;

            }
            else 
            {
                callback(null, { "msg": "Registro insertado" });
            }
        });
    }
}

//-----------------------------------------------------------------------------
//Modificar Catalogo
CatalogoModelo.updateCatalogo = function(CatalogoData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `ct_catalogo` SET Nombre_Catalogo = "+ Connection.escape(CatalogoData.Nombre_Catalogo) +
                                    ", Tipo_Catalogo = " + Connection.escape(CatalogoData.Tipo_Catalogo) +
                                    " WHERE Id_Catalogo = " + Connection.escape(CatalogoData.Id_Catalogo) + ";";


        Connection.query(sql, function (error, result)
        {
  

            if(error)
            {
                throw error;
                
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }

        });
    }
}

module.exports = CatalogoModelo;