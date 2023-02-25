const MARGEN = 0.1;

let bottomOfPage = document.querySelector('#conclusion');
if (bottomOfPage) {
   const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && MARGEN > 0) {
         UIkit.offcanvas('#offcanvas-push').show();
         MARGEN = 0;
      }
   }, { threshold: 1 });

   observer.observe(bottomOfPage);
}

window.addEventListener("load", function () {
   var loader = document.getElementById("loader");
   loader.style.display = "none";
});


function cargaArticle(params) {

   const title = document.querySelector('.uk-article-title');
   title.textContent = 'Nuevo texto para el título';

}



