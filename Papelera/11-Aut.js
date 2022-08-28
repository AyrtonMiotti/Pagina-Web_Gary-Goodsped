// 11 - Autenticación
app.post('/auth', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    console.log("Niaah");
    if(user && pass){
        console.log("Niaah1");
        connection.query('SELECT * FROM USERS WHERE user = ?', [user], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }
            else{
                res.session.name = results[0].name;
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡Login correcto!",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'login',
                });
            }
        })
    }
    console.log("Niaah2");
});




// 11 - Autenticación
app.post('/auth', (req, res)=>{
    const user = req.body.usr;
    const pass = req.body.password;
    //let passwordHaash = await bcryptjs.hash(pass, 8);
    console.log(user,pass);
        connection.query('SELECT * FROM USERS WHERE name_user = ?', [user, pass], (error, results) =>{
            console.log(results);
            if(error){
                console.log("El error que devolvió SQL es: " + error);
                return;
            }
            console.log(results[0].pass)
            if(pass, results[0].pass){
                console.log("UyP Incorrectos");
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }
            else{
                // res.session.name = results[0].name; Para obtener un valor de la BD
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡Login correcto!",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'login'
                });
            }
        })
});








//Función Que verifica el Usr y el Pass cuando se hace click en el botón.
const btn_login = document.querySelector(".btn-login")
btn_login.addEventListener("click", function(){
    var valida = validar();
    if (valida === true){
        window.location.href = "teacher_home.html";
        
        alert("UWU");
        alert("A" + priv);
        if (login[3] === "Usr"){
            alert("Estudiante");
            window.location.href = "student_home.html";    
        }

        if (login[3] === "admin"){
            alert("Admin");
            window.location.href = "admin_home.html";
        }

        if (login[3] === "Teacher"){
            alert("Teacher");
            window.location.href = "teacher_home.html";
        }
        
        //window.location.href = "G:\FAT Formación Ambiente de Trabajo\Pagina web Hermes\Next_Home\index.html";
    }
    if (valida === false){
        ColorChange();
        setInterval(function(){
            ColorRemove()}, 2000);
        Clear();
    }
})
