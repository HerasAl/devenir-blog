// Obtener el formulario
const form = document.querySelector('form');

// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    // Crear un objeto JSON con los datos del formulario
    const formData = {
        user: user,
        pwd: password
    };

    // Imprimir el objeto JSON en la consola
    console.log(formData);
    send(formData);

});

function send(params) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    // Enviar la solicitud a la API
    fetch('http://127.0.0.1:5000/userSes', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            if (data['status'] == 1) {
                UIkit.notification({
                    message: "<span uk-icon='icon: unlock'></span> " + data['message'],
                    status: 'primary',
                    pos: 'top-right',
                    timeout: 2500
                });
                // Redireccionar a http://localhost:5000 después de 2.5 segundos
                setTimeout(() => {
                    window.location.href = 'http://localhost:5000?sareh='+data['tkn'];
                }, 2500); // 5000 milisegundos = 5 segundos
            } else {
                UIkit.notification({
                    message: "<span uk-icon='icon: warning'></span> " + data['message'],
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 3000
                });
            }
        })
        .catch(error => {
            console.error(error);
        });

}