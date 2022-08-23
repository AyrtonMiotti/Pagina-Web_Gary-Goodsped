// Show or Hide Password
const iconeye = document.querySelector(".eye");


iconeye.addEventListener("click", function(){
    const icono = this.querySelector("i");
    if(this.nextElementSibling.type === "password"){
        this.nextElementSibling.type = "text";
        icono.classList.add("fa-eye");
        icono.classList.remove("fa-eye-slash");
    }
    else{
        this.nextElementSibling.type = "password";
        icono.classList.remove("fa-eye");
        icono.classList.add("fa-eye-slash");
    }
})