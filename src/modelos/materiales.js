const Connection = require('../conexion');

let MaterialModelo = {};

MaterialModelo.getmateriales = function (callback)
{
    if(Connection)
    {
        let sql = /*"SELECT `Id_Material`, `Nombre_Material`, `Proveedor_Material`, `tel_Proveedor_Material`, `Uso_Material`, `Tipo_Material` FROM `tb_materiales` WHERE `Id_Material`";*/
        " SELECT "+
        " c.`Id_Material` AS 'ID', "+
        " c.`Nombre_Material` AS 'Material', "+
        " c.`Proveedor_Material` AS 'Proveedor', "+
        " c.`tel_Proveedor_Material` AS 'Telefono Proveedor', "+
        " p.`Nombre_Catalogo` AS 'Uso Material', "+
        " d.`Nombre_Catalogo` AS 'Tipo Material' "+
        " FROM `tb_materiales` AS c"+
        " INNER JOIN `ct_catalogo`AS p ON c.`Uso_Material`= p.`Id_Catalogo`"+
        " INNER JOIN `ct_catalogo`AS d ON c.`Tipo_Material`= d.`Id_Catalogo`";

    Connection.query(sql, function(error, rows)
    {
        if(error)
        {
            throw error;
        }
        else
        {
            //devuelve las filas como un Json
            callback(null, rows);
            //convierte las filas Json a una cadena de texto para Angular
            //callback(null, JSON.stringify(rows));
        }
    });

    }
}
//Consulta ID
MaterialModelo.getMaterialesID = function(id, callback)
{
    if(Connection)
    {
        
        let sql =     " SELECT "+
                    " c.`Id_Material` AS 'ID', "+
                    " c.`Nombre_Material` AS 'Material', "+
                    " c.`Proveedor_Material` AS 'Proveedor', "+
                    " c.`tel_Proveedor_Material` AS 'Telefono Proveedor', "+
                    " p.`Nombre_Catalogo` AS 'Uso Material', "+
                    " d.`Nombre_Catalogo` AS 'Tipo Material' "+
                    " FROM `tb_materiales` AS c"+
                    " INNER JOIN `ct_catalogo`AS p ON c.`Uso_Material`= p.`Id_Catalogo`"+
                    " INNER JOIN `ct_catalogo`AS d ON c.`Tipo_Material`= d.`Id_Catalogo`"+
                    " WHERE Id_Material = "+
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
MaterialModelo.insertMateriales = function (MaterialData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO tb_materiales SET ?";

        Connection.query(sql, MaterialData, function (error, res) 
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
MaterialModelo.updateMateriales = function(MaterialData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `tb_materiales` SET Nombre_Material = "+ Connection.escape(MaterialData.Nombre_Material) +
                                    ", Proveedor_Material = " + Connection.escape(MaterialData.Proveedor_Material) +
                                    ", tel_Proveedor_Material = " + Connection.escape(MaterialData.tel_Proveedor_Material) +
                                    ", Uso_Material = " + Connection.escape(MaterialData.Uso_Material) +
                                    ", Tipo_Material = " + Connection.escape(MaterialData.Tipo_Material) +
                                    " WHERE Id_Material = " + Connection.escape(MaterialData.Id_Material) + ";";


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

module.exports = MaterialModelo;