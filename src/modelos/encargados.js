const Connection = require('../conexion');

let EncargadoModelo = {};

EncargadoModelo.getencargados = function (callback)
{
    if(Connection)
    {
        let sql = /*"SELECT `Id_Encargado`, `Nom1_Encargado`, `Nom2_Encargado`, `Apell1_Encargado`, `Apell2_Encargado`, `Sexo_Encargado`, `FechaNacimiento_Encargado`, `Tip_Doc_Encargado`, `num_Doc_Encargado`, `Rol_Encargado` FROM `tb_encargados` WHERE `Id_Encargado`"; */
                "SELECT "+
                " p.`Id_Encargado` AS 'ID', "+
                " CONCAT (p.`Nom1_Encargado`,' ', "+
                " p.`Apell1_Encargado`) AS 'Encargado', "+
                " p.`Sexo_Encargado` AS 'Sexo', "+
                " p.`FechaNacimiento_Encargado` AS 'Fecha de Nacimiento', "+
                " c. `Nombre_Catalogo` AS 'Tipó Documento', "+
                " p.`num_Doc_Encargado` AS 'Numero Documento', "+
                " d.`Nombre_Catalogo` AS 'Cargo' "+
                   
                   " FROM `tb_encargados` AS p "+
                       "  INNER JOIN `ct_catalogo`AS c ON p.`Tip_Doc_Encargado`= c.`Id_Catalogo` "+
                        " INNER JOIN `ct_catalogo`AS d ON p.`Rol_Encargado`= d.`Id_Catalogo` "+
                         " ORDER BY `Id_Encargado`";

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
EncargadoModelo.getEncargadosID = function(id, callback)
{
    if(Connection)
    {
    
        let sql =    "SELECT "+
                    " p.`Id_Encargado` AS 'ID', "+
                    " CONCAT (p.`Nom1_Encargado`,' ', "+
                    " p.`Apell1_Encargado`) AS 'Encargado', "+
                    " p.`Sexo_Encargado` AS 'Sexo', "+
                    " p.`FechaNacimiento_Encargado` AS 'Fecha de Nacimiento', "+
                    " c. `Nombre_Catalogo` AS 'Tipó Documento', "+
                    " p.`num_Doc_Encargado` AS 'Numero Documento', "+
                    " d.`Nombre_Catalogo` AS 'Cargo' "+
                    " FROM `tb_encargados` AS p "+
                    "  INNER JOIN `ct_catalogo`AS c ON p.`Tip_Doc_Encargado`= c.`Id_Catalogo` "+
                    " INNER JOIN `ct_catalogo`AS d ON p.`Rol_Encargado`= d.`Id_Catalogo` "+
                    " WHERE Id_Encargado = "+
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
EncargadoModelo.insertEncargado = function (EncargadoData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO tb_encargados SET ?";

        Connection.query(sql, EncargadoData, function (error, res) 
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
EncargadoModelo.updateEncargado = function(EncargadoData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `tb_encargados` SET Nom1_Encargado = "+ Connection.escape(EncargadoData.Nom1_Encargado) +
                                    ", Nom2_Encargado = " + Connection.escape(EncargadoData.Nom2_Encargado) +
                                    ", Apell1_Encargado = " + Connection.escape(EncargadoData.Apell1_Encargado) +
                                    ", Apell2_Encargado = " + Connection.escape(EncargadoData.Apell2_Encargado) +
                                    ", Sexo_Encargado = " + Connection.escape(EncargadoData.Sexo_Encargado) +
                                    ", FechaNacimiento_Encargado = " + Connection.escape(EncargadoData.FechaNacimiento_Encargado) +
                                    ", Tip_Doc_Encargado = " + Connection.escape(EncargadoData.Tip_Doc_Encargado) +
                                    ", num_Doc_Encargado = " + Connection.escape(EncargadoData.num_Doc_Encargado) +
                                    ", Rol_Encargado = " + Connection.escape(EncargadoData.Rol_Encargado) +
                                    " WHERE Id_Encargado = " + Connection.escape(EncargadoData.Id_Encargado) + ";";

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
module.exports = EncargadoModelo;