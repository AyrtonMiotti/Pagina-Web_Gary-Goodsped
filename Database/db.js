const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "gary_goodsped",
})

connection.connect((error)=>{
    if(error){
        console.log("El error de conexion es: " + error);
        return;
    }
    console.log("Conexion a la base de datos exitosa");
});
module.exports = connection;