//function welcome(){
//  document.getElementById("#lbl").style.display = "flex";
//}

window.onload = function(){
  setTimeout(function(){
    //welcome();
  }, 2000)
  $(".animation1").delay(2000).fadeOut();
  $("body").removeClass(".animation1");
  
}



const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("#sidemenu");
btn.addEventListener("click", e =>{
  menu.classList.toggle("menu-expanded");
  menu.classList.toggle("menu-collapsed");
  document.querySelector("body").classList.toggle("body-expanded");
});