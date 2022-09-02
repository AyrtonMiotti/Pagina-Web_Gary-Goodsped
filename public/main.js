window.onload = function(){
  setTimeout(function(){
      //welcome();
  }, 2000)
  $(".animation1").delay(2000).fadeOut();
  $("body").removeClass(".animation1");
  $("body").removeClass(".animation2"); //Fijarse bien
}



const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("#sidemenu");
btn.addEventListener("click", e =>{
  menu.classList.toggle("menu-expanded");
  menu.classList.toggle("menu-collapsed");
  document.querySelector("body").classList.toggle("body-expanded");
});


// Prueba branch - Ejemplo Faq
// Yeh eh eh eh, puto el que diga que si en ingleh YES YES YES YES, es tu cumple me re regale yeh eh eh eh
// Mi azucar tiene un poco de café yeh eh eh eh no calculé XD
// En mi cajón quiero que le peguen figus de Dragon Ball y de Pocoyó
// Yeh eh eh eh, no me corto las uñas de los pies Yeh eh eh eh por eso calzo 46