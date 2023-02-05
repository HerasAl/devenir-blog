
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