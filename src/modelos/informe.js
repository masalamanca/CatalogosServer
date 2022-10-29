const Connection = require('../conexion');

let InformeModelo = {};

InformeModelo.getInforme = function(date, callback)
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
}