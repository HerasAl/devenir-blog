// Obtener el formulario
const form = document.querySelector('form');

// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Crear un objeto JSON con los datos del formulario
  const formData = {
    user: name,
    pwd: password,
    correo: email
  };

  // Imprimir el objeto JSON en la consola
  console.log(formData);

  if(verificarFormulario()){
    send(formData)
  }
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
  fetch('http://127.0.0.1:5000/altaUser', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
      if (data['status']==1){
        clean();
        UIkit.notification({
          message: data['message'],
          status: 'primary',
          pos: 'top-right',
          timeout: 3000
      });
      
      // Redireccionar a http://localhost:8000/sareh/ después de 5 segundos
    setTimeout(() => {
      window.location.href = 'http://localhost:8000/sareh/';
    }, 2500); // 5000 milisegundos = 5 segundos

      }else{
        clean();
        UIkit.notification({
          message: data['message'],
          status: 'secondary',
          pos: 'top-right',
          timeout: 3000
      });
      }
    })
    .catch(error => {
      console.error(error);
    });
  
}

function clean() {
  
 document.getElementById('name').value = "";
 document.getElementById('email').value = "";
 document.getElementById('password').value = "";

}

function verificarFormulario() {
  const form = document.getElementById('formulario');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Verificar campos vacíos
  if (name === '' || email === '' || password === '') {
    UIkit.notification({
      message: 'Por favor, completa todos los campos.',
      status: 'danger',
      pos: 'top-center'
    });
    return false;
  }

  // Verificar formato del correo electrónico
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    UIkit.notification({
      message: 'El correo electrónico no es válido.',
      status: 'danger',
      pos: 'top-center'
    });
    return false;
  }

  // Verificar longitud de la contraseña
  if (password.length < 8) {
    UIkit.notification({
      message: 'La contraseña debe tener al menos 8 caracteres.',
      status: 'danger',
      pos: 'top-center'
    });
    return false;
  }

  // Si se llega hasta aquí, el formulario está completo y correcto
  return true;
}

function getUserData() {
    const os = navigator.platform;
    const browser = navigator.userAgent;
  
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
  
        const userData = {
          os: os,
          browser: browser,
          ip: ip
        };
  
        console.log(userData); // muestra los datos en la consola del navegador
        // Puedes hacer cualquier operación con el objeto JSON en este punto, como enviarlo a un servidor.
      })
      .catch(error => console.error(error));
}