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



const recordarme = document.getElementById('remember');
recordarme.addEventListener('change', function() {
    if(this.checked) {
        guardar_usr();
    }
});

function guardar_usr(){
    var g_usuario = document.getElementById("usr").value;
    var g_contra = document.getElementById("password").value;
    alert(g_usuario);
    alert(g_contra);

}