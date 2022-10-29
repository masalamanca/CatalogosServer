const Connection = require('../conexion');

let MateProduModelo = {};

MateProduModelo.getmateprodu = function (callback)
{
    if(Connection)
    {
        let sql = /*"SELECT `Id_MaterialProducto`, `IProducto_MaterialProducto`, `IMaterial_MaterialProducto`, `cantidad_MaterialProducto` FROM `tp_materiales_productos` WHERE `Id_MaterialProducto`";*/
        "SELECT "+
        " c.`Id_MaterialProducto` AS 'ID', "+
        " p.`Nombre_Producto` AS 'Producto', "+
        " d.`Nombre_Material` AS 'Material', "+
        " c.`cantidad_MaterialProducto` AS 'Cantidad de Material'"+
        " FROM `tp_materiales_productos` AS c"+
        " INNER JOIN `tb_productos`AS p ON c.`IProducto_MaterialProducto`= p.`Id_Producto` "+
        " INNER JOIN `tb_materiales`AS d ON c.`IMaterial_MaterialProducto`= d.`Id_Material`";
        " WHERE `Id_MaterialProducto`"

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
MateProduModelo.getMateProduID = function(id, callback)
{
    if(Connection)
    {
    
        let sql =  "SELECT "+
                    " c.`Id_MaterialProducto` AS 'ID', "+
                    " p.`Nombre_Producto` AS 'Producto', "+
                    " d.`Nombre_Material` AS 'Material', "+
                    " c.`cantidad_MaterialProducto` AS 'Cantidad de Material'"+
                    " FROM `tp_materiales_productos` AS c"+
                    " INNER JOIN `tb_productos`AS p ON c.`IProducto_MaterialProducto`= p.`Id_Producto` "+
                    " INNER JOIN `tb_materiales`AS d ON c.`IMaterial_MaterialProducto`= d.`Id_Material`"+
                    " WHERE Id_MaterialProducto = "+
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
MateProduModelo.insertMateProdu = function (MateProduData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO tp_materiales_productos SET ?";

        Connection.query(sql, MateProduData, function (error, res) 
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
MateProduModelo.updateMateProdu = function(MateProduData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `tp_materiales_productos` SET IProducto_MaterialProducto = "+ Connection.escape(MateProduData.IProducto_MaterialProducto) +
                        ", IMaterial_MaterialProducto = "+ Connection.escape(MateProduData.IMaterial_MaterialProducto) +
                        ", cantidad_MaterialProducto = "+ Connection.escape(MateProduData.cantidad_MaterialProducto) +
                        " WHERE Id_MaterialProducto = "+Connection.escape(MateProduData.Id_MaterialProducto) + ";";

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
module.exports = MateProduModelo;