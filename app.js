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

app.get('/home', (req, res)=>{
    res.render('Home');
})

app.get('/profile', (req, res)=>{
    res.render('Profile');
})

// ---RUTAS ADMIN ---
app.get('/land', (req, res)=>{
    res.render('ADMIN_Landing');
})

app.get('/Admin%Students', (req, res)=>{
    res.render('ADMIN-Students');
})

app.get('/Admin%Add%Student', (req, res)=>{
    res.render('ADMIN-AddStudent');
})

app.get('/Admin%Edit%Student', (req, res)=>{
    res.render('ADMIN-EditStudent');
})

app.get('/Admin%Remove%Student', (req, res)=>{
    res.render('ADMIN-RemoveStudent');
})
app.get('/Admin%Teachers', (req, res)=>{
    res.render('ADMIN-Teachers');
})

// ---RUTAS TEACHERS


// ---RUTAS STUDENTS---
app.get('/califications', (req, res)=>{
    res.render('califications');
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
            
            if (results[0] === undefined){
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1200,
                    ruta: ''
                })
                return;
            }
            else{
                if (pass != results[0].passwor) {
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
                else {
                    req.session.name = results[0].name_user;
                    if (results[0].privilege == 'student') {
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
                    if (results[0].privilege == 'teacher') {
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
                    if (results[0].privilege == 'admin') {
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
        res.render('ADMIN_Landing', {
            login: true,
            name: req.session.name
        });
    }
})

// 13 - ADMIN | Students
app.post('/addStudent', (req, res)=>{
    const Sname = String(req.body.add_name);
    const dni = req.body.add_dni;
    const addres = String(req.body.add_addres);
    const gender = String(req.body.add_gender);
    const surname = String(req.body.add_surname);
    const birthday = String(req.body.add_date);
    const course = req.body.add_course;
    const divition = req.body.add_divition;
    const privilege = String("student");

    console.log('');
    console.log('--------------------------------');
    console.log("Sname: " + Sname);
    console.log("dni: " + dni);
    console.log("addres: " + addres);
    console.log("gender: " + gender);
    console.log("surname: " + surname);
    console.log("birthday: " + birthday);
    console.log("course: " + course);
    console.log("divition: " + divition);
    console.log('');
    console.log('--------------------------------');
    console.log('INSERT INTO students (name_s, surname, dni, birthday, address, gender, id_course, id_divi, user_id) VALUES(' + "'" + Sname + "', '" + surname + "', " + dni + ", '" + birthday + "', '" + addres + ", '" + gender + "', " + course + ", " + divition + ", " + dni + ');');
    console.log('--------------------------------');
    console.log('');

    const user_dni = dni;
    const name_usr = String(Sname);
    const surname_usr = String(surname);
    const dni_usr = String(dni);
    var usr = name_usr[0].toLowerCase() + surname_usr[0].toLowerCase() + dni_usr;
    connection.query("INSERT INTO USERS (user_id, name_user, passwor, privilege) VALUES(" + user_dni + ", '" + usr + "', " + dni + ", '" + privilege + "')", (error, results) =>{
        if(error){
            console.log("El error que devolvió SQL es: " + error);
            res.render('ADMIN-Students', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: '#AS-Add'
            })
            return;
        }
    })
    connection.query('INSERT INTO students (name_s, surname, dni, birthday, address, gender, id_course, id_divi, user_id) VALUES(' 
    + "'" + Sname + "', '" + surname + "', " + dni + ", '" + birthday + "', '" + addres + "', '" + gender + "', " + course + ", " + divition + ", " + dni + ');', (error, results) =>{
        if(error){ 
            console.log("El error que devolvió SQL es: " + error);
            res.render('ADMIN-Students', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: '#AS-Add'
            })
            connection.query('DELETE FROM STUDENTS WHERE user_id =', [dni]);
            connection.query('DELETE FROM USERS WHERE user_id =', [dni]);
            return;
        }
        else{
            console.log("Carga Exitosa");
            req.session.Sadded = true;
                res.render('ADMIN-Students', {
                    alert: true,
                    alertTitle: "Carga Exitosa",
                    alertMessage: "¡Se agregó el Alumno correctamente!",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: '#AS-Add'
                });
        }
    })
});

app.get('/', (req, res)=>{
    if(req.session.Sadded){
        res.render('ADMIN-Students', {
            added: true,
            name: req.session.name
        });
    }
})

app.listen(3309, (req, res)=>{
    console.log("");
    console.log("-------------------------------------------");
    console.log("SERVER RUNNING IN https://localhost:3309");
});


//npm i
//npm init