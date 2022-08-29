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




/*
transition-properity
transition-duration
transition-delay:
*/


/*
 MOBILE 
@media (max-width: 768px) {
  body {
    padding-top: 70px;
  }

  .header {
    height: 60px;
  }

  .logo {
    font-size: 25px;
    padding: 0 20px;
    line-height: 60px;
  }

  .nav-menu {
    flex-direction: column;
    align-items: center;
    margin: 0;
    background-color: #2c3e50;
    position: fixed;
    top: 60px;
    width: 100%;
    padding: 20px 0;

    height: calc(100% - 60px);
    overflow-y: auto;

    left: 100%;
    transition: left 0.3s;
  }

  .nav-menu-item {
    line-height: 70px;
  }

  .nav-menu-link:hover,
  .nav-menu-link_active {
    background: none;
    color: #83c5f7;
  }

  .nav-toggle {
    display: block;
  }

  .nav-menu_visible {
    left: 0;
  }

  .nav-toggle:focus:not(:focus-visible) {
    outline: none;
  }
}
FIN NAV RESPONSIVE
*/