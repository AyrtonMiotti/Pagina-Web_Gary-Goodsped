window.onload = function(){
  setTimeout(function(){
      //welcome();
  }, 2000)
  $(".animation1").delay(2000).fadeOut();
  $("body").removeClass(".animation1"); //Fijarse bien
}

const califi = document.querySelector('#Btn1');
const matter = document.querySelector('#Btn2');

matter.addEventListener('click', e =>{
  $("#ShSec1").delay(100).fadeOut();
})

const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("#sidemenu");
btn.addEventListener("click", e =>{
  menu.classList.toggle("menu-expanded");
  menu.classList.toggle("menu-collapsed");
  document.querySelector("body").classList.toggle("body-expanded");
});



