const Connection = require('../conexion');

let ProductosModelo = {};

ProductosModelo.getproductos = function (callback)
{
    if(Connection)
    {
        let sql = " SELECT "+
                " c.`Id_Producto` AS 'ID', "+
                " c.`Nombre_Producto` AS 'Producto', "+
                " c.`Peso_Producto`, "+
                " c.`Dimensiones_Producto` AS 'Dimensiones', "+
                " p.`Nombre_Catalogo` AS 'Producto', "+
                " d.`Nombre_Catalogo` AS 'Linea Producto' "+
                " FROM `tb_productos` AS c"+
                " INNER JOIN `ct_catalogo`AS p ON c.`Tipo_producto`= p.`Id_Catalogo`"+
                " INNER JOIN `ct_catalogo`AS d ON c.`Estilo_Producto`= d.`Id_Catalogo`";

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
ProductosModelo.getProductosID = function(id, callback)
{
    if(Connection)
    {
    
        let sql =  " SELECT "+
                    " c.`Id_Producto` AS 'ID', "+
                    " c.`Nombre_Producto` AS 'Producto', "+
                    " c.`Peso_Producto`, "+
                    " c.`Dimensiones_Producto` AS 'Dimensiones', "+
                    " p.`Nombre_Catalogo` AS 'Producto', "+
                    " d.`Nombre_Catalogo` AS 'Linea Producto' "+
                    " FROM `tb_productos` AS c"+
                    " INNER JOIN `ct_catalogo`AS p ON c.`Tipo_producto`= p.`Id_Catalogo`"+
                    " INNER JOIN `ct_catalogo`AS d ON c.`Estilo_Producto`= d.`Id_Catalogo`"+
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
ProductosModelo.insertProductos = function (ProductosData, callback) 
{
    if (Connection) 
    {
        let sql = " INSERT INTO tb_productos SET ?";

        Connection.query(sql, ProductosData, function (error, res) 
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
ProductosModelo.updateProductos = function(ProductosData,callback)
{
    if(Connection)
    {
        let sql = "UPDATE `tb_productos` SET Nombre_Producto = "+ Connection.escape(ProductosData.Nombre_Producto) +
                                    ", Peso_Producto = " + Connection.escape(ProductosData.Peso_Producto) +
                                    ", Dimensiones_Producto = " + Connection.escape(ProductosData.Dimensiones_Producto) +
                                    ", Tipo_producto = " + Connection.escape(ProductosData.Tipo_producto) +
                                    ", Estilo_Producto = " + Connection.escape(ProductosData.Estilo_Producto) +
                                    " WHERE Id_Producto = " + Connection.escape(ProductosData.Id_Producto) + ";";

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

ProductosModelo.getByCatalog = (catalogID, cb) => {
    if(Connection)
    {
        
        let sql =  `SELECT product.Id_Producto AS 'ID', product.Nombre_Producto AS 'Producto',
        product.Peso_Producto,
      	product.Dimensiones_Producto AS 'Dimensiones',
        catalog.Id_Catalogo
        FROM tb_productos AS product 
        INNER JOIN ct_catalogo AS catalog ON product.Tipo_producto = catalog.Id_Catalogo 
        WHERE product.Tipo_producto = ${catalogID};
        `
        Connection.query(sql, function(error, rows){
            if(error){
                cb(error)
            }else{
                cb(null, rows)
            }
        });
    }
}

module.exports = ProductosModelo;