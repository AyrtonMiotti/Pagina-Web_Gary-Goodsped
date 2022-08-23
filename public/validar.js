var priv = "";

let login = [["N00bMater69@gmail.com","Elkpo", "Teacher"],
              ["Black Tom@gmail.com","R4s1st4", "Usr"],
              ["Simio No@gmail.com","Mata a simio", "Usr"],
              ["admin", "admin", "admin"],
              ["Satracks@gmail.com","GatoX1000", "Usr"]]


//Función que se fija si el usuario y contraseña son correctos
function validar(){
    var usuario = document.getElementById("usr").value;
    var contra = document.getElementById("password").value;
    for (let i = 0; i < login.length; i++){
        if (usuario==login[i][0] && contra==login[i][1]){
            priv = login[i][3];
            return true;
        }
    }
    return false;
}

// Funciones que cambian el color del Label
function ColorChange(){
    document.getElementById("error-label").style.color = "red";
}

function ColorRemove(){
    document.getElementById("error-label").style.color = "transparent";
}

//Función que limpia los inputs
function Clear(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

//const welc = document.getElementById("lbl_usr").innerHTML = "cacho";

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


const recordarme = document.getElementById('remember');
recordarme.addEventListener('change', function() {
    if(this.checked) {
        guardar_usr();
        alert("Awantanamera");
        alert("Wuajira wan");
        alert("Ta na meraaa");
    }
});

function guardar_usr(){
    var g_usuario = document.getElementById("usr").value;
    var g_contra = document.getElementById("password").value;
    alert(g_usuario);
    alert(g_contra);

}