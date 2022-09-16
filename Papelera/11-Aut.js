//Usuario contraseña 

const name = String('Ayrton');
const surname = String('miotti');
const dni = 45095310

var usr = name[0].toLowerCase() + surname[0].toLowerCase() + String(dni);
console.log(usr)

app.post('/addTeacher', (req, res)=>{
    const Sname = String(req.body.add_name);
    const dni = req.body.add_dni;
    const addres = String(req.body.add_addres);
    const gender = String(req.body.add_gender);
    const surname = String(req.body.add_surname);
    const birthday = String(req.body.add_date);
    const course = req.body.add_course;
    const divition = req.body.add_divition;
    const descrip = req.body.Add-descr;
    const privilege = String("Teacher");


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
    console.log('INSERT INTO Teachers (name_s, surname, dni, birthday, address, gender, id_course, id_divi, user_id) VALUES(' + "'" + Sname + "', '" + surname + "', " + dni + ", '" + birthday + "', '" + addres + ", '" + gender + "', " + course + ", " + divition + ", " + dni + ');');
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
            return res.render('ADMIN-Teachers', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: ''
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
    connection.query('INSERT INTO Teachers (name_t, surname, dni, birthday, address, gender, descrip, user_id) VALUES(' 
    + "'" + Sname + "', '" + surname + "', " + dni + ", '" + birthday + "', '" + addres + "', '" + gender + "', " + course + ", " + divition + ", " + dni + ');', (error, results) =>{
        if(error){ 
            console.log("El error que devolvió SQL es: " + error);
            connection.query('DELETE FROM TeacherS WHERE user_id =', [dni]);
            connection.query('DELETE FROM USERS WHERE user_id =', [dni]);
            return res.render('ADMIN-Teachers', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "El DNI ya se encuentra registrado en el sistema",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: ''
            })
        }
        else{
            console.log("Carga Exitosa");
            req.session.Sadded = true;
            return res.render('ADMIN-AddTeacher', {
                alert: true,
                alertTitle: "Carga Exitosa",
                alertMessage: "¡Se agregó el Profesor correctamente!",
                alertIcon: "succes",
                showConfirmButton: false,
                timer: 1500,
                ruta: 'Admin%Add%Teacher'
            });
        }
    })
});