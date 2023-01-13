const mysql = require ('mysql');
const express = require ('express');
const bodyparser = require('body-parser');
const path = require('path');
var multer = require('multer');
var fs = require ('fs');

//CREAMOS LA INSTANCIA EXPRESS
var app = express();
var upload = multer();

// PARA LEER JSON FACILITA LA VIDA CON JSON
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(upload.array()); 

// CONEXIÓN CON LA BASE DE DATOS
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'andel',
    multipleStatements: true
    
});

function readImageFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const buf = new Buffer.from(bitmap);
  return buf;
}

// ESTO ES PARA SI HAY UN ERROR EN LA CONEXIÓN CON LA BASE DE DATOS
// QUE SAQUE UN MENSAJE
mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Conexion bbdd correcta...');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

//PUERTO DE ESTA APLICACIÓN
    const port = process.env.PORT || 8181;

// CONECTAR, CONFIGURAR EL PUERTO DEL SERVIDOR.
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/ejemplo.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.get('/insertar',function(req,res){
    res.sendFile(path.join(__dirname+'/insertar.html'));
    
    //__dirname : It will resolve to your project folder.
  });

  app.post('/anadirpassword', function(req,res){
    
   //constante de la imagen
   const inputfile = "C://Users//briof//Pictures//github.jpg";
   var photo = readImageFile(inputfile); 
   console.log (photo);
    // guardo el valor que me llega del formulario
    var la_password = req.body.password;
    console.log (req.body.password);
    // me creo una cadena que tiene el sql que voy a lanzar a la bbdd
    //var sql = `INSERT PASSWORDS (password, imagen) values ( '${la_password}', ${photo})`;
    var sql = "INSERT INTO `PASSWORDS` SET ?",
    values = {
      password: la_password,
      imagen: photo
    };
    console.log (sql);

    //lanzo la query
    mysqlConnection.query(sql, values, (err) => {
      if (!err) {
        console.log ("INSERTADA LA NUEVA CONTRASEÑA");
      }
      else {
        console.log ("ERROR AL INSERTAR CONTRASEÑA");
      }
    })  
    res.redirect('/');
  });

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/passwords' , (req, res) => {
    mysqlConnection.query('SELECT * FROM passwords', (err, rows, fields) => {
    if (!err) {
        res.send(rows);
    }
    else {
    console.log(err);
    console.log("pos no funciona");
    }
    })
    } );