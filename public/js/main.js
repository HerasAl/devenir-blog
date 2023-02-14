function article(params) {
    switch (params) {
        case 0:
            $('#contenedor').html('<h2>¡Felicidades! Has cambiado el contenido del body</h2>');
            break;
    
        default:
            $('#contenedor').html('<h2>Articulo no disponible 😞</h2>');

            break;
    }
}


function genEmoji() {
    fetch('https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json')
    .then((response) => response.json())
    .then((json) =>{

        $('#texto_wel').html('devenir es un blog personal en dondé publicare notas, articulos de opinion y código. Espero te guste '+json['emojis'][random(0,json['emojis'].length)]['emoji']);

    });
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

UIkit.util.ready(function () {

    var bar = document.getElementById('progress');

    var animate = setInterval(function () {

        bar.value += randomNumber();

        if (bar.value >= bar.max) {
            clearInterval(animate);
        }

    }, 1000);

});

genEmoji();

$('#article0').click(() => {
    article(1);  
})