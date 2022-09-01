//Pagina-Web_Gary-Goodsped
// 1 - Invocamos a Express/ Summon Express
const express = require('express');
const app = express();

// 2 - Seteamos urlencoded para capturar los datos del formulario
// 2 - Set urlencoded to capture the form data. 
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// 3 - Invocamos a dotenv / Call dotenv
const dotenv = require('dotenv');
dotenv.config({path: '.env/.env'});

// 4 - Seteamos el directorio public / Set "public" directory
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 5 - Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

// 6 - Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

// 7 - Var. de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    
}));

// 8 - Llamamos al módulo de conexión a la BD
const connection = require('./Database/db'); 


// 9 - Estableciendo las rutas
app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/navlist', (req, res)=>{
    res.render('navlist');
})

app.get('/califications', (req, res)=>{
    res.render('califications')
})

app.get('/homee', (req, res)=>{
    res.render('Homee')
})

// 11 - Autenticación
app.post('/auth', (req, res)=>{
    const user = req.body.usr;
    const pass = req.body.password;
    //let passwordHaash = await bcryptjs.hash(pass, 8);
        connection.query('SELECT * FROM USERS WHERE name_user = ?', [user], (error, results) =>{
            if(error){
                console.log("El error que devolvió SQL es: " + error);
                return;
            }

            if(pass != results[0].passwor){
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1200,
                    ruta: ''
                });
            }
            else{
                req.session.name = results[0].name_user;
                if(results[0].privilege == 'student'){
                    req.session.loggedin1 = true;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Login correcto!",
                        alertIcon: "succes",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });
                }
                if(results[0].privilege == 'teacher'){
                    req.session.loggedin2 = true;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Login correcto!",
                        alertIcon: "succes",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });
                }
                if(results[0].privilege == 'admin'){
                    req.session.loggedin3 = true;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Login correcto!",
                        alertIcon: "succes",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });
                }

            }
        })
});


// 12 - Auth pages
app.get('/', (req, res)=>{
    if(req.session.loggedin1){
        res.render('student_home', {
            login: true,
            name: req.session.name
        });
    }
    if(req.session.loggedin2){
        res.render('teacher_home', {
            login: true,
            name: req.session.name
        });
    }
    if(req.session.loggedin3){
        res.render('home', {
            login: true,
            name: req.session.name
        });
    }
})

app.listen(3309, (req, res)=>{
    console.log("");
    console.log("-------------------------------------------");
    console.log("SERVER RUNNING IN https://localhost:3309");
}) 


//npm i
//npm init