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
    return res.render('login');
})

app.get('/home', (req, res)=>{
    return res.render('Home');
})

app.get('/profile', (req, res)=>{
    res.render('Profile', {
        login: true,
        name: req.session.name});
})

// ---RUTAS ADMIN ---
app.get('/land', (req, res)=>{
    return res.render('ADMIN_Landing');
})

app.get('/Admin%Students', (req, res)=>{
    return res.render('ADMIN-Students');
})

app.get('/Admin%Add%Student', (req, res)=>{
    return res.render('ADMIN-AddStudent');
})

app.get('/Admin%Edit%Student', (req, res)=>{
    return res.render('ADMIN-EditStudent');
})

app.get('/Admin%Remove%Student', (req, res)=>{
    return res.render('ADMIN-RemoveStudent');
})
app.get('/Admin%Teachers', (req, res)=>{
    return res.render('ADMIN-Teachers');
})

// ---RUTAS TEACHERS


// ---RUTAS STUDENTS---
app.get('/califications', (req, res)=>{
    return res.render('califications');
})

app.get('/Students', (req, res)=>{
    return res.render('STUD-Home');
})

app.get('/Students%Califications', (req, res)=>{
    return res.render('STUD-Califications', {
        login: true,
        name: req.session.name});
})

app.get('/Students%Matters', (req, res)=>{
    return res.render('STUD-Matters', {
        login: true,
        name: req.session.name});
})

app.get('/ppp', (req, res)=>{
    return res.render('ppp');
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
                return res.render('login', {
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
                    return res.render('login', {
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
                        return res.render('login', {
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
                        return res.render('login', {
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
                        return res.render('login', {
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
        return res.render('STUD-Home', {
            login: true,
            name: req.session.name,
            verify: true
        });
    }
    if(req.session.loggedin2){
        return res.render('teacher_home', {
            login: true,
            name: req.session.name
        });
    }
    if(req.session.loggedin3){
        return res.render('ADMIN_Landing', {
            login: true,
            name: req.session.name
        });
    }
})

// 13.0.1 IMAGES
const path = require('path');
const multer = require('multer');
app.use('/public/Assets/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, 'uploads')
    },

    filename:(req, file, callback) =>{
        callback(null, file.originalname)
    }
});

const upload = multer({storage});

app.post('/file', upload.single('file'), (req, res, next)=>{
    const file = req.params
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
            return res.render('ADMIN-Students', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: '#AS-Add'
            })
        }
    })
    if(gender == "M"){
        const imgProfile = 'resources/Assets/Photo-MS.png';
    }

    else{
        if(gender == "F"){
            const imgProfile = 'resources/Assets/Photo-WS.png';
        }
    }
    connection.query('INSERT INTO students (name_s, surname, dni, birthday, address, gender, id_course, id_divi, user_id) VALUES(' 
    + "'" + Sname + "', '" + surname + "', " + dni + ", '" + birthday + "', '" + addres + "', '" + gender + "', " + course + ", " + divition + ", " + dni + ');', (error, results) =>{
        if(error){ 
            console.log("El error que devolvió SQL es: " + error);
            connection.query('DELETE FROM STUDENTS WHERE user_id =', [dni]);
            connection.query('DELETE FROM USERS WHERE user_id =', [dni]);
            return res.render('ADMIN-Students', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: '#AS-Add'
            })
        }
        else{
            console.log("Carga Exitosa");
            req.session.Sadded = true;
                return res.render('ADMIN-Students', {
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
        return res.render('ADMIN-Students', {
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