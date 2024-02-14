onload = () => {
  document.body.classList.remove("container");
};
window.addEventListener('load', function() {
  // Selecciona el elemento de texto por su ID
  var textoElement = document.getElementById('texto');

  // Obtiene la búsqueda de la URL
  var searchParams = new URLSearchParams(window.location.search);

  // Verifica si el parámetro "mensaje" está presente
  if (searchParams.has('msg')) {
    // Obtiene el valor del parámetro "mensaje"
    var mensaje = searchParams.get('msg');

    // Cambia el texto con el valor del parámetro
    textoElement.innerText = desencripta(mensaje);
  }else{

    textoElement.innerText = "Compra unas PALOMITAS para un mensaje personalizado";


  }
});

function encripta(msg) {

  var claveSecreta = "RupaTrupa99";

  // Encriptar
  var textoEncriptado = CryptoJS.AES.encrypt(msg, claveSecreta).toString();
  return textoEncriptado;

  
}

function desencripta(msg) {

  var claveSecreta = "RupaTrupa99";

    // Desencriptar
    var bytesDesencriptados = CryptoJS.AES.decrypt(msg, claveSecreta);
    var textoDesencriptado = bytesDesencriptados.toString(CryptoJS.enc.Utf8);
    return textoDesencriptado;
  
}