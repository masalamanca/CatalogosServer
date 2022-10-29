const Connection = require('../conexion');

let ProduccionModelo = {};

ProduccionModelo.getproduccion = function (callback)
{
    if(Connection)
    {
        let sql = /*"SELECT `Id_Produccion`, `Fecha_Produccion`, `Id_Empleado_Produccion`, `Id_Producto_Produccion`, `num_totalProduccion`, `num_Defectuosos_Produccion` FROM `th_produccion` WHERE `Id_Produccion`";*/
        " SELECT "+
        " c.`Id_Produccion` AS 'ID', "+
        " c.`Fecha_Produccion` AS 'Fecha', "+
        " CONCAT (p.`Nom1_Encargado`,' ',"+
        " p.`Apell1_Encargado`) AS 'Empleado', "+
        " d.`Nombre_Producto` AS 'Produccion', "+
        " c.`num_totalProduccion` AS 'Total Produccion', "+
        " c.`num_Defectuosos_Produccion` AS Defectuosos "+
        " FROM `th_produccion` AS c"+
        " INNER JOIN `tb_encargados`AS p ON c.`Id_Empleado_Produccion`= p.`Id_Encargado`"+
        " INNER JOIN `tb_productos`AS d ON c.`Id_Producto_Produccion`= d.`Id_Producto` "+
        " ORDER BY`Id_Produccion`";

 

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
//Consulta ID
ProduccionModelo.getProduccionID = function(id, callback)
{
    if(Connection)
    {
    
        let sql =  " SELECT "+
                    " c.`Id_Produccion` AS 'ID', "+
                    " DATE_FORMAT(c.`Fecha_Produccion`, '%d/%m/%Y') AS 'Fecha', "+
                    " CONCAT (p.`Nom1_Encargado`,' ',"+
                    " p.`Apell1_Encargado`) AS 'Empleado', "+
                    " d.`Nombre_Producto` AS 'Produccion', "+
                    " c.`num_totalProduccion` AS 'Total Produccion', "+
                    " c.`num_Defectuosos_Produccion` AS Defectuosos "+
                    " FROM `th_produccion` AS c"+
                    " INNER JOIN `tb_encargados`AS p ON c.`Id_Empleado_Produccion`= p.`Id_Encargado`"+
                    " INNER JOIN `tb_productos`AS d ON c.`Id_Producto_Produccion`= d.`Id_Producto` " +
                        " WHERE Id_Produccion = "+
                        Connection.escape(id)+
                        ";";

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
ProduccionModelo.insertProduccion = function (ProduccionData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO th_produccion SET ?";

        Connection.query(sql, ProduccionData, function (error, res) 
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
ProduccionModelo.updateProduccion = function(ProduccionData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `th_produccion` SET Fecha_Produccion = "+ Connection.escape(ProduccionData.Fecha_Produccion) +
                                    ", Id_Empleado_Produccion = " + Connection.escape(ProduccionData.Id_Empleado_Produccion) +
                                    ", Id_Producto_Produccion = " + Connection.escape(ProduccionData.Id_Producto_Produccion) +
                                    ", num_totalProduccion = " + Connection.escape(ProduccionData.num_totalProduccion) +
                                    ", num_Defectuosos_Produccion = " + Connection.escape(ProduccionData.num_Defectuosos_Produccion) +
                                    " WHERE Id_Produccion = " + Connection.escape(ProduccionData.Id_Produccion) + ";";


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
/*ProduccionModelo.getInforme = function(date, callback)
{
    if(Connection)
    {
    
        let sql = " SELECT P.`Id_Produccion`, "+
                   "  DATE_FORMAT(c.`Fecha_Produccion`, '%d/%m/%Y') AS 'Fecha', "+
                   " CONCAT(pe.`Nom1_Encargado`,' ', pe.`Apell1_Encargado`)AS 'EMPLEADO',"+
                   " CONCAT(pr.`Nombre_Producto`,' - ', c.`Nombre_Catalogo`)AS 'Product',"+
                   " P.`num_totalProduccion`,"+
                   " P.`num_Defectuosos_Produccion`,"+
                   " p.`num_totalProduccion`-P.`num_Defectuosos_Produccion`AS 'Productos Buenos'"+
                   " FROM `th_produccion` AS P "+
                   " INNER JOIN `tb_encargados` AS pe ON P.`Id_Empleado_Produccion` = pe.`Id_Encargado`"+
                   " INNER JOIN `tb_productos` AS pr ON P.`Id_Producto_Produccion` = pr.`Id_Producto`"+
                   " INNER JOIN `ct_catalogo` AS c ON pr.`Tipo_producto` = c.`Id_Catalogo`"+
                   " WHERE P.`Fecha_Produccion`"+
                    Connection.escape(date)+ c.Fecha_Produccion

        Connection.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}*/
module.exports = ProduccionModelo;