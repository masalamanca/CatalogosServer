const Connection = require('../conexion');

let ContactosModelo = {};

ContactosModelo.getcontactos = function (callback)
{
    if(Connection)
    {
        let sql = /*"SELECT `Id_Contactos`, `Dato_Contacto`, `Encargado_Contacto`, `Tipo_Contacto` FROM `am_contactos` WHERE `Id_Contactos`";*/
        " SELECT "+
        " c.`Id_Contactos` AS 'ID',"+
        " c.`Dato_Contacto` AS 'Dato',"+
        " CONCAT (p.`Nom1_Encargado`,' ',"+
                " p.`Apell1_Encargado`) AS 'Encargado', "+
        " d.`Nombre_Catalogo` AS 'Tipo de Contacto'"+
        " FROM `am_contactos` AS c"+
        " INNER JOIN `tb_encargados`AS p ON c.`Encargado_Contacto`= p.`Id_Encargado` "+
        " INNER JOIN `ct_catalogo`AS d ON c.`Tipo_Contacto`= d.`Id_Catalogo`" ;
 

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
ContactosModelo.getContactoID = function(id, callback)
{
    if(Connection)
    {
        let sql =  " SELECT "+
                    " c.`Id_Contactos` AS 'ID',"+
                    " c.`Dato_Contacto` AS 'Dato',"+
                    " CONCAT (p.`Nom1_Encargado`,' ',"+
                            " p.`Apell1_Encargado`) AS 'Encargado', "+
                    " d.`Nombre_Catalogo` AS 'Tipo de Contacto'"+
                    " FROM `am_contactos` AS c"+
                    " INNER JOIN `tb_encargados`AS p ON c.`Encargado_Contacto`= p.`Id_Encargado` "+
                    " INNER JOIN `ct_catalogo`AS d ON c.`Tipo_Contacto`= d.`Id_Catalogo`" +
                        " WHERE Id_Contactos = "+
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
ContactosModelo.insertContacto = function (ContactoData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO am_contactos SET ?";

        Connection.query(sql, ContactoData, function (error, res) 
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
ContactosModelo.updateContacto = function(ContactoData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `am_contactos` SET Encargado_Contacto = "+ Connection.escape(ContactoData.Encargado_Contacto) +
                                    ", Dato_Contacto = " + Connection.escape(ContactoData.Dato_Contacto) +
                                    ", Tipo_Contacto = " + Connection.escape(ContactoData.Tipo_Contacto) +
                                    " WHERE Id_Contactos = " + Connection.escape(ContactoData.Id_Contactos) + ";";

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

module.exports = ContactosModelo;