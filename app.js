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
app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/student_home', (req, res)=>{
    res.render('student_home');
})

app.get('/teacher_home', (req, res)=>{
    res.render('teacher_home');
})

app.get('/navlist', (req, res)=>{
    res.render('navlist');
})

app.get('/Calificaciones', (req, res)=>{
    res.render('califications')
})

// 10 - Registro de Usuarios (No lo vamos a usar)
app.post('/register', async (req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO USERS SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log('Hubo un error al hacer la consulta.');
            console.log('ERROR: ' + error);
        }
        console.log('Alta exitosa');
    })
})

// el '/register' y el '/auth' son lo que se pone en <form action= '*Acá*' method = "Post"
// las variables req.body.blablabla son las que cuando declaramos los inputs ponemos: name= ''

// 11 - Autenticación


app.listen(3307, (req, res)=>{
    console.log("");
    console.log("-------------------------------------------");
    console.log("SERVER RUNNING IN https://localhost:3307");
}) 


//npm i
//npm init