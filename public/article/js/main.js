const MARGEN = .1;

$(function(){
 $(window).on("scroll",endPage)
})
function endPage(){
 if(MARGEN > $(document).height() - $(window).scrollTop() - $(window).height()) {
    UIkit.offcanvas('#offcanvas-push').show();
 }
}



