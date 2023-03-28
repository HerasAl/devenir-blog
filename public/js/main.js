function articles(params) {
        $("#wel").hide();
        $("#notesDiv").show();
}
function inicio(params) {
    $("#notesDiv").hide();
    $("#wel").show();
}


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function randomNumber() {
    return Math.floor(Math.random() * 16) - 5;
  }

function light() {

    UIkit.notification({
        message: "Para esperar más rapido, solo requieres ir a 250,000 km/s",
        status: 'primary',
        pos: 'top-center',
        timeout: 5000
    });
    
}


$('#notes').click(() => {
    articles();  
})

$('#inicio').click(() => {
    inicio();
})